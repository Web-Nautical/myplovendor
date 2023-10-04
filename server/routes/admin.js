const gigsModel = require("../model/gigs");
const GigsImage = require("../model/gigimages");
const vendorcatModel = require("../model/vendorCategory");
const VendorSubCat = require("../model/vendorSubCategory");
const Vendor = require("../model/vendor");
const VendorSite = require("../model/vendorsite");
const transaction = require("../model/transaction")
const VendorOrder = require('../model/vendororder');
const gigsImageModel = require("../model/gigimages");

require("dotenv").config({ path: "./config.env" });
const multer = require('multer');

const express = require("express");
const router = express.Router();


const storage = multer.diskStorage({
  destination: function (req, file, cb) { 
    cb(null, 'uploads/vendorcategory/'); // Set the destination folder where the files will be saved
  },
  
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '.' + file.originalname.split('.').pop()); // Set the file naming convention
  }
}); 
const storagegig = multer.diskStorage({
  destination: function (req, file, cb) { 
    cb(null, 'uploads/gigs/'); // Set the destination folder where the files will be saved
  },
  
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '.' + file.originalname.split('.').pop()); // Set the file naming convention
  }
}); 
const upload = multer({ storage: storage });
const uploadgig = multer({ storage: storagegig });
require("dotenv").config({ path: "./config.env" });

