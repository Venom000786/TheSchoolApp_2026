const User = require("../models/user");
const Attendance = require("../models/attendance");
const Assignment = require("../models/assignment");
const Submission = require("../models/submission");

exports.getDashboardAnalytics = async (req, res) => {
    try {
        // Total students
        const totalStudents =
            await User.countDocuments({
                role: "student"
            });


        // Total teachers
        const totalTeachers =
            await User.countDocuments({
                role: "teacher"
            });


        //  Total assignments
        const totalAssignments =
            await Assignment.countDocuments();


        //  Total submissions
        const totalSubmissions =
            await Submission.countDocuments();


        //  Absent students
        const absentCount =
            await Attendance.countDocuments({
                status: "absent"
            });


        //  Present students
        const presentCount =
            await Attendance.countDocuments({
                status: "present"
            });

        res.json({
            totalStudents,
            totalTeachers,
            totalAssignments,
            totalSubmissions,
            attendance: {
                present: presentCount,
                absent: absentCount
            }
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};