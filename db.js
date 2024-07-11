const mongoose = require("mongoose");

// MongoDB schema definition
const scrapeSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    image: String,
    url: String,
  },
  { timestamps: true }
);

// MongoDB model creation
const Scrape = mongoose.model("Scrape", scrapeSchema);

// MongoDB connection function
const connectToDB = async () => {
  const mongoURI = process.env.MONGODB_URI;
  if (!mongoURI) {
    throw new Error("MONGODB_URI not defined in .env file");
  }

  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};

module.exports = {
  connectToDB,
  Scrape,
};
