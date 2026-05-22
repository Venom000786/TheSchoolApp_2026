const Inventory = require("../models/Inventory");

// Add item
exports.addItem = async (req, res) => {
  try {
    const item = await Inventory.create(req.body);
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all items
exports.getItems = async (req, res) => {
  const items = await Inventory.find();
  res.json(items);
};

// Update item
exports.updateItem = async (req, res) => {
  const item = await Inventory.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(item);
};

// Delete item
exports.deleteItem = async (req, res) => {
  await Inventory.findByIdAndDelete(req.params.id);
  res.json({ msg: "Item deleted" });
};