const mongoose = require("mongoose");
const { Schema } = mongoose;
const reportedgigs = new mongoose.Schema({
       userid: { type: Schema.Types.Number, ref: 'users',required: true },
    vendorid: { type: Schema.Types.ObjectId, ref: 'Vendorreg',required: true },
    gigId: { type: Schema.Types.ObjectId,ref: 'Gigs',required: true,},
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
});
const reportedgigsmodel = mongoose.model("reportedgigs", reportedgigs);
module.exports = reportedgigsmodel;