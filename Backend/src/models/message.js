const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  groupId: {
    type: String // classId
  },
  message: String,
  fileUrl: String,
  fileType: String,
}, { timestamps: true });

module.exports = mongoose.model("Message", messageSchema);