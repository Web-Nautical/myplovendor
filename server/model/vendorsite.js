const mongoose = require("mongoose");
const { Schema } = mongoose;
const VendorSiteSchema = new mongoose.Schema({
gigId: {type: Number},
membetship_price:{type:Number},
vendor_intro:{type:String},
video:{type:String},
 created_at: {
    type: Date,
    default: Date.now
},
updated_at: {
    type: Date,
    default: Date.now
},

});
const VendorSite = mongoose.model("VendorSite", VendorSiteSchema);
module.exports = VendorSite;