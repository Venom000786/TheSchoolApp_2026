const express = require("express");

const router = express.Router();

const {
    uploadTimetablePdf,
    getTimetable,
    deleteTimetable
} = require("../controllers/timetableController");

const {
    protect
} = require("../middleware/authMiddleware");

const upload = require("../middleware/uploadMiddleware");




// ADMIN CHECK
const adminOnly = (req, res, next) => {

    if (req.user.role !== "admin") {

        return res.status(403).json({
            message: "Admin access only"
        });
    }

    next();
};




// GET TIMETABLE
router.get(
    "/",
    protect,
    getTimetable
);




// UPLOAD PDF
router.post(
    "/upload-pdf",
    protect,
    adminOnly,
    upload.single("pdf"),
    uploadTimetablePdf
);




// DELETE TIMETABLE
router.delete(
    "/",
    protect,
    adminOnly,
    deleteTimetable
);

module.exports = router;