const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(

  {

    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      unique: true,
      required: true
    },

    password: {
      type: String,
      required: true
    },

    role: {

      type: String,

      enum: [

        "admin",

        "teacher",

        "parent",

        "student"
      ],

      default: "parent"
    },

    // STUDENT CLASS
    className: {

      type: String,

      default: ""
    },

    // TEACHER CLASS
    classTeacherOf: {

      type: String,

      default: ""
    },

    createdByAdmin: {

      type: Boolean,

      default: false
    }

  },

  {
    timestamps: true
  }
);

module.exports =
  mongoose.model(
    "User",
    userSchema
  );