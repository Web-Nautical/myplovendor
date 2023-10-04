const mongoose = require("mongoose");
const { Schema } = mongoose;
const vendorSchema = new mongoose.Schema({
    vendorname: {
    type: String,
    required: true,
    unique:true
  },
  vendoremail :{
    type:String,
    required:true,
    unique:true
  },
  companyname:{
    type:String,
    required:true
  },
  vendorpassword:{
    type:String,
    required:true
  },
  status:{
    type:String,
    default:"Active"
  },
  vendorauthtoken:{
    type:String,
  },
  vendormobile:{ 
    type:String,
  },
  vendoraddress:{
    type:String,
  },
  ratings:{
    type : Number
    },
  vendorstate:{
    type:String,
  },
  vendordescription:{
    type:String,
  },
  vendorcountry:{
    type:String,
  },
  stripebusinesstype: {
    type: String,
  },
  stripefirstname :{
    type:String,
  },
  stripelastname :{
    type:String,
  },
  stripedob:{
    type:String,
  },
  stripecompanyname:{
    type:String,
  },
  stripeaddressline1:{
    type:String,
  },
  stripeaddressline2:{
    type:String,
  },
  stripeaddresscity:{
    type:String,
  },
  stripeaddressstate:{
    type:String,
  },
  stripeaddresspostalcode:{
    type:String,
  },
  stripeaccontid:{
    type:String,
  },
  stripeaccountresponse:{
    type:String,
  },
  membershipstartdate:{
    type:String,
},
  membershipenddate:{
    type:String,
 },
 image:{
 type : String
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

const Vendor = mongoose.model("Vendorreg", vendorSchema);

module.exports = Vendor;