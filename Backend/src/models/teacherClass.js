const mongoose = require("mongoose");

const teacherClassSchema =
new mongoose.Schema(

  {

    className: {

      type: String,

      required: true
    },

    section: {

      type: String,

      default: ""
    },

    teacherId: {

      type:
      mongoose.Schema.Types.ObjectId,

      ref: "User",

      required: true
    },

    students: [

      {

        type:
        mongoose.Schema.Types.ObjectId,

        ref: "User"
      }
    ]
  },

  {
    timestamps: true
  }
);

module.exports =

  mongoose.models.TeacherClass ||

  mongoose.model(
    "TeacherClass",
    teacherClassSchema
  );