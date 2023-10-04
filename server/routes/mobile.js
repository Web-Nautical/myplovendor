const gigsModel = require("../model/gigs");
const gigsImageModel = require("../model/gigimages");
const vendorcatModel = require("../model/vendorCategory");
const VendorSubCat = require("../model/vendorSubCategory");
const Vendor = require("../model/vendor");

const express = require("express");
const router = express.Router();
const fs = require('fs');
require("dotenv").config({ path: "./config.env" });


router.post('/addgigsdata', async (req, res) => {
  try {
    const { title, description, category, subcategory, price, location, gigId, video: base64Video, images: base64Images } = req.body;

    const authHeader = req.headers.xauthorization;
    console.log(authHeader)

    if (authHeader) {
      const authToken = authHeader.split(' ')[1];
      const vendor = await Vendor.findOne({ vendorauthtoken: authToken });

      if (vendor) {
        const vendorId = vendor._id;

        let savedGig = {};

        if (gigId) {

          const existingGig = await gigsModel.findById(gigId);

          if (existingGig) {

            existingGig.title = title;
            existingGig.description = description;
            existingGig.category = category;
            existingGig.subcategory = subcategory;
            existingGig.price = price;
            existingGig.location = location;

            if (base64Video) {
              const videoData = base64Video.replace(/^data:video\/\w+;base64,/, ''); // Remove data URL prefix
              const videoBuffer = Buffer.from(videoData, 'base64'); // Convert base64 data to buffer
              const videoFilename = Date.now() + '.mp4'; // You can adjust the filename and extension
              fs.writeFileSync('uploads/gigs/' + videoFilename, videoBuffer); // Save the video to the destination
              existingGig.video = videoFilename; // Update the video field
            }

            savedGig = await existingGig.save();
          }
        } else {
          let videoFile = '';
          if (base64Video) {

            const videoData = base64Video.replace(/^data:video\/\w+;base64,/, ''); // Remove data URL prefix  
            const videoBuffer = Buffer.from(videoData, 'base64'); // Convert base64 data to buffer
            const videoFilename = Date.now() + '.mp4'; // You can adjust the filename and extension
            fs.writeFileSync('uploads/gigs/' + videoFilename, videoBuffer); // Save the video to the destination
            videoFile = videoFilename;
          }
          //cheack duplecate title 
          const cheack = await gigsModel.find({ title: title })
          if (cheack.length !== 0) {
            return res.status(400).json({ status: 'error', message: 'title is duplicate please enter a unique', status: 400 });
          }
          const gig = new gigsModel({
            title,
            description,
            category,
            subcategory,
            price,
            location,
            vendorid: vendorId,
            video: videoFile
          });

          savedGig = await gig.save();

        }

        if (base64Images && base64Images.length > 0) {

          const imageIds = []; // Array to store the image IDs
          const imagePromises = base64Images.map(async (base64Image) => {
            const imageData = base64Image.replace(/^data:image\/\w+;base64,/, ''); // Remove data URL prefix
            const imageBuffer = Buffer.from(imageData, 'base64'); // Convert base64 data to buffer
            const imageFilename = Date.now() + '.jpg'; // You can adjust the filename and extension
            fs.writeFileSync('uploads/gigs/' + imageFilename, imageBuffer); // Save the image to the destination

            const image = new gigsImageModel({
              gigId: savedGig._id,
              image: imageFilename
              // Add any other properties related to the image table
            });
            const savedImage = await image.save();

            savedGig.gigImages.push(savedImage._id); // Push the image ID to gigImages field
          });
          await Promise.all(imagePromises);

          await savedGig.save();
        }
        // console.log(savedImage)
        // return
        return res.status(200).json({ status: 'success', message: 'Gigs Data Saved Successfully' });
      } else {
        return res.status(200).json({ status: 'error', message: 'Token Expired' });
      }
    } else {
      return res.status(200).json({ status: 'error', message: 'Token Expired' });
    }
  } catch (error) {
    console.error(error); // Log the error
    return res.status(500).json({ status: 'error', message: 'An error occurred' });
  }
});

// ... (other routes and export)


module.exports = router;
