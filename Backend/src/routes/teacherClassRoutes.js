const express = require("express");

const router = express.Router();

const {

  createClass,

  getTeacherClasses,

  addStudentToClass

} = require(
  "../controllers/teacherClassController"
);

const {

  protect

} = require(
  "../middleware/authMiddleware"
);




// CREATE CLASS
router.post(
  "/",
  protect,
  createClass
);




// GET CLASSES
router.get(
  "/my",
  protect,
  getTeacherClasses
);




// ADD STUDENT
router.put(
  "/add-student",
  protect,
  addStudentToClass
);

module.exports = router;