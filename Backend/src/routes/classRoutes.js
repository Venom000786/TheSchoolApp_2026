const express = require("express");

const router = express.Router();

const {

    createClass,

    getTeacherClasses,

    addStudentToClass,

    removeStudentFromClass,

    getAllStudents,

    updateClass,

    deleteClass

} = require(
    "../controllers/classController"
);

const {

    protect

} = require(
    "../middleware/authMiddleware"
);

const Class = require(
    "../models/class"
);



// =====================================
// CREATE CLASS
// =====================================
router.post(
    "/",
    protect,
    createClass
);



// =====================================
// GET ALL CLASSES
// =====================================
router.get(

    "/",

    protect,

    async (req, res) => {

        try {

            let classes = [];



            // 👑 ADMIN -> ALL CLASSES
            if (
                req.user.role === "admin"
            ) {

                classes =
                await Class.find()

                .populate(
                    "teacher",
                    "name email"
                )

                .populate(
                    "students",
                    "name email"
                )

                .sort({
                    createdAt: -1
                });
            }



            // 👨‍🏫 TEACHER -> ONLY OWN CLASSES
            else if (
                req.user.role === "teacher"
            ) {

                classes =
                await Class.find({

                    teacher:
                    req.user.id

                })

                .populate(
                    "teacher",
                    "name email"
                )

                .populate(
                    "students",
                    "name email"
                )

                .sort({
                    createdAt: -1
                });
            }



            // 👨‍🎓 STUDENT -> ONLY JOINED CLASS
            else if (
                req.user.role === "student"
            ) {

                classes =
                await Class.find({

                    students:
                    req.user.id

                })

                .populate(
                    "teacher",
                    "name email"
                )

                .populate(
                    "students",
                    "name email"
                )

                .sort({
                    createdAt: -1
                });
            }



            res.json(classes);

        } catch (err) {

            console.log(err);

            res.status(500).json({

                message:
                "Failed to fetch classes"
            });
        }
    }
);



// =====================================
// GET TEACHER CLASSES
// =====================================
router.get(
    "/my",
    protect,
    getTeacherClasses
);



// =====================================
// GET ALL CLASSES
// ADMIN ASSIGNMENT PAGE USES THIS
// =====================================
router.get(

    "/all",

    protect,

    async (req, res) => {

        try {

            const classes =
            await Class.find()

            .populate(
                "teacher",
                "name email"
            )

            .populate(
                "students",
                "name email"
            )

            .sort({
                createdAt: -1
            });

            res.json(classes);

        } catch (err) {

            console.log(err);

            res.status(500).json({

                message:
                "Failed to fetch classes"
            });
        }
    }
);



// =====================================
// GET STUDENT CLASS
// =====================================
router.get(

    "/student/my",

    protect,

    async (req, res) => {

        try {

            const foundClass =
            await Class.findOne({

                students: req.user.id
            });

            if (!foundClass) {

                return res.status(404).json({

                    message:
                    "No class found"
                });
            }

            res.json({

                _id:
                foundClass._id,

                className:
                foundClass.className
            });

        } catch (err) {

            console.log(err);

            res.status(500).json({

                message:
                "Server Error"
            });
        }
    }
);



// =====================================
// GET ALL STUDENTS
// =====================================
router.get(
    "/students",
    protect,
    getAllStudents
);



// =====================================
// ADD STUDENT
// =====================================
router.post(
    "/add-student",
    protect,
    addStudentToClass
);



// =====================================
// REMOVE STUDENT
// =====================================
router.post(
    "/remove-student",
    protect,
    removeStudentFromClass
);



// =====================================
// UPDATE CLASS
// =====================================
router.put(
    "/:id",
    protect,
    updateClass
);



// =====================================
// DELETE CLASS
// =====================================
router.delete(
    "/:id",
    protect,
    deleteClass
);

module.exports = router;