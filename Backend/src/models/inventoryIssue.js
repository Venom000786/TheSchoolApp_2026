const mongoose = require("mongoose");

const inventoryIssueSchema =
new mongoose.Schema({

    stockId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Stock"
    },

    issuedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    quantity: {
        type: Number,
        required: true
    },

    issuedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    returned: {
        type: Boolean,
        default: false
    }

}, {
    timestamps: true
});

module.exports =
mongoose.model(
    "InventoryIssue",
    inventoryIssueSchema
);