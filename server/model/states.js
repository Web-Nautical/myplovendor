const mongoose = require("mongoose");
const { Schema } = mongoose;
const statesSchema = new mongoose.Schema({
name: {
type: String,
  },
abbreviation: {
type: String,
  },

});

const states = mongoose.model("state", statesSchema);

module.exports = states;