const mongoose = require("mongoose");

const connectToDatabase = async () => {
  try {
    await mongoose.connect("mongodb+srv://vercel-admin-user:pKJVo2CkQETfaYOG@mymongodb.ekopuki.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
      // Kosongkan objek untuk menghindari peringatan
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1);
  }
};

module.exports = { connectToDatabase };
