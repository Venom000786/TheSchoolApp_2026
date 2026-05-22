const AssignmentSubmission =
require("../models/assignmentSubmission");

const Assignment =
require("../models/assignment");




// ==========================
// SUBMIT ASSIGNMENT
// ==========================
exports.submitAssignment =
async (req, res) => {

    try {

        const {

            assignmentId,

            submissionText,

            fileUrl

        } = req.body;



        // VALIDATION
        if (!assignmentId) {

            return res.status(400).json({

                message:
                "Assignment ID required"
            });
        }



        // CHECK ASSIGNMENT EXISTS
        const assignment =
        await Assignment.findById(
            assignmentId
        );



        if (!assignment) {

            return res.status(404).json({

                message:
                "Assignment not found"
            });
        }



        // CHECK ALREADY SUBMITTED
        const alreadySubmitted =
        await AssignmentSubmission.findOne({

            assignment:
            assignmentId,

            student:
            req.user.id
        });



        if (alreadySubmitted) {

            return res.status(400).json({

                message:
                "Assignment already submitted"
            });
        }



        // CREATE SUBMISSION
        const submission =
        await AssignmentSubmission.create({

            assignment:
            assignmentId,

            student:
            req.user.id,

            submissionText:
            submissionText || "",

            fileUrl:
            fileUrl || ""
        });



        // POPULATE DATA
        const populatedSubmission =
        await AssignmentSubmission.findById(
            submission._id
        )

        .populate(
            "student",
            "name email"
        )

        .populate(
            "assignment"
        );



        res.status(201).json({

            message:
            "Assignment submitted successfully",

            submission:
            populatedSubmission
        });

    } catch (err) {

        res.status(500).json({

            message:
            err.message
        });
    }
};








// ==========================
// GET MY SUBMISSIONS
// ==========================
exports.getMySubmissions =
async (req, res) => {

    try {

        const submissions =
        await AssignmentSubmission.find({

            student:
            req.user.id
        })

        .populate(
            "assignment"
        )

        .sort({

            createdAt: -1
        });



        res.json(submissions);

    } catch (err) {

        res.status(500).json({

            message:
            err.message
        });
    }
};








// ==========================
// GET ALL SUBMISSIONS
// ==========================
exports.getAllSubmissions =
async (req, res) => {

    try {

        const submissions =
        await AssignmentSubmission.find()

        .populate(
            "student",
            "name email role"
        )

        .populate(
            "assignment"
        )

        .sort({

            createdAt: -1
        });



        res.json(submissions);

    } catch (err) {

        res.status(500).json({

            message:
            err.message
        });
    }
};








// ==========================
// DELETE SUBMISSION
// ==========================
exports.deleteSubmission =
async (req, res) => {

    try {

        const submission =
        await AssignmentSubmission.findById(
            req.params.id
        );



        if (!submission) {

            return res.status(404).json({

                message:
                "Submission not found"
            });
        }



        await AssignmentSubmission.findByIdAndDelete(
            req.params.id
        );



        res.json({

            message:
            "Submission deleted successfully"
        });

    } catch (err) {

        res.status(500).json({

            message:
            err.message
        });
    }
};