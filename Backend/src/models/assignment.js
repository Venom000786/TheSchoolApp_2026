const mongoose = require("mongoose");

const assignmentSchema =
new mongoose.Schema(

  {

    title: {

      type: String,

      required: true,

      trim: true
    },



    description: {

      type: String,

      trim: true
    },



    subject: {

      type: String,

      required: true,

      trim: true
    },



    className: {

      type: String,

      required: true,

      trim: true
    },



    dueDate: {

      type: Date,

      required: true
    },



    // PDF / file link
    fileUrl: {

      type: String,

      default: ""
    },



    createdBy: {

      type:
      mongoose.Schema.Types.ObjectId,

      ref: "User",

      required: true
    }

  },

  {

    timestamps: true
  }
);

module.exports =

  mongoose.models.Assignment ||

  mongoose.model(

    "Assignment",

    assignmentSchema
  );