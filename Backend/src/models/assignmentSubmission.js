const mongoose = require("mongoose");

const assignmentSubmissionSchema =
new mongoose.Schema(

    {

        assignmentId: {

            type:
            mongoose.Schema.Types.ObjectId,

            ref: "Assignment",

            required: true
        },


        studentId: {

            type:
            mongoose.Schema.Types.ObjectId,

            ref: "User",

            required: true
        },


        submissionText: {

            type: String
        },


        fileUrl: {

            type: String
        },


        submittedAt: {

            type: Date,

            default: Date.now
        }

    },

    {

        timestamps: true
    }
);


module.exports =

    mongoose.models.AssignmentSubmission ||

    mongoose.model(

        "AssignmentSubmission",

        assignmentSubmissionSchema
    );