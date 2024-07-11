const mongoose = require("mongoose");
const { connectToDB, Scrape } = require("./db");

// Function to save scraped data to MongoDB
const saveToMongoDB = async (data) => {
  let isConnected = false;
  try {
    await connectToDB();
    isConnected = true;

    // Save data to MongoDB
    await Scrape.insertMany(data);
    console.log("Scraped data saved to MongoDB");
  } catch (err) {
    console.error("Error saving to MongoDB:", err);
  } finally {
    if (isConnected) {
      await mongoose.disconnect();
      console.log("Disconnected from MongoDB");
    }
  }
};

module.exports = {
  saveToMongoDB,
};
