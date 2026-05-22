const express = require("express");

const router = express.Router();

const {

    markAttendance,

    getMyAttendance,

    getAllAttendance,

    deleteAttendance,

    updateAttendance,

    getTodayAttendance

} = require(
    "../controllers/attendanceController"
);

const {

    protect

} = require(
    "../middleware/authMiddleware"
);



// MARK ATTENDANCE
router.post(
    "/",
    protect,
    markAttendance
);



// STUDENT ATTENDANCE
router.get(
    "/my",
    protect,
    getMyAttendance
);



// GET ALL ATTENDANCE
router.get(
    "/",
    protect,
    getAllAttendance
);



// GET TODAY ATTENDANCE
router.get(
    "/today",
    protect,
    getTodayAttendance
);



// UPDATE ATTENDANCE
router.put(
    "/:id",
    protect,
    updateAttendance
);



// DELETE ATTENDANCE
router.delete(
    "/:id",
    protect,
    deleteAttendance
);

module.exports = router;