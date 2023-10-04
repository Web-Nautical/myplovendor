const mongoose = require("mongoose");
const { Schema } = mongoose;
const transactionSchema = new mongoose.Schema({
transactionId: {
type: String,
    required: true,
    unique:true
  },
  status:{
    type:String,
    default:"succeeded"
  },
  amount :{
    type:String,
  },
  productName:{
    type:String,
    required:true
  },
  productuserName:{
    type:String,
    required:true
  },
  vendorid: { type: Schema.Types.ObjectId, ref: 'Vendorreg' },
  paymentMethod:{
    type:String,
    required:true
  },
 
  paymentFor:{
    type:String,
    required:true
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

const transaction = mongoose.model("transaction", transactionSchema);

module.exports = transaction;