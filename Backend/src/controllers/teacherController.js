const Submission = require('../models/submission')

exports.getAllSubmissions = async (req, res) => {
    try {
        const submission = await Submission.find()
            .populate('studentId', 'name email')
            .populate('assignmentId', 'title subject')

        res.json(submission)
    } catch (error) {
        res.status(500).json({
            message: err.message
        });
    }
}

exports.reviewSubmission = async (req, res) => {
    try {
        const submission = await Submission.findByIdAndUpdate(
            req.param.id,
            {
                marks: req.body.marks,
                feedback: req.body.feedback,
                status: "reviewed"
            },
            { new: true }
        )
        res.json(submission)
    } catch (error) {
        res.status(500).json({
            message: err.message
        });
    }
}