const vendorcatModel = require("../model/vendorCategory");
const Vendor = require("../model/vendor");
const gigsModel = require("../model/gigs");
const VendorMsgRoom = require('../model/vendorchatmessages');
const sitevendor = require('../model/vendorsite');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const express = require("express");
const router = express.Router();
const multer = require('multer');
const VendorOrder = require("../model/vendororder");
const Gigs = require("../model/gigs");
const VendorRating = require("../model/vendorratings");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/profile/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
  });

const upload = multer({ storage: storage });

router.post('/login', async (req, res) => {
  try {
    const { vendoremail, vendorpassword } = req.body;
    const vendor = await Vendor.findOne({ vendoremail });
    if(vendor)
    {
    bcrypt.compare(vendorpassword, vendor.vendorpassword, async (err, passwordMatch) => {
      if (err) {
        console.error(err);
        return res.status(200).json({ status: 'error', message: 'An error occurred' });
       }

       if (passwordMatch) {
        let token = ""
        if(vendor.vendorauthtoken){
           token = vendor.vendorauthtoken
        }
        else{
         token = jwt.sign({ vendoremail }, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRES_IN,
        });
        if (vendor) {
          vendor.vendorauthtoken = token;
          await vendor.save();
        }
      }
       
        return res.json({ status: 'success', message: 'Password is a match', Authtoken: token });
      } else {
        return res.status(200).json({ status: 'error', message: 'Invalid credentials' });
      }
    });
  }else{
    return res.status(200).json({ status: 'error', message: 'Invalid credentials' });
  }
  } catch (error) {
    console.error(error);
    res.status(200).json({ status: 'error', message: 'An error occurred' });
  }
});

router.post('/register', async (req, res) => {
  try {
    const { vendoremail, vendorpassword, vendorname, companyname, vendormobile } = req.body;

    // Generate a salt and hash the password using bcrypt
    const saltRounds = 10; // You can adjust this value according to your security needs
    const hashedPassword = await bcrypt.hash(vendorpassword, saltRounds);

    const vendorregister = new Vendor({
      vendoremail,
      vendorpassword: hashedPassword, // Save the hashed password in the database
      vendorname,
      companyname,
      vendormobile
    });

    const savedvendor = await vendorregister.save();
    return res.status(200).json({ status: 'success', message: savedvendor });
  } catch (error) {
    res.status(200).json({ status: 'error', message: error.message });
  }
});



router.post('/getvendordata', async (req, res) => {
  try {
    const authHeader = req.headers.xauthorization;
    console.log(authHeader);
    if (authHeader) {
    const Authtoken = authHeader.split(' ')[1];
    const vendor = await Vendor.findOne({ vendorauthtoken:Authtoken });
    if (vendor) {
      return res.json({ status: 'success',  vendorData: vendor, baseurl:process.env.VENDOR_IMAGE });
    }else{
      res.status(200).json({ status: 'error', message: 'Token Expired' });  
    }
  }else{
    res.status(200).json({ status: 'error', message: 'Token Expired' }); 
  }
  } catch (error) {
    console.error(error);
    res.status(200).json({ status: 'error', message: 'An error occurred' });
  }
});

router.post('/updatevendordata',upload.fields([{ name: 'vendorimage', maxCount: 1}]) , async (req, res) => {
  try {
    const authHeader = req.headers.xauthorization;
    if (authHeader) {
    const Authtoken = authHeader.split(' ')[1];
    const { vendorname, vendoraddress, vendormobile, vendordescription,vendoremail, vendorstate, vendorcountry , vendorImage } = req.body;
    const vendor = await Vendor.findOne({ vendorauthtoken:Authtoken });
    let imageFiles   
      if (req.files && req.files['vendorimage'] && req.files['vendorimage'][0]) {
        imageFiles = req.files['vendorimage'][0]; 
    }
    if (vendor) {
      vendor.companyname = vendorname;
      vendor.vendoraddress = vendoraddress;
      vendor.vendormobile = vendormobile;
      vendor.vendordescription = vendordescription;
      vendor.vendorstate = vendorstate;
      vendor.vendorcountry = vendorcountry;
      if(imageFiles && imageFiles.filename){
      vendor.image = imageFiles.filename
      }     
      await vendor.save();
      return res.json({ status: 'success',  vendorData: vendor });
    }else{
      res.status(200).json({ status: 'error', message: 'Token Expired' });  
    }
  }else{
    res.status(200).json({ status: 'error', message: 'Token Expired' }); 
  }
  } catch (error) {
    console.error(error);
    res.status(200).json({ status: 'error', message: error.message });

  }
});

router.post('/vendordashboarddata', async (req, res) => {
  try {
    const authHeader = req.headers.xauthorization;
    if (authHeader) {
    const Authtoken = authHeader.split(' ')[1];
    const vendor = await Vendor.findOne({ vendorauthtoken:Authtoken });
    if (vendor) {
      const gigscount = await gigsModel.countDocuments({ vendorid: vendor._id });
      const messagescount = await VendorMsgRoom.countDocuments({ vendorid: vendor._id, readmessage: false });

      const paymentreceived = 0;
      return res.json({ status: 'success',  gigsCount: gigscount, messagescount:messagescount, paymentreceived:paymentreceived });
    }else{
      res.status(200).json({ status: 'error', message: 'Token Expired' });  
    }
  }else{
    res.status(200).json({ status: 'error', message: 'Token Expired' }); 
  }
  } catch (error) {
    console.error(error);
    res.status(200).json({ status: 'error', message: 'An error occurred' });
  }
});

