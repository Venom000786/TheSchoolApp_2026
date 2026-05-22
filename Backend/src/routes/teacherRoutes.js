const express = require("express");
const router = express.Router();
const {getAllSubmissions,reviewSubmission} = require("../controllers/teacherController");
const {protect} = require("../middleware/authMiddleware");

// Get submissions
router.get("/submissions",protect,getAllSubmissions);
// Review submission
router.put("/review/:id",protect,reviewSubmission);

module.exports = router;