const mongoose = require("mongoose");
const { Schema } = mongoose;
const gigsimageSchema = new mongoose.Schema({
 gigId: {
    type: Schema.Types.ObjectId,
    ref: 'Gigs',
    required: true,
  },
  image :{
    type:String,
    required: true,
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

const GigsImage = mongoose.model("Gigimage", gigsimageSchema);

module.exports = GigsImage;