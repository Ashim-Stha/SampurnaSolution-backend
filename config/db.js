"use strict";
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
    });
    console.log("Database connection established");
  } catch (e) {
    console.error("error", e.message);
    process.exit(1);
  }
};

module.exports = connectDB;
