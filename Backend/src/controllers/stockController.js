const Stock =
require("../models/stock");

const InventoryIssue =
require("../models/inventoryIssue");



// ADD STOCK
exports.addStock =
async (req, res) => {

    try {

        const stock =
        await Stock.create({

            ...req.body,

            addedBy:
            req.user.id,

            history: [
                {
                    action: "Added",

                    by: req.user.role,

                    quantity:
                    req.body.quantity
                }
            ]
        });

        res.json(stock);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });
    }
};




// GET ALL STOCK
exports.getStocks =
async (req, res) => {

    try {

        const stocks =
        await Stock.find()
        .sort({ createdAt: -1 });

        res.json(stocks);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });
    }
};




// UPDATE STOCK
exports.updateStock =
async (req, res) => {

    try {

        const updatedData =
        req.body;

        // CREATE HISTORY ARRAY
        if (!updatedData.history) {

            updatedData.history = [];
        }

        // ISSUE HISTORY
        if (req.body.issuedTo) {

            updatedData.history.push({

                action: "Issued",

                by:
                req.body.issuedBy,

                quantity:
                req.body.quantity
            });
        }

        const stock =
        await Stock.findByIdAndUpdate(

            req.params.id,

            updatedData,

            { new: true }
        );

        res.json(stock);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });
    }
};




// DELETE STOCK
exports.deleteStock =
async (req, res) => {

    try {

        await Stock.findByIdAndDelete(
            req.params.id
        );

        res.json({
            message:
            "Stock deleted"
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });
    }
};




// ISSUE STOCK
exports.issueStock =
async (req, res) => {

    try {

        const {
            stockId,
            issuedTo,
            quantity
        } = req.body;

        // FIND STOCK
        const stock =
        await Stock.findById(stockId);

        if (!stock) {

            return res.status(404).json({
                message:
                "Stock not found"
            });
        }

        // CHECK QUANTITY
        if (stock.quantity < quantity) {

            return res.status(400).json({
                message:
                "Not enough stock"
            });
        }

        // REDUCE STOCK
        stock.quantity -= quantity;

        // ISSUE DATA
        stock.issuedTo =
            issuedTo;

        stock.issuedBy =
            req.user.name ||
            "Admin";

        stock.issuedQuantity =
            quantity;

        stock.issueDate =
            new Date();

        // HISTORY
        stock.history.push({

            action: "Issued",

            by:
            req.user.name ||
            "Admin",

            quantity
        });

        await stock.save();

        // CREATE ISSUE RECORD
        const issue =
        await InventoryIssue.create({

            stockId,

            issuedTo,

            quantity,

            issuedBy:
            req.user.id
        });

        res.json(issue);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });
    }
};




// SEARCH STOCK
exports.searchStock =
async (req, res) => {

    try {

        const keyword =
        req.query.keyword || "";

        const stocks =
        await Stock.find({

            itemName: {
                $regex: keyword,
                $options: "i"
            }
        });

        res.json(stocks);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });
    }
};




// RETURN STOCK
exports.returnStock =
async (req, res) => {

    try {

        const stock =
        await Stock.findById(
            req.params.id
        );

        if (!stock) {

            return res.status(404).json({
                msg: "Stock not found"
            });
        }

        // RESTORE QUANTITY
        stock.quantity +=
            stock.issuedQuantity;

        // HISTORY
        stock.history.push({

            action: "Returned",

            by:
            stock.issuedTo,

            quantity:
            stock.issuedQuantity
        });

        // RESET
        stock.issuedTo = "";

        stock.issuedBy = "";

        stock.issuedQuantity = 0;

        stock.returned = true;

        stock.returnDate =
            new Date();

        await stock.save();

        res.json(stock);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });
    }
};