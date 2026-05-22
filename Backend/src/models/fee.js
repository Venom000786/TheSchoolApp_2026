const mongoose = require("mongoose");

const feeSchema =
new mongoose.Schema(

  {
    studentId: {

      type:
      mongoose.Schema.Types.ObjectId,

      ref: "User",

      required: true
    },



    amount: {

      type: Number,

      required: true
    },



    // 💰 TOTAL PAID
    paidAmount: {

      type: Number,

      default: 0
    },



    // 💳 REMAINING AMOUNT
    remainingAmount: {

      type: Number,

      default: 0
    },



    dueDate: {

      type: Date
    },



    status: {

      type: String,

      enum: [

        "paid",

        "pending",

        "partial"
      ],

      default: "pending"
    },



    paymentDate: {

      type: Date
    },



    receiptNo: {

      type: String
    },



    createdBy: {

      type:
      mongoose.Schema.Types.ObjectId,

      ref: "User"
    }

  },

  {
    timestamps: true
  }
);



module.exports =

  mongoose.models.Fee ||

  mongoose.model(
    "Fee",
    feeSchema
  );