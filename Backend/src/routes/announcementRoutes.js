const express = require("express");

const router = express.Router();

const {
    createAnnouncement,
    getAnnouncements,
    deleteAnnouncement
} = require(
    "../controllers/announcementController"
);

const {
    protect
} = require(
    "../middleware/authMiddleware"
);



// CREATE
router.post(
    "/",
    protect,
    createAnnouncement
);



// GET ALL
router.get(
    "/",
    protect,
    getAnnouncements
);



// DELETE
router.delete(
    "/:id",
    protect,
    deleteAnnouncement
);

module.exports = router;