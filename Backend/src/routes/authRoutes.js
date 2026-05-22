const express = require("express")
const { protect, adminOnly } = require("../middleware/authMiddleware")
const { createUser, loginUser } = require("../controllers/authControllers")
const router = express.Router()

router.post('/create', protect, adminOnly, createUser)
// router.post("/create", createUser); // remove protect/adminOnly temporarily
router.post('/login', loginUser)

module.exports = router;