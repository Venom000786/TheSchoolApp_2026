const bcrypt = require("bcryptjs");

const Student = require("../models/students");
const User = require("../models/user");

const Attendance = require("../models/attendance");
const Assignment = require("../models/assignment");
const AssignmentSubmission = require("../models/assignmentSubmission");


// ==========================
// DASHBOARD STATS
// ==========================
exports.getDashboardStats = async (req, res) => {

    try {

        // USERS
        const totalStudents =
        await User.countDocuments({
            role: "student"
        });

        const totalTeachers =
        await User.countDocuments({
            role: "teacher"
        });




        // ASSIGNMENTS
        const totalAssignments =
        await Assignment.countDocuments();




        // SUBMISSIONS
        const totalSubmissions =
        await AssignmentSubmission.countDocuments();




        // TODAY DATE
        const today =
        new Date()
        .toISOString()
        .split("T")[0];




        // TODAY ATTENDANCE
        const todayAttendance =
        await Attendance.find({
            date: today
        });




        // PRESENT
        const presentStudents =
        todayAttendance.filter(

            (a) =>
            a.status === "present"

        ).length;




        // ABSENT
        const absentStudents =
        todayAttendance.filter(

            (a) =>
            a.status === "absent"

        ).length;




        res.json({

            students:
            totalStudents,

            teachers:
            totalTeachers,

            assignments:
            totalAssignments,

            submissions:
            totalSubmissions,

            presentStudents,

            absentStudents
        });

    } catch (err) {

        res.status(500).json({

            message:
            err.message
        });
    }
};






// ==========================
// GET ALL USERS
// ==========================
exports.getAllUser = async (req, res) => {

    try {

        const users =
        await User.find()

        .select("-password");

        res.json(users);

    } catch (err) {

        res.status(500).json({

            message: err.message
        });
    }
};






// ==========================
// CREATE USER
// ==========================
exports.createUser = async (req, res) => {

    try {

        const {

            name,
            email,
            password,
            role

        } = req.body;



        // Existing user
        const existingUser =
        await User.findOne({ email });

        if (existingUser) {

            return res.status(400).json({

                message:
                "User already exists"
            });
        }



        // Hash password
        const hashedPassword =
        await bcrypt.hash(password, 10);




        // Create user
        const user =
        await User.create({

            name,

            email,

            password:
            hashedPassword,

            role,

            createdByAdmin: true
        });




        res.json({

            message:
            "User created successfully",

            user
        });

    } catch (err) {

        res.status(500).json({

            message: err.message
        });
    }
};






// ==========================
// UPDATE USER
// ==========================
exports.updateUser = async (req, res) => {

    try {

        const {

            name,
            email,
            role

        } = req.body;



        const user =
        await User.findByIdAndUpdate(

            req.params.id,

            {

                name,
                email,
                role
            },

            { new: true }

        ).select("-password");



        res.json(user);

    } catch (err) {

        res.status(500).json({

            message: err.message
        });
    }
};






// ==========================
// SEARCH USERS
// ==========================
exports.searchUsers = async (req, res) => {

    try {

        const keyword =
        req.query.search;



        const users =
        await User.find({

            name: {

                $regex: keyword,

                $options: "i"
            }

        }).select("-password");



        res.json(users);

    } catch (err) {

        res.status(500).json({

            message: err.message
        });
    }
};






// ==========================
// SEARCH STUDENT
// ==========================
exports.getStudentByScholar = async (req, res) => {

    try {

        const student =
        await Student.findOne({

            scholarNumber:
            req.params.scholarNumber

        }).populate(

            "parentId",

            "name email"
        );



        if (!student) {

            return res.status(404).json({

                msg:
                "Student not found"
            });
        }



        res.json(student);

    } catch (err) {

        res.status(500).json({

            message: err.message
        });
    }
};






// ==========================
// DELETE USER
// ==========================
exports.deleteUser = async (req, res) => {

    try {

        await User.findByIdAndDelete(

            req.params.id
        );



        res.json({

            msg:
            "User deleted"
        });

    } catch (err) {

        res.status(500).json({

            message: err.message
        });
    }
};