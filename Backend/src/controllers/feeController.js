const Fee =
require("../models/fee");

const User =
require("../models/user");





// ➕ CREATE FEE (ADMIN ONLY)
exports.createFee =
async (req, res) => {

  try {

    // ONLY ADMIN
    if (req.user.role !== "admin") {

      return res.status(403).json({

        message:
        "Admin access only"
      });
    }






    // FIND STUDENT
    const student =
    await User.findOne({

      name: req.body.studentId
    });






    if (!student) {

      return res.status(404).json({

        message:
        "Student not found"
      });
    }






    // CREATE FEE
    const fee =
    await Fee.create({

      studentId:
      student._id,

      amount:
      req.body.amount,

      dueDate:
      req.body.dueDate,

      status:
      req.body.status || "pending",

      createdBy:
      req.user.id
    });






    // POPULATE
    const populatedFee =
    await Fee.findById(fee._id)

    .populate(
      "studentId",
      "name email className"
    )

    .populate(
      "createdBy",
      "name"
    );






    res.status(201).json({

      message:
      "Fee created successfully",

      fee:
      populatedFee
    });

  } catch (err) {

    res.status(500).json({

      message:
      err.message
    });
  }
};









// 📥 GET MY FEES (STUDENT)
exports.getMyFees =
async (req, res) => {

  try {






    // STUDENT ONLY
    if (req.user.role !== "student") {

      return res.status(403).json({

        message:
        "Student access only"
      });
    }






    const fees =
    await Fee.find({

      studentId:
      req.user.id

    })

    .populate(
      "createdBy",
      "name"
    )

    .sort({
      createdAt: -1
    });






    // 📊 STATS
    const totalFees =

      fees.reduce(

        (acc, fee) =>

        acc + fee.amount,

        0
      );






    const paidFees =

      fees

      .filter(
        fee =>
        fee.status === "paid"
      )

      .reduce(

        (acc, fee) =>

        acc + fee.amount,

        0
      );






    const pendingFees =

      fees

      .filter(
        fee =>
        fee.status === "pending"
      )

      .reduce(

        (acc, fee) =>

        acc + fee.amount,

        0
      );






    res.json({

      fees,

      stats: {

        totalFees,

        paidFees,

        pendingFees
      }
    });

  } catch (err) {

    res.status(500).json({

      message:
      err.message
    });
  }
};









// ✅ PAY FEE (ADMIN ONLY)
exports.payFee =
async (req, res) => {

  try {






    // ONLY ADMIN
    if (req.user.role !== "admin") {

      return res.status(403).json({

        message:
        "Admin access only"
      });
    }






    const fee =
    await Fee.findById(
      req.params.id
    );






    if (!fee) {

      return res.status(404).json({

        message:
        "Fee not found"
      });
    }






    fee.status = "paid";

    fee.paymentDate =
    new Date();






    // 🧾 RECEIPT
    fee.receiptNo =

      "RCPT-" +

      Math.floor(
        Math.random() * 100000
      );






    await fee.save();






    res.json({

      message:
      "Fee marked as paid",

      fee
    });

  } catch (err) {

    res.status(500).json({

      message:
      err.message
    });
  }
};









// 👨‍💼 ADMIN GET ALL FEES
exports.getAllFees =
async (req, res) => {

  try {






    // ONLY ADMIN
    if (req.user.role !== "admin") {

      return res.status(403).json({

        message:
        "Admin access only"
      });
    }






    const fees =
    await Fee.find()

    .populate(
      "studentId",
      "name email className"
    )

    .populate(
      "createdBy",
      "name"
    )

    .sort({
      createdAt: -1
    });






    // TOTAL COLLECTION
    const totalCollection =

      fees

      .filter(
        fee =>
        fee.status === "paid"
      )

      .reduce(

        (acc, fee) =>

        acc + fee.amount,

        0
      );






    // TOTAL PENDING
    const totalPending =

      fees

      .filter(
        fee =>
        fee.status === "pending"
      )

      .reduce(

        (acc, fee) =>

        acc + fee.amount,

        0
      );






    res.json({

      fees,

      stats: {

        totalCollection,

        totalPending
      }
    });

  } catch (err) {

    res.status(500).json({

      message:
      err.message
    });
  }
};

// ✏️ UPDATE FEE
exports.updateFee =
async (req, res) => {

    try {

        const fee =
        await Fee.findById(
            req.params.id
        );

        if (!fee) {

            return res.status(404).json({

                message:
                "Fee not found"
            });
        }

        fee.amount =
            req.body.amount || fee.amount;

        fee.remainingAmount =
            req.body.amount || fee.remainingAmount;

        fee.dueDate =
            req.body.dueDate || fee.dueDate;

        await fee.save();

        res.json({

            message:
            "Fee updated successfully",

            fee
        });

    } catch (err) {

        res.status(500).json({

            message: err.message
        });
    }
};





// 💳 PAY INSTALLMENT
exports.payInstallment =
async (req, res) => {

  try {

    const fee =
    await Fee.findById(
      req.params.id
    );

    if (!fee) {

      return res.status(404).json({

        message:
        "Fee not found"
      });
    }

    const installmentAmount =
      Number(req.body.amount);

    if (

      !installmentAmount ||

      installmentAmount <= 0

    ) {

      return res.status(400).json({

        message:
        "Invalid installment amount"
      });
    }

    // INITIALIZE
    if (!fee.paidAmount) {

      fee.paidAmount = 0;
    }

    fee.paidAmount +=
      installmentAmount;

    // REMAINING
    fee.remainingAmount =
      fee.amount - fee.paidAmount;

    // STATUS
    if (

      fee.remainingAmount <= 0

    ) {

      fee.status = "paid";

      fee.remainingAmount = 0;

      fee.paymentDate =
        new Date();

    } else {

      fee.status =
        "partial";
    }

    // RECEIPT
    fee.receiptNo =

      "RCPT-" +

      Math.floor(
        Math.random() * 100000
      );

    await fee.save();

    res.json({

      message:
      "Installment paid successfully",

      fee
    });

  } catch (err) {

    res.status(500).json({

      message: err.message
    });
  }
};

// 👨‍💼 ADMIN GET ALL FEES
exports.getAllFees =
async (req, res) => {

    try {

        const fees =
        await Fee.find()

        .populate(
            "studentId",
            "name email"
        )

        .populate(
            "createdBy",
            "name"
        )

        .sort({
            createdAt: -1
        });

        return res.json(fees);

    } catch (err) {

        res.status(500).json({

            message: err.message
        });
    }
};


// ❌ DELETE FEE
exports.deleteFee =
async (req, res) => {

    try {

        const fee =
        await Fee.findByIdAndDelete(
            req.params.id
        );

        if (!fee) {

            return res.status(404).json({

                message:
                "Fee not found"
            });
        }

        res.json({

            message:
            "Fee deleted successfully"
        });

    } catch (err) {

        res.status(500).json({

            message: err.message
        });
    }
};