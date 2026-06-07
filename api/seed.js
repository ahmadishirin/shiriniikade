const mongoose = require("mongoose");
require("dotenv").config({ path: ".env.local" });

const Product = require("./models/Product");
const products = require("./data");

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB Atlas");

    await Product.deleteMany({});
    console.log("Old products removed");

    const inserted = await Product.insertMany(products);
    console.log(`${inserted.length} products inserted successfully`);

    await mongoose.disconnect();
    console.log("Done!");
  } catch (err) {
    console.error("Error:", err.message);
    process.exit(1);
  }
}

seed();
