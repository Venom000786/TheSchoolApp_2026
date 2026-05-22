const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema(
  {
    assignmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Assignment"
    },

    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    fileUrl: {
      type: String
    },

    marks: {
      type: Number,
      default: 0
    },

    feedback: {
      type: String
    },

    status: {
      type: String,
      default: "submitted"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "Submission",
  submissionSchema
);