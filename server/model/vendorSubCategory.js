const mongoose = require("mongoose");
const { Schema } = mongoose;
const vendorsubcatSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
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
  image:{
   type : String
  },
  parent:{ type: Schema.Types.ObjectId, ref: 'VendorCat' },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  },
});

const VendorSubCat = mongoose.model("VendorsubCat", vendorsubcatSchema);

module.exports = VendorSubCat;