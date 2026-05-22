const express =
    require("express");

const router =
    express.Router();

const {
    addStock,
    getStocks,
    updateStock,
    deleteStock,
    issueStock,
    searchStock,
    returnStock
} = require(
    "../controllers/stockController"
);

const {
    protect,
    adminOnly
} = require(
    "../middleware/authMiddleware"
);


// ADD
router.post(
    "/",
    protect,
    adminOnly,
    addStock
);


// GET
router.get(
    "/",
    protect,
    getStocks
);


// UPDATE
router.put(
    "/:id",
    protect,
    adminOnly,
    updateStock
);


// DELETE
router.delete(
    "/:id",
    protect,
    adminOnly,
    deleteStock
);

// SEARCH
router.get(
    "/search",
    protect,
    searchStock
);

// ISSUE
router.post(
    "/issue",
    protect,
    adminOnly,
    issueStock
);

// return Stock
router.put(
    "/return/:id",
    protect,
    adminOnly,
    returnStock
);

module.exports = router;