const mongoose = require("mongoose");
const vendorcatSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique:true
  },
  image :{
    type:String,
  },
  description:{
    type:String,
  },
  status:{
    type:String,
    default:"Active"
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  },
});

const VendorCat = mongoose.model("VendorCat", vendorcatSchema);

module.exports = VendorCat;