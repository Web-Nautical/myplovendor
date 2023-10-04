const mongoose = require("mongoose");
const { Schema } = mongoose;
const VendorOrderSchema = new mongoose.Schema({
   gigId: { type: Schema.Types.ObjectId,ref: 'Gigs',required: true,},
 vendorid: { type: Schema.Types.ObjectId, ref: 'Vendorreg' },
 userid: { type: Schema.Types.Number, ref: 'users' },
 chatid: { type: Schema.Types.ObjectId, ref: 'Vendorchatmessages' },
 reqdate:{
    type: Date
 },
 reqtime:{
    type: String
 },
 amount:{
    type: Number,
 },
 stripetransactionid:{
    type: String,
 },
 stripetransactionresponse:{
    type: {}
},
  status:{
    type:String,
    default: 0
 },  
 created_at: {
    type: Date,
    default: Date.now
},
updated_at: {
    type: Date,
    default: Date.now
},
gigname: {
    type: String
},
vendorname:{
   type : String
},
username:{
   type : String
},
readstatus:{
type :Boolean,
default : false
}
});
const VendorOrder = mongoose.model("VendorOrder", VendorOrderSchema);
module.exports = VendorOrder;