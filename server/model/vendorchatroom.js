const mongoose = require("mongoose");
const { Schema } = mongoose;
const vendorchatRoomSchema = new mongoose.Schema({
    gigId: {
    type: Schema.Types.ObjectId,
    ref: 'Gigs',
    required: true,
    },
    vendorid: { type: Schema.Types.ObjectId, ref: 'Vendorreg' },
    userid: { type: Schema.Types.Number, ref: 'users' },
    messageCount:{
        type : String,
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

const VendorChatRoom = mongoose.model("Vendorchatroom", vendorchatRoomSchema);

module.exports = VendorChatRoom;