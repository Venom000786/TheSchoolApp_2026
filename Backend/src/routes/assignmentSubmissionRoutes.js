const express = require("express");

const router = express.Router();

const {

    submitAssignment,

    getMySubmissions,

    getAllSubmissions

} = require(
    "../controllers/assignmentSubmissionController"
);

const {

    protect

} = require(
    "../middleware/authMiddleware"
);




// SUBMIT ASSIGNMENT
router.post(
    "/",
    protect,
    submitAssignment
);




// GET MY SUBMISSIONS
router.get(
    "/my",
    protect,
    getMySubmissions
);




// GET ALL SUBMISSIONS
router.get(
    "/all",
    protect,
    getAllSubmissions
);

module.exports = router;