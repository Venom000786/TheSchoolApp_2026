const express = require("express");

const router = express.Router();

const {
    protect,
    adminOnly
} = require("../middleware/authMiddleware");

const {

    getAllUser,

    getStudentByScholar,

    deleteUser,

    createUser,

    updateUser,

    searchUsers,
 
    getDashboardStats

} = require("../controllers/adminController");



//  DASHBOARD STATS
router.get(
    "/dashboard-stats",
    protect,
    getDashboardStats
);


// Get all users
router.get(
    "/users",
    protect,
    getAllUser
);



// Search users
router.get(
    "/search",
    protect,
    adminOnly,
    searchUsers
);



// Get student by scholar number
router.get(
    "/student/:scholarNumber",
    protect,
    adminOnly,
    getStudentByScholar
);



// Create new user
router.post(
    "/users",
    protect,
    adminOnly,
    createUser
);



// Update user
router.put(
    "/user/:id",
    protect,
    adminOnly,
    updateUser
);



// Delete user
router.delete(
    "/user/:id",
    protect,
    adminOnly,
    deleteUser
);

module.exports = router;