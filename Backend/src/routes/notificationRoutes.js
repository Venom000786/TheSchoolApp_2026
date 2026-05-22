const express = require("express");
const router = express.Router();
const { getMyNotifications, markAsRead } = require("../controllers/notificationController");
const { protect } = require("../middleware/authMiddleware");

// Get notifications
router.get("/my", protect, getMyNotifications);
// Mark read
router.put("/read/:id", protect, markAsRead);

module.exports = router;