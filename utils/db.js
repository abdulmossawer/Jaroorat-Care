const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MpngoDb connected Succesfull");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;