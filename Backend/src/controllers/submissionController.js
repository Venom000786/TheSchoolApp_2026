const Submission = require("../models/submission")

exports.submitAssignment = async (req, res) => {
    try {
        const submission = await Submission.create({
            assignmentId: req.body.assignmentId,
            studentId: req.user.id,
            fileUrl: req.body.fileUrl
        });
        res.json(submission);
    } catch (error) {
        res.status(500).json({
            messsage: error.messsage
        });
    }
}

exports.getMySubmission = async (req,res) => {
    try {
        const submissions = await Submission.find({
            studentId: req.user.id
        }).populate('assignmentId')
        res.json(submissions)
    } catch (error) {
        res.status(500).json({
            message: error.message
        }) 
    }
}