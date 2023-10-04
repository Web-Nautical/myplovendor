const gigsModel = require("../model/gigs");
const GigsImage = require("../model/gigimages");
const vendorcatModel = require("../model/vendorCategory");
const VendorSubCat = require("../model/vendorSubCategory");
const VendorMsgRoom = require('../model/vendorchatmessages');
const Vendor = require("../model/vendor");
const Stripe = require('stripe');
const stripe = Stripe('sk_test_jXEopk3Hf5zDe9VGjyejc8Bn');
const express = require("express");
const VendorOrder = require("../model/vendororder");
const vendorwishlist = require("../model/vendorwishlist");
const reportedgigs = require("../model/reportedgigs");
const { populate } = require("../model/vendorbankdata");
const VendorBank = require("../model/vendorbankdata");
const user = require("../model/user");
const statesData = require("../model/states");
const router = express.Router();
require("dotenv").config({ path: "./config.env" });
router.get('/getgigsdata', async (req, res) => {
  try {
    const gigs = await gigsModel.find()
      .sort({ created_at: -1 })
      .limit(4)
      .populate('gigImages') 
      .populate("vendorid")
    res.status(200).json({ status: 'success', data: gigs, baseurl:process.env.GIGS_IMAGE , vendorbaseurl:process.env.VENDOR_IMAGE});
  } catch (error) {
    // throw error;
    res.status(500).json({ status: 'error', message: 'Failed to fetch gig data' });
  }
});
router.post('/getallgigsdata', async (req, res) => {
  try{
    const { categoryIds , pricerange , locationfilter} = req.body;
    let gigs = [];
     if(categoryIds && locationfilter){
      gigs = await gigsModel.find({
        category: { $in: categoryIds},
        price: { $gte: pricerange.min, $lte: pricerange.max },
        location: locationfilter      
      })
      .populate("vendorid")
    }  
    else if(categoryIds ){
     gigs = await gigsModel.find({
      category: { $in: categoryIds},
      price: { $gte: pricerange.min, $lte: pricerange.max },      
    })
   .sort({ created_at: -1 })
    .populate('gigImages')
    .populate("vendorid")
    }
    else if( locationfilter ){
      gigs = await gigsModel.find({ location: locationfilter ,
        price: { $gte: pricerange.min, $lte: pricerange.max },
      })
      .populate("vendorid")
    }
   
    else{
     gigs = await gigsModel.find({price: { $gte: pricerange.min, $lte: pricerange.max },})
      .sort({ created_at: -1 })
      .populate('gigImages');
    }
    res.status(200).json({ status: 'success', data: gigs, baseurl:process.env.GIGS_IMAGE , vendorbaseurl:process.env.VENDOR_IMAGE });
  } catch (error) {
    throw error;
    res.status(500).json({ status: 'error', message: 'Failed to fetch gig data' });
  }
});
router.post('/getgigsdatadetail', async (req, res) => {
  try {
    const {userid,gigId } = req.body;
    let favstatus = 0
    if(userid){
    const favreqdata = await vendorwishlist.findOne({
      userid,
      gigId
    });
    if(favreqdata){
      favstatus = 1
    }
  }
   
    const gigs = await gigsModel.findOne({ _id: gigId })
      .populate('gigImages')
      .populate('vendorid')
      .populate('category');
      gigs.favstatus = favstatus  
      const relatedgigs = await gigsModel.find({category:gigs.category})
      .sort({ created_at: -1 })
      .populate('gigImages')
      .populate('vendorid')
    res.status(200).json({ status: 'success', data: gigs, relatedgigs: relatedgigs, baseurl:process.env.GIGS_IMAGE,favstatus:favstatus , vendorBaseUrl:process.env.VENDOR_IMAGE});
    
  
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Failed to fetch gig data' });
  }
});
router.post('/getgigsdatabycategory', async (req, res) => {
  try {
    const { category } = req.body;
   const gigs = await gigsModel.find({ category: category })
      .populate('gigImages'); 
    res.status(200).json({ status: 'success', data: gigs });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Failed to fetch gig data' });
  }
});
router.post('/getvendorcatdata', async (req, res) => {
  try {
    const { type } = req.body;
    var cats
    if(type == "homecategory"){
     cats = await vendorcatModel.find()
     .limit(5)
     cats.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });
  }
  else {
     cats = await vendorcatModel.find()
     cats.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });
  }
 
    res.status(200).json({ status: 'success', data: cats, baseurl:process.env.VENDORCATEGORY_IMAGE });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Failed to fetch vendor category data' });
  }
});
router.post('/createorder', async (req, res) => {
  try {
    const { userid , gigId  , date , time , paymentMethodId , type } = req.body
    let gigs = ""
    let amount = ""
    let vendorbank;
   if(type == "makeanoffer"){ 
     gigs = await gigsModel.findOne({ _id: gigId })
     .populate("vendorid")
     amount = gigs.price
   }
   else if(type == "payfromchat"){
    const chatdata = await VendorMsgRoom.findOne({ _id: gigId })
    gigs = await gigsModel.findOne({ _id: chatdata.gigId })
    .populate("vendorid")
    amount = chatdata.amount
   }
    const users = await user.findOne({ _id: userid })
    const vendororder = new VendorOrder({
      userid,
      gigId : gigs._id,
      reqdate :date,
      reqtime :time,
      username : users.userName,
      gigname : gigs.title,
      vendorname : gigs.vendorid.vendorname,
      amount  : amount,
      chatid : gigId,
      vendorid : gigs.vendorid._id
    });
    const orderdata = await vendororder.save();
if(orderdata){

   vendorbank = await VendorBank.findOne({ vendorid: gigs.vendorid._id ,primaryaccount : true});
   
       const intent = await stripe.paymentIntents.create({
        amount: amount *100, // Amount in cents (e.g., 1000 = $10.00)
        currency: 'usd',
        payment_method: paymentMethodId,
        confirm: true,
        transfer_data: {
          destination: vendorbank.accountstripeid,
        },
  
      });
      const updateorderdata = await VendorOrder.findOne({ _id: orderdata._id })
      if(intent.id){
     if(updateorderdata){
      updateorderdata.stripetransactionid = intent.id
      updateorderdata.stripetransactionresponse = intent
      updateorderdata.status = 1
      await updateorderdata.save()
      return res.status(200).json({ status: 'success', message: "Payment Successfull" });
     }    
      }
            else{
        if(updateorderdata){
          updateorderdata.status = 0
          await updateorderdata.save()
          return res.status(200).json({ status: 'Error', message: "Payment Failed" });
        }
      }
    }      
      } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});
