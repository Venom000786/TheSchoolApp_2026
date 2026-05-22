const mongoose = require("mongoose");

const attendanceSchema =
new mongoose.Schema(

    {
        studentId: {

            type:
            mongoose.Schema.Types.ObjectId,

            ref: "User",

            required: true
        },

        className: {

            type: String,

            required: true
        },

        date: {

            type: String,

            required: true
        },

        status: {

            type: String,

            enum: [

                "present",

                "absent"
            ],

            default: "present"
        },

        role: {

            type: String,

            enum: [

                "student",

                "teacher"
            ],

            default: "student"
        },

        markedBy: {

            type:
            mongoose.Schema.Types.ObjectId,

            ref: "User"
        }
    },

    {
        timestamps: true
    }
);

module.exports =

    mongoose.models.Attendance ||

    mongoose.model(
        "Attendance",
        attendanceSchema
    );