const express = require("express");
const router = express.Router();
const {addItem,getItems,updateItem,deleteItem} = require("../controllers/inventoryController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

router.post("/", protect, adminOnly, addItem);
router.get("/", protect, adminOnly, getItems);
router.put("/:id", protect, adminOnly, updateItem);
router.delete("/:id", protect, adminOnly, deleteItem);

module.exports = router;