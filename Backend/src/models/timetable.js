const mongoose = require("mongoose");

const timetableSchema =
new mongoose.Schema(

    {

        className: {

            type: String,

            required: true,

            trim: true
        },



        day: {

            type: String,

            required: true,

            enum: [

                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday"
            ]
        },



        periods: [

            {

                startTime: {

                    type: String,

                    required: true
                },



                endTime: {

                    type: String,

                    required: true
                },



                subject: {

                    type: String,

                    required: true,

                    trim: true
                },



                teacher: {

                    type:
                    mongoose.Schema.Types.ObjectId,

                    ref: "User"
                },



                room: {

                    type: String,

                    trim: true
                }
            }
        ],



        // 📄 Uploaded timetable PDF
        pdfFile: {

            type: String,

            default: ""
        },



        // 📝 Optional notes
        notes: {

            type: String,

            default: ""
        }

    },

    {

        timestamps: true
    }
);

module.exports =

    mongoose.models.Timetable ||

    mongoose.model(
        "Timetable",
        timetableSchema
    );