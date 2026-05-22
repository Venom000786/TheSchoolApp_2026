const Attendance =
require("../models/attendance");


// MARK ATTENDANCE
exports.markAttendance =
async (req, res) => {

    try {

        const {

            studentId,

            className,

            date,

            status,

            role

        } = req.body;


        if (

            !studentId ||

            !className ||

            !date

        ) {

            return res.status(400).json({

                message:
                "All fields are required"
            });
        }


        const alreadyMarked =
        await Attendance.findOne({

            studentId,

            date
        });


        // UPDATE EXISTING
        if (alreadyMarked) {

            alreadyMarked.status =
            status;

            alreadyMarked.className =
            className;

            alreadyMarked.role =
            role || "student";

            alreadyMarked.markedBy =
            req.user.id;

            await alreadyMarked.save();

            const updatedAttendance =
            await Attendance.findById(
                alreadyMarked._id
            )

            .populate(
                "studentId",
                "name email role className"
            )

            .populate(
                "markedBy",
                "name"
            );

            return res.json({

                message:
                "Attendance updated",

                attendance:
                updatedAttendance
            });
        }


        // CREATE NEW
        const attendance =
        await Attendance.create({

            studentId,

            className,

            date,

            status,

            role:
            role || "student",

            markedBy:
            req.user.id
        });


        const populatedAttendance =
        await Attendance.findById(
            attendance._id
        )

        .populate(
            "studentId",
            "name email role className"
        )

        .populate(
            "markedBy",
            "name"
        );


        res.json({

            message:
            "Attendance marked",

            attendance:
            populatedAttendance
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({

            message: err.message
        });
    }
};




// GET MY ATTENDANCE
exports.getMyAttendance =
async (req, res) => {

    try {

        const records =
        await Attendance.find({

            studentId:
            req.user.id
        })

        .populate(
            "markedBy",
            "name email"
        )

        .sort({
            createdAt: -1
        });


        const total =
        records.length;

        const present =
        records.filter(

            (r) =>
            r.status === "present"

        ).length;

        const absent =
        records.filter(

            (r) =>
            r.status === "absent"

        ).length;

        const percentage =

            total > 0

            ? (
                (present / total) * 100
              ).toFixed(1)

            : 0;


        res.json({

            records,

            stats: {

                total,

                present,

                absent,

                percentage
            }
        });

    } catch (err) {

        res.status(500).json({

            message: err.message
        });
    }
};




// GET ALL ATTENDANCE
exports.getAllAttendance =
async (req, res) => {

    try {

        const attendance =
        await Attendance.find()

        .populate(
            "studentId",
            "name email role className"
        )

        .populate(
            "markedBy",
            "name"
        )

        .sort({
            createdAt: -1
        });


        res.json(attendance);

    } catch (err) {

        console.log(err);

        res.status(500).json({

            message: err.message
        });
    }
};




// GET TODAY ATTENDANCE
exports.getTodayAttendance =
async (req, res) => {

    try {

        const today =
        new Date()
        .toISOString()
        .split("T")[0];


        const attendance =
        await Attendance.find({

            date: today
        })

        .populate(
            "studentId",
            "name email role className"
        )

        .populate(
            "markedBy",
            "name"
        );


        const presentStudents =
        attendance.filter(

            (a) =>
            a.status === "present"

        ).length;

        const absentStudents =
        attendance.filter(

            (a) =>
            a.status === "absent"

        ).length;


        res.json({

            date: today,

            presentStudents,

            absentStudents,

            records: attendance
        });

    } catch (err) {

        res.status(500).json({

            message: err.message
        });
    }
};




// UPDATE ATTENDANCE
exports.updateAttendance =
async (req, res) => {

    try {

        const attendance =
        await Attendance.findById(
            req.params.id
        );

        if (!attendance) {

            return res.status(404).json({

                message:
                "Attendance not found"
            });
        }

        attendance.status =
        req.body.status;

        await attendance.save();

        const updatedAttendance =
        await Attendance.findById(
            attendance._id
        )

        .populate(
            "studentId",
            "name email role className"
        )

        .populate(
            "markedBy",
            "name"
        );

        res.json({

            message:
            "Attendance updated",

            attendance:
            updatedAttendance
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({

            message: err.message
        });
    }
};




// DELETE ATTENDANCE
exports.deleteAttendance =
async (req, res) => {

    try {

        await Attendance.findByIdAndDelete(
            req.params.id
        );

        res.json({

            message:
            "Attendance deleted"
        });

    } catch (err) {

        res.status(500).json({

            message: err.message
        });
    }
};