const express = require("express");
const router = express.Router();
const {submitAssignment,getMySubmission} = require("../controllers/submissionController");
const {protect} = require("../middleware/authMiddleware");

//Submit assignment
router.post("/", protect, submitAssignment);
// Get my submissions
router.get("/my", protect, getMySubmission);

module.exports = router;