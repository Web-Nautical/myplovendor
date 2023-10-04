const Stripe = require('stripe');
const stripe = Stripe('sk_test_jXEopk3Hf5zDe9VGjyejc8Bn');
const VendorBank = require("../model/vendorbankdata");
const Vendor = require("../model/vendor");
const express = require("express");
const transaction = require('../model/transaction');
const router = express.Router();
const jwt = require("jsonwebtoken");
const VendorOrder = require('../model/vendororder');
require("dotenv").config({ path: "./config.env" });

router.post('/getsupportedcountries', async (req, res) => {
  try {
    const countrySpecs = await stripe.countrySpecs.list({ limit: 3 });
    return res.status(200).json({ status: 'success', data: countrySpecs });
  } catch (error) {
    return res.status(200).json({ status: 'error', data: error }); 
  }
});

router.post('/addvendorstripedata', async (req, res) => { 
  try {
    const authHeader = req.headers.xauthorization;
    if (authHeader) {
      const authToken = authHeader.split(' ')[1];
      const vendor = await Vendor.findOne({ vendorauthtoken: authToken });
      if (vendor) {
        const { vendorbusinesstype, vendorfirstname, vendorlastname, vendordob, vendorcompanyname, addressline1, addressline2, addresscity, addressstate, addresspostalcode } = req.body;
        
          vendor.stripebusinesstype = vendorbusinesstype;
          vendor.stripefirstname = vendorfirstname;
          vendor.stripelastname = vendorlastname;
          vendor.stripedob = vendordob;
          vendor.stripecompanyname = vendorcompanyname;
          vendor.stripeaddressline1 = addressline1;
          vendor.stripeaddressline2 = addressline2;
          vendor.stripeaddresscity = addresscity;
          vendor.stripeaddressstate = addressstate;
          vendor.stripeaddresspostalcode = addresspostalcode;

        await vendor.save();
        let account; 
        if (vendorbusinesstype == 'individual') {
          account = await createindividualaccount(vendor.vendoremail, vendorbusinesstype, vendorfirstname, vendorlastname, vendordob, addressline1, addressline2, addresscity, addressstate, addresspostalcode, req.connection.remoteAddress);
        } else {
          account = await createcompanyaccount(vendor.vendoremail, vendorbusinesstype, vendorcompanyname, addressline1, addressline2, addresscity, addressstate, addresspostalcode, req.connection.remoteAddress);
        }
        console.log(account);
        console.log(account.id);

        if(account && account.id)
        {
          vendor.stripeaccontid = account.id;
          vendor.stripeaccountresponse = JSON.stringify(account);
          await vendor.save();
        return res.status(200).json({ status: 'success', data: account });
        }else{
          return res.status(200).json({ status: 'error', message: 'Something Went Wrong' });
        }
        } else {
        return res.status(200).json({ status: 'error', message: 'Token Expired' });
      }
    } else {
      return res.status(200).json({ status: 'error', message: 'Token Expired' });
    }
  } catch (error) {
    return res.status(200).json({ status: 'error', message: error.message });
  }
});
async function createindividualaccount(VENDOREMAIL,BUSINESSTYPE,FIRSTNAME,LASTNAME,DOB,ADDRESSLINE1,ADDRESSLINE2,ADDRCITY,ADDRSTATE,ADDRPOSTCODE,IP) {
      const account = await stripe.accounts.create({
        type: 'custom',
        country: 'US', 
        email: VENDOREMAIL, 
        business_type: BUSINESSTYPE, 
        individual:{
          first_name: FIRSTNAME, 
          last_name: LASTNAME, 
          dob: {
            day: 2, 
            month: 9, 
            year: 1998, 
          },
          address: {
            line1: ADDRESSLINE1, 
            line2: ADDRESSLINE2, 
            city: ADDRCITY, 
            state: ADDRSTATE, 
            postal_code: ADDRPOSTCODE, 
            country: 'US', 
          },
        },
        business_profile: {
          url: 'https://myplo.com/',
        },
        tos_acceptance: {
          date: Math.floor(Date.now() / 1000),
          ip: IP,
        },
        capabilities: {
          transfers: { requested: true },
        },
      });
        return account;
      // const bankdata = await addbankaccountdata(account.id)
      // res.status(200).json({ status: 'success', data: account });
    }

    async function createcompanyaccount(VENDOREMAIL,BUSINESSTYPE,COMPANYNAME,ADDRESSLINE1,ADDRESSLINE2,ADDRCITY,ADDRSTATE,ADDRPOSTCODE,IP) {
          const account = await stripe.accounts.create({
            type: 'custom',
            country: 'US', 
            email: VENDOREMAIL, 
            business_type: BUSINESSTYPE, 
            company:{
              name: COMPANYNAME, 
              address: {
                line1: ADDRESSLINE1, 
                line2: ADDRESSLINE2, 
                city: ADDRCITY, 
                state: ADDRSTATE, 
                postal_code: ADDRPOSTCODE, 
                country: 'US', 
              },
            },
            business_profile: {
              url: 'https://myplo.com/',
            },
            tos_acceptance: {
              date: Math.floor(Date.now() / 1000),
              ip: IP,
            },
            capabilities: {
              transfers: { requested: true },
            },
          });
            return account;
        }

        router.post('/addvendorstripebankdata', async (req, res) => {
          let vendorbank; // Define the vendorbank variable outside the try block
          try {
            // Extract the authentication token from the request headers
            const authHeader = req.headers.xauthorization;
            if (authHeader) {
              const authToken = authHeader.split(' ')[1];
              
              // Find the vendor using the authentication token
              const vendor = await Vendor.findOne({ vendorauthtoken: authToken });
              if (vendor) {
                // Extract bank data from the request body
                const { accountholdername, accountnumber, accountroutingnumber } = req.body;
                var Account = false;
                const vendorbankcount = await VendorBank.findOne({ vendorid: vendor._id}).countDocuments();
                if(vendorbankcount == 0){
                  Account = true;
                }
                // Create a new VendorBank instance
                vendorbank = new VendorBank({
                  accountholdername,
                  accountnumber,
                  accountroutingnumber,
                  accountstripeid: vendor.stripeaccontid,
                  vendorid: vendor._id,
                  primaryaccount:Account
                });
        
                // Save the vendor bank details
                await vendorbank.save();
        
                // Create a Stripe token for the bank account
                const token = await stripe.tokens.create({
                  bank_account: {
                    country: 'US',
                    currency: 'USD',
                    account_holder_name: vendorbank.accountholdername,
                    account_number: vendorbank.accountnumber,
                    routing_number: vendorbank.accountroutingnumber,
                  },
                });
        
                if (token && token.id) {
                  // Update the vendor bank details with Stripe token information
                  vendorbank.stripebanktoken = token.id;
                  vendorbank.stripebanktokenresponse = JSON.stringify(token);
                  await vendorbank.save();
        
                  // Attach the bank account to the vendor's Stripe account
                  const bankAccount = await attachBankAccount(vendor.stripeaccontid, token.id);
        
                  if (bankAccount && bankAccount.id) {
                    // Update the vendor bank details with Stripe bank account information
                    vendorbank.stripebankaccountid = bankAccount.id;
                    vendorbank.stripebankaccountresponse = JSON.stringify(bankAccount);
                    await vendorbank.save();
                    return res.status(200).json({ status: 'success', data: vendorbank });
                  } else {
                    // Delete the vendor bank details if bank account attachment fails
                    await VendorBank.deleteOne({ _id: vendorbank._id });
                    return res.status(200).json({ status: 'error', message: 'Something Went Wrong' });
                  }
                }
              } else {
                return res.status(200).json({ status: 'error', message: 'Token Expired' });
              }
            } else {
              return res.status(200).json({ status: 'error', message: 'Token Expired' });
            }
          } catch (error) {
            // Delete the vendor bank details if an error occurs
            if (vendorbank && vendorbank._id) {
              await VendorBank.deleteOne({ _id: vendorbank._id });
            }
            return res.status(200).json({ status: 'error', message: error.raw.message });
          }
        });
        
        
 

  async function attachBankAccount(accountId, bankToken) {
    const bankAccount = await stripe.accounts.createExternalAccount(accountId, {
      external_account: bankToken,
    });
    console.log(bankAccount);
    return bankAccount;
  }

  router.get('/getvendorbankdata', async (req, res) => {
    try {
      const authHeader = req.headers.xauthorization;
      if (authHeader) {
        const Authtoken = authHeader.split(' ')[1];
        const vendor = await Vendor.findOne({ vendorauthtoken:Authtoken });
        if(vendor)
        {   
      const vendorbank = await VendorBank.find({ vendorid:vendor._id }).sort({ created_at: -1 });
      return res.status(200).json({ status: 'success', data: vendorbank }); 
    }else{
      return res.status(200).json({ status: 'error', message: 'Token Expired' });  
    } 
    }else{
      returnres.status(200).json({ status: 'error', message: 'Token Expired' }); 
    }
    } catch (error) { 
      return res.status(200).send(error.raw.message); 
    }
  });

  router.get('/checkuserbankexists', async (req, res) => {
    try {
      const authHeader = req.headers.xauthorization;
      if (authHeader) {
        const Authtoken = authHeader.split(' ')[1];
        const vendor = await Vendor.findOne({ vendorauthtoken:Authtoken });
        if(vendor)
        {   
      const vendorbank = await VendorBank.findOne({ vendorid:vendor._id });
      if(vendorbank){
        return res.status(200).json({ status: 'success', message: 'BANK ADDED' }); 
      }else{
        return res.status(200).json({ status: 'success', message: 'NO BANK FOUND' }); 
      }
    }else{
      return res.status(200).json({ status: 'error', message: 'Token Expired' });  
    } 
    }else{
      returnres.status(200).json({ status: 'error', message: 'Token Expired' }); 
    }
    } catch (error) { 
      return res.status(200).send(error.raw.message); 
    }
  });

  router.get('/checkvendoraccountstripe', async (req, res) => {
    try {
      const authHeader = req.headers.xauthorization;
      if (authHeader) {
        const Authtoken = authHeader.split(' ')[1];
        const vendor = await Vendor.findOne({ vendorauthtoken:Authtoken });
        if(vendor && vendor.stripeaccontid && vendor.stripeaccontid != "")
        {   
      return res.status(200).json({ status: 'success', message: 'ACCOUNT EXISTS' }); 
    }else{
      return res.status(200).json({ status: 'success', message: 'ACCOUNT NOT EXISTS' });  
    } 
    }else{
      returnres.status(200).json({ status: 'error', message: 'Token Expired' }); 
    }
    } catch (error) {
      return res.status(200).send(error.raw.message);  
    }
  });

  router.post('/deletevendorstripebankdata', async (req, res) => {
    try {
      const authHeader = req.headers.xauthorization;
      if (authHeader) {
        const authToken = authHeader.split(' ')[1];
        const vendor = await Vendor.findOne({ vendorauthtoken: authToken });
        if (vendor) {
          const bankAccountId = req.body.bankAccountId; // The ID of the bank account to delete
  
          // Delete the bank account from Stripe

          const deletedAccount = await stripe.accounts.deleteExternalAccount(
            vendor.stripeaccontid,
            bankAccountId
          );
  
          if (deletedAccount.deleted) {
            // The bank account has been successfully deleted from Stripe
            // You can now perform additional operations or update your local records accordingly
  
            // Delete the bank account from your local database
            await VendorBank.deleteOne({ stripebankaccountid: bankAccountId });
  
            return res.status(200).json({ status: 'success', message: 'Bank account deleted successfully' });
          } else {
            await VendorBank.deleteOne({ stripebankaccountid: bankAccountId });
            return res.status(200).json({ status: 'error', message: 'Failed to delete bank account from Stripe' });
          }
        } else { 
          return res.status(200).json({ status: 'error', message: 'Token Expired' });
        }
      } else {
        return res.status(200).json({ status: 'error', message: 'Token Expired' });
      }
    } catch (error) {
      console.error(error);
      return res.status(200).json({ status: 'error', message: error.raw.message });
    }
  });
  router.post('/membershippayment', async (req, res) => {
   
    const currentDate = new Date();
    const endDate = new Date(currentDate);
    endDate.setDate(endDate.getDate() + 30);
    
    
    try {
      const { paymentMethodId,vendorname ,vendor_id , type} = req.body;
      // Create a PaymentIntent or SetupIntent

      const intent = await stripe.paymentIntents.create({
        amount: 500, // Amount in cents (e.g., 1000 = $10.00)
        currency: 'usd',
        payment_method: paymentMethodId,
        confirm: true,
      
      });
      
  if(intent.id){
 const transactions = new transaction({
  transactionId : intent.id,
  status : "succeeded",
  amount : "5",
  productName : "membership",
  productuserName : vendorname,
  paymentMethod :"Stripe", 
  paymentFor: "membership",
  vendorid: vendor_id
  })
   let transactiondata =  await transactions.save()
   const token = jwt.sign({vendorname}, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
    const datedata = await Vendor.findById(vendor_id);
    if(datedata){
      datedata.membershipstartdate = currentDate
      if(type == "purchase"){
        const endDate = new Date(datedata.membershipenddate);
        endDate.setDate(endDate.getDate() + 30);
        datedata.membershipenddate =  endDate.toISOString()
      }
      else if(type == "renew"){
        datedata.membershipenddate =  endDate.toISOString()
      }
      else{
        datedata.membershipenddate =  endDate.toISOString()
        datedata.vendorauthtoken = token
      }
    }
    let savedate = await datedata.save();
  res.json({ status: 'success',message:"Payment Successfull", token :datedata.vendorauthtoken });
}
      // Payment successful, send a response to the frontend
    } catch (error) {
      throw error
      // Handle payment error, send an error response to the frontend
      // res.json({ status: 'error', message: error.message });
    }
  }); 

  router.post('/expiremembership', async (req, res) => {
    const currentDate = new Date();
    try {
      const authHeader = req.headers.xauthorization;
      console.log(authHeader);
      if (authHeader) {
      const Authtoken = authHeader.split(' ')[1];
      const vendor = await Vendor.findOne({ vendorauthtoken:Authtoken });
      if(vendor){
      const enddate = new Date(vendor.membershipenddate)
      if (enddate < currentDate) {
        return res.json({ status: 'success',  message: "Membership Expired" });
      }else{
        res.status(200).json({ status: 'success', message:"Membership not Expired" });  
      }}else{
        return res.status(200).json({ status: 'error', message: 'Token Expired' });
      }
    }else{
      res.status(200).json({ status: 'error', message: 'Error' }); 
    }  
      
      
    } catch (error) {
      console.error(error);
      return res.status(200).json({ status: 'error', message: error.raw.message });
    }
  });

  router.get('/totalpaymentreceived', async (req, res) => {
    try {
        const authHeader = req.headers.xauthorization;
        if (authHeader) {
            const authToken = authHeader.split(' ')[1];
            const vendor = await Vendor.findOne({ vendorauthtoken: authToken });
            if (vendor) {
                const vendorOrders = await VendorOrder.find({ vendorid: vendor._id });

                // Calculate total payment received
                let totalPayment = 0;
                for (const order of vendorOrders) {
                    totalPayment += order.amount;
                }

                return res.status(200).json({ status: 'success', totalamount: totalPayment});
            } else {
                return res.status(200).json({ status: 'error', message: 'Vendor not found' });
            }
        } else {
            return res.status(200).json({ status: 'error', message: 'Authorization token missing' });
        }
    } catch (error) {
        return res.status(500).json({ status: 'error', message: error.message });
    }
});

router.post('/setprimaryaccount', async (req, res) => {
  try {
      const authHeader = req.headers.xauthorization;
      if (authHeader) {
          const authToken = authHeader.split(' ')[1];
          const vendor = await Vendor.findOne({ vendorauthtoken: authToken });
          if (vendor) {
              const { bankAccountId } = req.body;
               console.log(vendor._id)
              // Find all banks belonging to the vendor and set primaryaccount to false
              await VendorBank.updateMany({ vendorid: vendor._id }, {$set:{ primaryaccount: false} } );

              // Set primaryaccount to true for the specified bank entry
              await VendorBank.findOneAndUpdate({ _id: bankAccountId},  {$set:{ primaryaccount: true} } );

              return res.status(201).json({ status: 'success', message: 'Vendor bank information saved successfully'});
          } else {
              return res.status(404).json({ status: 'error', message: 'Vendor not found' });
          }
      } else {
          return res.status(401).json({ status: 'error', message: 'Authorization token missing' });
      }
  } catch (error) {
      return res.status(500).json({ status: 'error', message: error.message });
  }
});




module.exports = router;