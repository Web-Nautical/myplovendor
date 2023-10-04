const mongoose = require("mongoose");
const { Schema } = mongoose;
const usersSchema = new mongoose.Schema({
    _id: { type: Number, required: true }, 
    
  verifications:{
    type:String,
  },
  amount:{
    type:Number,
  },
  unit:{
    type:String,
  },
  blocked:{
    type:Array,
  },
  favourites:{
    type:Array,
  },
  userName:{
    type:String,
  },
  email :{
    type:String,
  },
  password :{
    type:String,
  },
  EmailExpires: {
    type: Date,
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  },
  ratings:{
    type:Array,
  },
  recentProducts:{
    type:Array,
  },
  buyerShippingAddress:{
    type:Array,
  },
  payOutMethod:{
    type:Array,
  },
 status:{
    type:String,
  },
  imageSource: { type: String}
});
const user = mongoose.model("users", usersSchema);
module.exports = user;