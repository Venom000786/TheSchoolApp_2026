const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  stock: Number,
  supplier: String
}, { timestamps: true });

module.exports = mongoose.model("Inventory", inventorySchema);