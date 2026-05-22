const express = require("express");

const router = express.Router();

const {

  createFee,

  getMyFees,

  payFee,

  getAllFees,

  payInstallment,

  updateFee,

  deleteFee

} = require(
  "../controllers/feeController"
);

const {

  protect

} = require(
  "../middleware/authMiddleware"
);






// 🔐 ADMIN ONLY MIDDLEWARE
const adminOnly =
  (req, res, next) => {

    if (req.user.role !== "admin") {

      return res.status(403).json({

        message:
          "Admin access only"
      });
    }

    next();
  };






// ➕ CREATE FEE (ADMIN ONLY)
router.post(
  "/",
  protect,
  adminOnly,
  createFee
);






// 👨‍🎓 STUDENT GET OWN FEES
router.get(
  "/my",
  protect,
  getMyFees
);






// 👨‍💼 ADMIN GET ALL FEES
router.get(
  "/",
  protect,
  adminOnly,
  getAllFees
);






// 💳 MARK FEE AS PAID (ADMIN ONLY)
router.put(
  "/pay/:id",
  protect,
  adminOnly,
  payFee
);



// ✏️ UPDATE FEE
router.put(
  "/:id",
  protect,
  updateFee
);



// 💳 PAY INSTALLMENT
router.put(
  "/installment/:id",
  protect,
  payInstallment
);



// ✏️ UPDATE FEE
router.put(
  "/:id",
  protect,
  updateFee
);



// ❌ DELETE FEE
router.delete(
  "/:id",
  protect,
  deleteFee
);

module.exports = router;