const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: String,
  scholarNumber: {
    type: String,
    unique: true
  },
  class: String,
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  attendance: {
    type: Number,
    default: 0
  },
  feesStatus: {
    type: String,
    enum: ["paid", "pending"],
    default: "pending"
  },
  marks: [
    {
      subject: String,
      score: Number
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model("Student", studentSchema);