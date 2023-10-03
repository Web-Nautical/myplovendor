const mongoose = require("mongoose");
const { Schema } = mongoose;
const vendorbankSchema = new mongoose.Schema({
  vendorid: { type: Schema.Types.ObjectId, ref: 'Vendor' },
  accountstripeid:{
    type:String,
    required:true
  },
  accountholdername:{
    type:String,
    required:true
  },
  accountnumber:{
    type:String,
    required:true
  },
  accountroutingnumber:{
    type:String,
    required:true
  },
  stripebanktoken:{
    type:String,
  },
  stripebanktokenresponse:{
    type:String,
  },
  stripebankaccountid:{
    type:String,
  },
  stripebankaccountresponse:{
    type:String,
  },
  primaryaccount:{
   type : Boolean
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

const VendorBank = mongoose.model("Vendorbankdata", vendorbankSchema);

module.exports = VendorBank;
 