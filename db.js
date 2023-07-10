const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
    });
    console.log("Connected To DB");
  } catch (error) {
    console.error("Failed To Connect To The DB", error);
    process.exit(1);
  }
};

module.exports = connectDB;
