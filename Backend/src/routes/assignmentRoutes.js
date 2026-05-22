const express = require("express");

const router = express.Router();

const {

    createAssignment,

    getAssignments,

    deleteAssignment

} = require(
    "../controllers/assignmentController"
);

const {

    protect

} = require(
    "../middleware/authMiddleware"
);




// ➕ CREATE
router.post(
    "/",
    protect,
    createAssignment
);




// 📥 GET
router.get(
    "/",
    protect,
    getAssignments
);




// ❌ DELETE
router.delete(
    "/:id",
    protect,
    deleteAssignment
);

module.exports = router;