router.get('/getnotificationdata', async (req, res) => {
  try {
    const authHeader = req.headers.xauthorization;
    if (authHeader) {
      const Authtoken = authHeader.split(' ')[1];
      const vendor = await Vendor.findOne({ vendorauthtoken:Authtoken });
      if(vendor)
      {   
    const vendororder = await VendorOrder.find({ vendorid:vendor._id, readstatus:false}).sort({ created_at: -1 })
    res.status(200).json({ status: 'success', data: vendororder }); 
  }else{
    res.status(200).json({ status: 'error', message: 'Token Expired' });  
  } 
  }else{
    res.status(200).json({ status: 'error', message: 'Token Expired' }); 
  }
  } catch (error) {
    res.status(200).send(error); 
  }
});
router.get('/getvendororder', async (req, res) => {
  try {
    const authHeader = req.headers.xauthorization;
    if (authHeader) {
      const Authtoken = authHeader.split(' ')[1];
      const vendor = await Vendor.findOne({ vendorauthtoken:Authtoken });
      if(vendor)
      {   
    const vendororder = await VendorOrder.find({ vendorid:vendor._id }).sort({ created_at: -1 }).populate({
      path: 'gigId', // Populate the "gigId" field
      populate: {
        path: 'gigImages', // Populate the "gigImages" field within the "Gigs" model
      },
    });
    res.status(200).json({ status: 'success', data: vendororder, baseurl:process.env.GIGS_IMAGE }); 
  }else{
    res.status(200).json({ status: 'error', message: 'Token Expired' });  
  } 
  }else{
    res.status(200).json({ status: 'error', message: 'Token Expired' }); 
  }
  } catch (error) {
    res.status(200).send(error); 
  }
});
router.post('/getgigsvendordata', async (req, res) => {
  const{id} = req.body
  try {
      const gigdata = await Gigs.find({vendorid : id  })
       .populate("gigImages")
       .populate("vendorid")
       const vendordata = await Vendor.findOne({ _id : id });
       return res.json({ status: 'success',  vendorData: vendordata , gigsdata: gigdata , baseurl:process.env.GIGS_IMAGE  });
      }
    catch (error) {
    console.error(error);
    res.status(200).json({ status: 'error', message: 'An error occurred' });
  }
});
router.post('/orderstatus', async (req, res) => {
  try {
      const authHeader = req.headers.xauthorization;
      if (authHeader) {
          const authToken = authHeader.split(' ')[1];
          const vendor = await Vendor.findOne({ vendorauthtoken: authToken });
          if (vendor) {
              await VendorOrder.updateMany({ vendorid: vendor._id},  {$set:{ readstatus: true} } );
              return res.status(201).json({ status: 'success', message:"Done"});
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
router.post('/addvendorratingsdata', async (req, res) => {
  try {
    const {vendorid, userid, ratings } = req.body;
    const ratingsid = await VendorRating.findOne({
      userid,
      vendorid,
    });
    if (ratingsid) {
      return res.json({ status: 'error',  message: "Ratings is already added"});
    }else{
    const rating = new VendorRating({
      vendorid: vendorid,
      userid: userid,
      ratings: ratings,
    });
   
    const savedratings = await rating.save();
    const allRatings = await VendorRating.find({ vendorid: vendorid });
    const sumOfRatings = allRatings.reduce((sum, rating) => sum + rating.ratings, 0);
    const totalVendor = await VendorRating.find({ vendorid: vendorid }).countDocuments();
    const averageRating = totalVendor > 0 ? sumOfRatings / totalVendor : 0;
    const roundedAverageRating = averageRating.toFixed(0) 
    const vendor = await Vendor.findById(vendorid);
    if(vendor){
      vendor.ratings = roundedAverageRating;
    }
    await vendor.save()
    return res.status(200).json({
      status: 'success',
      message: 'Ratings Data Saved Successfully',
      sumOfRatings: sumOfRatings,
      totalVendor: totalVendor,
      averageRating: roundedAverageRating,
      vendorsrating:vendor
    });
    
    }

  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 'error', message: 'An error occurred', error: error });
  }
});

router.get('/getVendorSiteData', async (req, res) => {
  try {
    const authHeader = req.headers.xauthorization;
    if (authHeader) {
        const authToken = authHeader.split(' ')[1];
        const vendor = await Vendor.findOne({ vendorauthtoken: authToken });
        if (vendor) {
    const vendorSiteData = await sitevendor.find();
    
    if (vendorSiteData.length > 0) {
      return res.status(200).json({ status: 'success', data: vendorSiteData[0] , baseurl:process.env.VENDORCATEGORY_IMAGE});
    } else {
      return res.status(404).json({ status: 'error', message: 'No records found in the VendorSite collection' });
    }
  } 
} else {
  return res.status(404).json({ status: 'error', message: 'Vendor not found' });
}
}

catch (error) {
    return res.status(500).json({ status: 'error', data: error });
  }
});




module.exports = router;