router.get('/getvendordata', async (req, res) => {
    try {
      const data = await Vendor.find();
      res.status(200).json({ status: 'success', data: data });
    } catch (error) {
      res.status(200).json({ status: 'error', message: 'Failed to fetch vendor data' });
    }
  });

  router.get('/dashboardvendorcount', async (req, res) => {
    try {
      const gigscount = await gigsModel.countDocuments();
      const vendorcount = await Vendor.countDocuments();
      const Categoriescount = await vendorcatModel.countDocuments();
      const transactionscount = await transaction.find({paymentFor : "membership"})
      let totalPayment = 0;
      for (const payment of transactionscount) {
          totalPayment +=Number(payment.amount);
      }

      res.status(200).json({ status: 'success', gigscount: gigscount, vendorcount: vendorcount , Categoriescount :Categoriescount ,transactionscount: totalPayment});
    } catch (error) {
      res.status(200).json({ status: 'error', message: 'Failed to fetch dashboard data'});
    }
  });

  router.post('/deletevendor', async (req, res) => {
    try {
        const { vendorId } = req.body;
      await Vendor.findByIdAndDelete(vendorId);
      return res.json({ status: 'success',  message: 'Deleted Successfully' });
    } catch (error) {
      res.status(200).send(error);
    }
  });

  router.get('/getallgigsdata', async (req, res) => {
    try{
       const gigs = await gigsModel.find()
        .sort({ created_at: -1 })
        .populate('vendorid')
        .populate('category');
        const gigDataWithCounts = await Promise.all(
          gigs.map(async (gigRecord) => {
            const count = await VendorOrder.countDocuments({
              gigId: gigRecord._id,
             
            });
            gigRecord.gigCount = count;
            console.log(count)
            return gigRecord;
          })
        );

      res.status(200).json({ status: 'success', data: gigDataWithCounts});
    } catch (error) {
      res.status(200).json({ status: 'error', message: 'Failed to fetch gig data' });
    }
  });
  



  router.post('/deletegigs', async (req, res) => {
    try {
        const { gigId } = req.body;
      await gigsModel.findByIdAndDelete(gigId);
      return res.json({ status: 'success',  message: 'Deleted Successfully' });
    } catch (error) {
      res.status(200).send(error);
    }
  });

  router.get('/getvendorcatdata', async (req, res) => {
    try {
      const cats = await vendorcatModel.find();
      cats.sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if (nameB < nameA) return -1;
        if (nameB > nameA) return 1;
        return 0;
      });
      res.status(200).json({ status: 'success', data: cats });
    } 
    catch (error) {
      res.status(200).send(error);
    }
  });
  router.get('/getvendorsubcatdata', async (req, res) => {
    try {
      const subcats = await VendorSubCat.find();
      res.status(200).json({ status: 'success', data: subcats, baseurl:process.env.VENDORCATEGORY_IMAGE});
    } 
    catch (error) {
      res.status(200).send(error);
    }
  });

  router.post('/addcatdata',upload.fields([{ name: 'image', maxCount: 1}]), async (req, res) => {
    try {     
      const { name, status, image,id } = req.body;
      let imageFiles    
      if (req.files && req.files['image'] && req.files['image'][0]) {
        imageFiles = req.files['image'][0]; 
    }
      let savedCatData = {} 
          if (id && id != "null") {
            const catdata = await vendorcatModel.findById(id);
            if (catdata) {
              catdata.name = name;
              catdata.status = status;
              catdata.image = imageFiles.filename
               savedCatData = await catdata.save();
            }
          } else {
            const catdata = new vendorcatModel({
              name , 
              status,
              image : imageFiles.filename                                  
            });
            savedCatData = await catdata.save();
          }
         
          return res.status(200).json({ status: 'success', message: 'Category Data Saved Successfully' });
       
     
    } catch (error) {
      throw error  
      return res.status(200).json({ status: 'error', data: error });
    }
  });

  router.post('/addsubcatdata',upload.fields([{ name: 'image', maxCount: 1}]) , async (req, res) => { 
    try {
      const { name, status, category,id } = req.body;
      let imageFiles    
      if (req.files && req.files['image'] && req.files['image'][0]) {
        imageFiles = req.files['image'][0]; 
    }
      let savedSubCatData = {} 
          if (id  && id != "null") {
            const subcatdata = await VendorSubCat.findById(id);
            if (subcatdata) {
              subcatdata.name = name;
              subcatdata.status = status;
              subcatdata.parent = category;
              subcatdata.image = imageFiles.filename              
              savedSubCatData = await subcatdata.save();
            }
          } else {
          const subcatdata = new VendorSubCat({ 
              name, 
              status,
              parent : category,
              image : imageFiles.filename  
           });
            savedSubCatData = await subcatdata.save();
          }
          return res.status(200).json({ status: 'success', message: 'SubCategory Data Saved Successfully',baseurl:process.env.VENDORCATEGORY_IMAGE });
    } catch (error) {
      throw error;
      return res.status(200).json({ status: 'error', data: error });
    }
  });

  router.post('/getsubcategorydatabyid', async (req, res) => {
    try {
   
      const { subcat_id } = req.body;
      const subcatdata = await VendorSubCat.findOne({ _id:subcat_id });
      if (subcatdata) {
        return res.json({ status: 'success',  data: subcatdata , baseurl:process.env.VENDORCATEGORY_IMAGE});
      }else{
        return res.status(200).json({ status: 'error', message: 'No SubCategory data found' });  
      }
  
    } catch (error) {
      console.error(error);
      return res.status(200).json({ status: 'error', message: 'An error occurred' });
    }
  });
  router.post('/getcategorydatabyid', async (req, res) => {
    try {
   
      const { cat_id } = req.body;
      const catdata = await vendorcatModel.findOne({ _id:cat_id });
      if (catdata) {
        return res.json({ status: 'success',  data: catdata , baseurl:process.env.VENDORCATEGORY_IMAGE});
      }else{
        return res.status(200).json({ status: 'error', message: 'No Category data found' });  
      }
  
    } catch (error) {
      console.error(error);
      return res.status(200).json({ status: 'error', message: 'An error occurred' });
    }
  });

  router.post('/deletecategory', async (req, res) => {
    try {
        const { id } = req.body;
      await vendorcatModel.findByIdAndDelete(id);
      await gigsModel.deleteMany({ category: id });
      await VendorSubCat.deleteMany({ parent: id });
      
      return res.json({ status: 'success',  message: 'Deleted Successfully' });
    
    } catch (error) {
      res.status(200).send(error);
    }
  });
  router.post('/deletesubcategory', async (req, res) => {
    try {
        const { id } = req.body;
      await VendorSubCat.findByIdAndDelete(id);
      return res.json({ status: 'success',  message: 'Deleted Successfully' });
    
    } catch (error) {
      res.status(200).send(error);
    }
  });

  router.post('/getvendordatabyid', async (req, res) => {
    try {
   
      const { vendor_id } = req.body;
      const vendordata = await Vendor.findOne({ _id:vendor_id });
      if (vendordata) {
        return res.json({ status: 'success',  data: vendordata });
      }else{
        return res.status(200).json({ status: 'error', message: 'No Vendor data found' });  
      }
  
    } catch (error) {
      console.error(error);
      return res.status(200).json({ status: 'error', message: 'An error occurred' });
    }
  });

  router.post('/editvendordata', async (req, res) => { 
    try {     
      const { userName,phonenumber,location,email,state,description, status,country,id } = req.body;
     
      let savedVendorData = {} 
          if (id && id != "null") {
            const vendordata = await Vendor.findById(id);
            if (vendordata) {
              vendordata.vendorname = userName;
              vendordata.vendormobile = phonenumber;
              vendordata.vendoraddress = location;
              vendordata.vendoremail = email;
              vendordata.vendorstate = state;
              vendordata.vendorcountry = country
              vendordata.vendordescription = description;
              vendordata.status = status;
              savedVendorData = await vendordata.save();
            }
          } else {
            const catdata = new vendorcatModel({
              name , 
              status,
              image : imageFiles.filename                                  
            });
            savedCatData = await catdata.save();
          }
         
          return res.status(200).json({ status: 'success', message: 'Category Data Saved Successfully' });
       
     
    } catch (error) {
      throw error  
      return res.status(200).json({ status: 'error', data: error });
    }
  });

  router.post('/editgigdata',  uploadgig.fields([{ name: 'image[]', maxCount: 10 }]) , async (req, res) => {        
    try {
      const { title,description,location,category,subcategory,price,id } = req.body;
      const imageFiles = req.files && req.files['image[]'] ? req.files['image[]'] : [];
      let savedGig = {} 
          if (id && id != "null") {
            const gigsData = await gigsModel.findById(id);
            if (gigsData) {
              gigsData.title = title;
              gigsData.description = description,
              gigsData.location = location;
              gigsData.category = category;
              gigsData.subcategory = subcategory;
              gigsData.vendorstate = location;
              gigsData.price = price
              gigsData.image = imageFiles.image
              savedGig = await gigsData.save();

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
            }
            return res.status(200).json({ status: 'success', message: 'Gigs Data Not Found' });

          }
          return res.status(200).json({ status: 'success', message: 'Pass ID' });

    } catch (error) {
      throw error
      return res.status(200).json({ status: 'error', data: error });
    }
  });
  router.post('/addmembershipprice', async (req, res) => {
    try {
      const { gigId, newprice } = req.body;
      let membershipPrice = {} 
          // if (gigId) {
          //   const gig = await sitevendor.findById(gigId);
          //   if (gig) {
          //     gig.title = title;
          //     gig.description = description;
          //     gig.category = category;
          //     gig.subcategory = subcategory;
          //     gig.price = price;
          //     gig.location = location;
      
          //     savedGig = await gig.save();
          //   }
          // } else {
           
            const membershipprice = new VendorSite({
              membetship_price : newprice
            });
            let savedprice = await membershipprice.save();
          // }
  
          return res.status(200).json({ status: 'success', message: 'Membership Data Saved Successfully' });
        
    } catch (error) {
      throw error;
      return res.status(200).json({ status: 'error', data: error });
    }
  });

  router.post('/getgigdatabyid', async (req, res) => {
    try {
   
      const { gigId } = req.body;
      const gigData = await gigsModel.findOne({ _id:gigId })
      const gigImagesdata = await gigsImageModel.find({ gigId:gigId });
      if (gigData) {
        return res.json({ status: 'success',  data: gigData ,gigImages : gigImagesdata ,  baseurl:process.env.GIGS_IMAGE });
      }else{
        return res.status(200).json({ status: 'error', message: 'No Gigs data found' });  
      }
  
    } catch (error) {
      console.error(error);
      return res.status(200).json({ status: 'error', message: 'An error occurred' });
    }
  });

  router.post('/getvendorsubcatdata', async (req, res) => {
    try {
      const { parentcat } = req.body;
      const vendorsubcat = await VendorSubCat.find({ parent:parentcat }).sort({ created_at: -1 })
      if (vendorsubcat) {
        return res.json({ status: 'success',  data: vendorsubcat, baseurl:process.env.VENDORCATEGORY_IMAGE});
      }else{
        return res.status(200).json({ status: 'error', message: 'Subcat Not Found' });  
      }
     
    } catch (error) {
      console.error(error);
      res.status(200).json({ status: 'error', message: 'An error occurred' });
    }
  });
  
  router.post('/updateFirstVendorIntro', upload.fields([{ name: 'video', maxCount: 1 }]), async (req, res) => {
    try {
      const { vendorintro } = req.body;
      let videoFile = null;
  
      if (req.files && req.files['video'] && req.files['video'][0]) {
        videoFile = req.files['video'][0];
      }
  
      // Find the first record in the 'VendorSite' collection
      const firstSiteData = await VendorSite.findOne();
  
      if (firstSiteData) {
        // Update the 'vendor_intro' field with the provided 'vendorintro'
        firstSiteData.vendor_intro = vendorintro;
  
        if (videoFile && videoFile.filename) {
          firstSiteData.video = videoFile.filename; // Add the video parameter
        }
  
        // Save the updated site data
        const updatedSiteData = await firstSiteData.save();
        return res.status(200).json({ status: 'success', message: 'First Vendor Intro Updated Successfully' });
      } else {
        return res.status(404).json({ status: 'error', message: 'No records found in the VendorSite collection' });
      }
    } catch (error) {
      return res.status(500).json({ status: 'error', data: error });
    }
  });
  
router.get('/getVendorSiteData', async (req, res) => {
  try {
    // Fetch all records from the 'VendorSite' collection
    const vendorSiteData = await VendorSite.find();
    
    if (vendorSiteData.length > 0) {
      return res.status(200).json({ status: 'success', data: vendorSiteData[0] , baseurl:process.env.VENDORCATEGORY_IMAGE});
    } else {
      return res.status(404).json({ status: 'error', message: 'No records found in the VendorSite collection' });
    }
  } catch (error) {
    return res.status(500).json({ status: 'error', data: error });
  }
});

  

  

 
  
module.exports = router;