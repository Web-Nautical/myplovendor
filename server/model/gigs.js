const mongoose = require("mongoose");
const { Schema } = mongoose;
const gigsSchema = new mongoose.Schema({
 title: {
    type: String,
    required: true,
    unique:true
  },
  image :{
    type:String,
  },
  video :{
    type:String,
  },
  gigCount:{
    type : String
  },
  // startDate: {
  //   type: Date,
  //   required: true
  // }, 
  // endDate: {
  //   type: Date,
  //   required: true
  // },
  vendorid: { type: Schema.Types.ObjectId, ref: 'Vendorreg' },
  category: { type: Schema.Types.ObjectId, ref: 'VendorCat' },
  subcategory: { type: Schema.Types.ObjectId, ref: 'VendorsubCat' },
  price:{
    type:Number,
    required:true
  },
  description :{
    type:String,
  },
  location :{
    type:String,
  },
  ratings:{
  type : Number
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  },
  gigImages: [{ type: Schema.Types.ObjectId, ref: 'Gigimage' }] // Reference to the GigsImage model

});

const Gigs = mongoose.model("Gigs", gigsSchema);

module.exports = Gigs;