router.post('/getstatesdata', async (req, res) => {
  try {
    const statedata = await statesData.find()
    res.status(200).json({ status: 'success', data: statedata});
  } catch (error) {
    // throw error;
    res.status(500).json({ status: 'error', message: 'Failed to fetch gig data' });
  }
});
router.post('/savefavgig', async (req, res) => {
  try {
    const {vendorid, userid,gigId} = req.body;
    const favreqdata = await vendorwishlist.findOne({
      userid,
      gigId
    });
    if (favreqdata) {
      await vendorwishlist.findByIdAndDelete(favreqdata._id);
      return res.json({ status: 'error',  message: 'Remove from Wishlist' });
    }else{
    const favgig = new vendorwishlist({
      vendorid: vendorid,
      userid: userid,
      gigId:gigId
    });
      await favgig.save()
    return res.status(200).json({
      status: 'success',
      message: 'Added to Wishlist',
    });
    
    }

  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 'error', message: 'An error occurred', error: error });
  }
});

router.post('/reportedgig', async (req, res) => {
  try {
    const {vendorid, userid,gigId} = req.body;
    const reportedreqdata = await reportedgigs.findOne({
      userid,
      gigId
    });
    if (reportedreqdata) {
      return res.json({ status: 'error',  message: 'Already reported this gig' });
    }else{
    const reportedgig = new reportedgigs({
      vendorid: vendorid,
      userid: userid,
      gigId:gigId
    });
      await reportedgig.save()
    return res.status(200).json({
      status: 'success',
      message: 'This listing has been reported. Thanks!',
    });
    
    }

  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 'error', message: 'An error occurred', error: error });
  }
});

router.post('/getfavgigsdatabyuserid', async (req, res) => {
  try {
    const { userid } = req.body;
    const gigdata = await vendorwishlist.find({userid})
    .populate({
      path: 'gigId', // Populate the "gigId" field
      populate: {
        path: 'gigImages', // Populate the "gigImages" field within the "Gigs" model
      },
    });
    if (gigdata) {
      return res.json({ status: 'success',  data: gigdata,baseurl:process.env.GIGS_IMAGE});
    }else{
      return res.status(200).json({ status: 'error', message: 'No Gig data found' });  
    }
  } catch (error) {
    console.error(error);
    return res.status(200).json({ status: 'error', message: 'An error occurred' });
  }
});


router.post('/getvendororderdatabyuserid', async (req, res) => {
  try {
    const { userid } = req.body;
    const vendororders = await VendorOrder.find({ userid })
    .populate({
      path: 'gigId',
      populate: {
        path: 'gigImages', 
      },
    });
    // Calculate the total price
    let totalPrice = 0;
    for (const order of vendororders) {
      totalPrice += order.amount; // Assuming there is a "price" field in the vendororder schema
    }

    res.status(200).json({ status: 'success', data: vendororders, totalOrderPrice: totalPrice, baseurl: process.env.GIGS_IMAGE });
 
  } catch (error) {
    res.status(200).send(error); 
  }
});

router.post('/searchvendorcatdata', async (req, res) => {
  try {
    const { searchQuery } = req.body;

    // Create a MongoDB query object to filter categories based on the search query
    const query = {
      name: { $regex: new RegExp(searchQuery, 'i') }, // Case-insensitive search
    };

    const cats = await vendorcatModel.find(query);

    // Sort the matching categories alphabetically by their 'name' field
    cats.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      if (nameB < nameA) return -1;
      if (nameB > nameA) return 1;
      return 0;
    });

    res.status(200).json({ status: 'success', data: cats,baseurl:process.env.VENDORCATEGORY_IMAGE});
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
});




module.exports = router;
