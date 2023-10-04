const gigsModel = require("../model/gigs");
const gigsImageModel = require("../model/gigimages");
const vendorcatModel = require("../model/vendorCategory");
const VendorSubCat = require("../model/vendorSubCategory");
const Vendor = require("../model/vendor");
const ratingsModel = require("../model/ratings")
const express = require("express");
const router = express.Router();
const multer = require('multer');
const statesData = require("../model/states");
require("dotenv").config({ path: "./config.env" });
const fs = require('fs');
const path = require('path');
const storage = multer.diskStorage({
  destination: function (req, file, cb) { 
    cb(null, 'uploads/gigs/'); // Set the destination folder where the files will be saved
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '.' + file.originalname.split('.').pop()); // Set the file naming convention
  }
}); 
// const upload = multer();
const upload = multer({ storage: storage });
router.post('/addgigsdata', upload.fields([{ name: 'image[]', maxCount: 10 }, { name: 'video', maxCount: 1 }]), async (req, res) => {
  try {
    const { title, description, category, subcategory, price, location, gigId, video } = req.body;
    const imageFiles = req.files && req.files['image[]'] ? req.files['image[]'] : [];
    let videoFile = null;
    if (req.files && req.files['video'] && req.files['video'][0]) {
      videoFile = req.files['video'][0]; 
    }   
    let savedGig = {} 
    const authHeader = req.headers.xauthorization;
    if (authHeader) {
      const authToken = authHeader.split(' ')[1];
      const vendor = await Vendor.findOne({ vendorauthtoken: authToken });
      if (vendor) {
        const vendorId = vendor._id;
        if (gigId) {
          const gig = await gigsModel.findById(gigId);
          if (gig) {
            gig.title = title;
            gig.description = description;
            gig.category = category;
            gig.subcategory = subcategory;
            gig.price = price;
            gig.location = location;
            if(videoFile && videoFile.filename){
            gig.video= videoFile.filename // Add the video parameter
            }
            savedGig = await gig.save();
          }
        } else {
          if(videoFile)
          {
            videoFile = videoFile.filename;
          }else{
            videoFile = '';
          }
          const gig = new gigsModel({
            title,
            description,
            category,
            subcategory,
            price,
            location,
            vendorid: vendorId,
            video: videoFile // Add the video parameter
          });
          savedGig = await gig.save();
        }
        if (imageFiles && imageFiles.length > 0) {
          const imageIds = []; // Array to store the image IDs
          const imagePromises = imageFiles.map(async (file) => {
            const image = new gigsImageModel({
              gigId: savedGig._id,
              image: file.filename
              // Add any other properties related to the image table
            });
            const savedImage = await image.save();
            savedGig.gigImages.push(savedImage._id); // Push the image ID to gigImages field
          });
          await Promise.all(imagePromises);
         await savedGig.save();
        }
        return res.status(200).json({ status: 'success', message: 'Gigs Data Saved Successfully' });
      } else {
        return res.status(200).json({ status: 'error', message: 'Token Expired' });
      }
    } else {
      return res.status(200).json({ status: 'error', message: 'Token Expired' });
    }
  } catch (error) {
    throw error;
    return res.status(200).json({ status: 'error', data: error });
  }
});
router.get('/getvendorcatdata', async (req, res) => {
  try {
    const authHeader = req.headers.xauthorization;
    if (authHeader) {
    const Authtoken = authHeader.split(' ')[1];
    const vendor = await Vendor.findOne({ vendorauthtoken:Authtoken }).sort({ created_at: -1 });
    if(vendor)
    {
    const cats = await vendorcatModel.find();
    res.status(200).json({ status: 'success', data: cats });
    }else{
      res.status(200).json({ status: 'error', message: 'Token Expired' });  
    } 
    }else{
      res.status(200).json({ status: 'error', message: 'Token Expired' }); 
    }
  } 
  catch (error) {
    res.status(200).send(error);
  }
});
router.get('/getallvendorsubcatdata', async (req, res) => {
  try {
    const authHeader = req.headers.xauthorization;
    if (authHeader) {
    const Authtoken = authHeader.split(' ')[1];
    const vendor = await Vendor.findOne({ vendorauthtoken:Authtoken });
    if(vendor)
    {
    const subcats = await VendorSubCat.find().sort({ created_at: -1 });
    res.status(200).json({ status: 'success', data: subcats }); 
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
router.get('/getgigsdata', async (req, res) => {
  try {
    const authHeader = req.headers.xauthorization;
    if (authHeader) {
      const Authtoken = authHeader.split(' ')[1];
      const vendor = await Vendor.findOne({ vendorauthtoken:Authtoken });
      if(vendor)
      {   
    const gigs = await gigsModel.find({ vendorid:vendor._id }).sort({ created_at: -1 });
    res.status(200).json({ status: 'success', data: gigs }); 
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
router.post('/getgigsdatabyid', async (req, res) => {
  try {
    const authHeader = req.headers.xauthorization;
    if (authHeader) {
      const Authtoken = authHeader.split(' ')[1];
      const vendor = await Vendor.findOne({ vendorauthtoken:Authtoken });
      if(vendor)
      {
    const { gigId } = req.body;
    const gigdata = await gigsModel.findOne({ _id:gigId });
    const gigImagesdata = await gigsImageModel.find({ gigId:gigId });
    if (gigdata) {
      return res.json({ status: 'success',  data: gigdata , baseurl:process.env.GIGS_IMAGE, gigimages: gigImagesdata});
    }else{
      return res.status(200).json({ status: 'error', message: 'No Gig data found' });  
    }
  }else{
    return res.status(200).json({ status: 'error', message: 'Token Expired' });  
  } 
  }else{
    return res.status(200).json({ status: 'error', message: 'Token Expired' }); 
  }
  } catch (error) {
    console.error(error);
    return res.status(200).json({ status: 'error', message: 'An error occurred' });
  }
});
router.post('/getvendorsubcatdata', async (req, res) => {
  try {
    const authHeader = req.headers.xauthorization;
    if (authHeader) {
    const Authtoken = authHeader.split(' ')[1];
    const vendor = await Vendor.findOne({ vendorauthtoken:Authtoken });
    if(vendor)
    {
    const { parentcat } = req.body;
    const vendorsubcat = await VendorSubCat.find({ parent:parentcat }).sort({ created_at: -1 });
    if (vendorsubcat) {
      return res.json({ status: 'success',  data: vendorsubcat });
    }else{
      return res.status(200).json({ status: 'error', message: 'Subcat Not Found' });  
    }
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
router.post('/deletegig', async (req, res) => {
  try {
    const authHeader = req.headers.xauthorization;
    if (authHeader) {
      const Authtoken = authHeader.split(' ')[1];
      const vendor = await Vendor.findOne({ vendorauthtoken:Authtoken });
      if(vendor)
      {  
      const { gigId } = req.body;
    await gigsModel.findByIdAndDelete(gigId);
    return res.json({ status: 'success',  message: 'Deleted Successfully' });
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
router.post('/addratingsdata', async (req, res) => {
  try {
    const { gigId, vendorid, userid, ratings } = req.body;
   // Create a new rating document
    const rating = new ratingsModel({
      gigId: gigId,
      vendorid: vendorid,
      userid: userid,
      ratings: ratings,
    });
  // Save the rating document
    const savedRating = await rating.save();
    // Calculate the sum of all ratings for the specified gigId
    const allRatings = await ratingsModel.find({ gigId: gigId });
    const sumOfRatings = allRatings.reduce((sum, rating) => sum + rating.ratings, 0);
    const totalGigs = await ratingsModel.find({ gigId: gigId }).countDocuments();
    const averageRating = totalGigs > 0 ? sumOfRatings / totalGigs : 0;
    const roundedAverageRating = averageRating.toFixed(0) 
    const gig = await gigsModel.findById(gigId);
    if(gig){
      gig.ratings = roundedAverageRating;
    }
    await gig.save()
    return res.status(200).json({
      status: 'success',
      message: 'Ratings Data Saved Successfully',
      sumOfRatings: sumOfRatings,
      totalGigs: totalGigs,
      averageRating: roundedAverageRating,
      gigsrating:gig
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 'error', message: 'An error occurred', error: error });
  }
});
router.get('/getstatesdata', async (req, res) => {
  try {
    const statedata = await statesData.find()
    res.status(200).json({ status: 'success', data: statedata});
  } catch (error) {
    // throw error;
    res.status(500).json({ status: 'error', message: 'Failed to fetch gig data' });
  }
});

router.post('/deletegigimage', async (req, res) => {
  const { id, imageIdToDelete } = req.body; 

  try {
    const deletedImage = await gigsImageModel.findByIdAndRemove(imageIdToDelete);
    const result = await gigsModel.updateOne(
      { _id: id },
      { $pull: { gigImages: imageIdToDelete } }
    );
   
//     const currentDirectory = __dirname;
// const parentDirectory = path.join(currentDirectory, '..'); 

// const uploadPath = path.join(parentDirectory, 'uploads','gigs');
// console.log(uploadPath)
    // if (fs.existsSync(imagePath)) {
    // fs.unlinkSync(imagePath);
    // }
    return res.json({ message: 'Image deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});




module.exports = router;