const ClassModel =
require("../models/class");

const User =
require("../models/user");



// ==========================================
// CREATE CLASS
// ==========================================
exports.createClass =
async (req, res) => {

    try {

        const {
            className
        } = req.body;



        if (!className) {

            return res.status(400).json({

                message:
                "Class name is required"
            });
        }



        const exists =
        await ClassModel.findOne({

            className:
            className.trim()
        });



        if (exists) {

            return res.status(400).json({

                message:
                "Class already exists"
            });
        }



        const newClass =
        await ClassModel.create({

            className:
            className.trim(),

            teacher:
            req.user.id,

            students: []
        });



        res.status(201).json({

            message:
            "Class created successfully",

            class:
            newClass
        });

    } catch (err) {

        res.status(500).json({

            message:
            err.message
        });
    }
};



// ==========================================
// GET TEACHER CLASSES
// ==========================================
exports.getTeacherClasses =
async (req, res) => {

    try {

        let query = {};



        // 👨‍🏫 Teacher -> only own classes
        if (req.user.role === "teacher") {

            query.teacher = req.user.id;
        }



        // 👑 Admin -> all classes
        if (req.user.role === "admin") {

            query = {};
        }



        const classes =
        await ClassModel.find(query)

        .populate(
            "teacher",
            "name email"
        )

        .populate(
            "students",
            "name email role"
        )

        .sort({
            createdAt: -1
        });



        res.json(classes);

    } catch (err) {

        res.status(500).json({

            message:
            err.message
        });
    }
};



// ==========================================
// ADD STUDENT TO CLASS
// ==========================================
exports.addStudentToClass =
async (req, res) => {

    try {

        const {
            classId,
            studentId
        } = req.body;



        if (
            !classId ||
            !studentId
        ) {

            return res.status(400).json({

                message:
                "Class ID and Student ID are required"
            });
        }



        const classData =
        await ClassModel.findById(
            classId
        );



        if (!classData) {

            return res.status(404).json({

                message:
                "Class not found"
            });
        }



        // 🔒 SECURITY
        if (

            req.user.role !== "admin" &&

            classData.teacher.toString()

            !==

            req.user.id

        ) {

            return res.status(403).json({

                message:
                "Unauthorized"
            });
        }



        const student =
        await User.findById(
            studentId
        );



        if (!student) {

            return res.status(404).json({

                message:
                "Student not found"
            });
        }



        if (
            student.role !== "student"
        ) {

            return res.status(400).json({

                message:
                "Only students can be added"
            });
        }



        // 🚫 Prevent duplicate
        const alreadyExists =

            classData.students.some(

                (id) =>

                    id.toString()

                    ===

                    studentId
            );



        if (alreadyExists) {

            return res.status(400).json({

                message:
                "Student already added"
            });
        }



        classData.students.push(
            studentId
        );



        await classData.save();



        const updatedClass =
        await ClassModel.findById(
            classId
        )

        .populate(
            "students",
            "name email role"
        );



        res.json({

            message:
            "Student added successfully",

            class:
            updatedClass
        });

    } catch (err) {

        res.status(500).json({

            message:
            err.message
        });
    }
};



// ==========================================
// REMOVE STUDENT FROM CLASS
// ==========================================
exports.removeStudentFromClass =
async (req, res) => {

    try {

        const {
            classId,
            studentId
        } = req.body;



        const classData =
        await ClassModel.findById(
            classId
        );



        if (!classData) {

            return res.status(404).json({

                message:
                "Class not found"
            });
        }



        // 🔒 SECURITY
        if (

            req.user.role !== "admin" &&

            classData.teacher.toString()

            !==

            req.user.id

        ) {

            return res.status(403).json({

                message:
                "Unauthorized"
            });
        }



        classData.students =
        classData.students.filter(

            (id) =>

                id.toString()

                !==

                studentId
        );



        await classData.save();



        res.json({

            message:
            "Student removed successfully"
        });

    } catch (err) {

        res.status(500).json({

            message:
            err.message
        });
    }
};



// ==========================================
// GET ALL STUDENTS
// ==========================================
exports.getAllStudents =
async (req, res) => {

    try {

        const students =
        await User.find({

            role: "student"
        })

        .select(
            "name email role"
        )

        .sort({
            name: 1
        });



        res.json(students);

    } catch (err) {

        res.status(500).json({

            message:
            err.message
        });
    }
};



// ==========================================
// UPDATE CLASS
// ==========================================
exports.updateClass =
async (req, res) => {

    try {

        const {
            className
        } = req.body;



        if (!className) {

            return res.status(400).json({

                message:
                "Class name is required"
            });
        }



        const classData =
        await ClassModel.findById(
            req.params.id
        );



        if (!classData) {

            return res.status(404).json({

                message:
                "Class not found"
            });
        }



        // 🔒 SECURITY
        if (

            req.user.role !== "admin" &&

            classData.teacher.toString()

            !==

            req.user.id

        ) {

            return res.status(403).json({

                message:
                "Unauthorized"
            });
        }



        classData.className =
        className.trim();



        await classData.save();



        res.json({

            message:
            "Class updated successfully",

            class:
            classData
        });

    } catch (err) {

        res.status(500).json({

            message:
            err.message
        });
    }
};



// ==========================================
// DELETE CLASS
// ==========================================
exports.deleteClass =
async (req, res) => {

    try {

        const classData =
        await ClassModel.findById(
            req.params.id
        );



        if (!classData) {

            return res.status(404).json({

                message:
                "Class not found"
            });
        }



        // 🔒 SECURITY
        if (

            req.user.role !== "admin" &&

            classData.teacher.toString()

            !==

            req.user.id

        ) {

            return res.status(403).json({

                message:
                "Unauthorized"
            });
        }



        await ClassModel.findByIdAndDelete(
            req.params.id
        );



        res.json({

            message:
            "Class deleted successfully"
        });

    } catch (err) {

        res.status(500).json({

            message:
            err.message
        });
    }
};