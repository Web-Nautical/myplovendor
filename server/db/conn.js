const mongoose = require('mongoose');
const Db = process.env.ATLAS_URI;

const connectDB = async () => {
    try {
      await mongoose.connect(Db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("MongoDB Connected");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
    }
  };
  
  module.exports = connectDB;
