const mongoose = require("mongoose");
const { Schema } = mongoose;
const vendorchatMsgSchema = new mongoose.Schema({
    roomid: { type: Schema.Types.ObjectId, ref: 'Vendorchatroom' },
    message:{
    type: String,
    required: true,
    },
    readmessage:{
    type: String,
    default: false,
    },
    userid: { type: Schema.Types.Number, ref: 'users' },
    sentby:{
    type: String,
    required: true,
    },
    vendorid: { type: Schema.Types.ObjectId, ref: 'Vendorreg' },
    gigId: {
    type: Schema.Types.ObjectId,
    ref: 'Gigs',
    required: true,
    },
    makeanoffer: {
    type : Boolean,
    default : false
    },
    amount:{
        type : String
    },
    date:{
        type: Date
    },
    time:{
        type : String
    },
   offeraccepted:{
    type : Number,
    default : 0 
   },
   offeracceptedid:{
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

const VendorMsgRoom = mongoose.model("Vendorchatmessages", vendorchatMsgSchema);

module.exports = VendorMsgRoom;