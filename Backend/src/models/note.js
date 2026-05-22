const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  title: String,
  content: String,
  color: String,
  isPinned: {
    type: Boolean,
    default: false
  },
  reminderAt: Date
}, { timestamps: true });

module.exports = mongoose.model("Note", noteSchema);