const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema({

    itemName: {
        type: String,
        required: true
    },

    quantity: {
        type: Number,
        required: true
    },

    category: String,

    price: Number,



    // ✅ ISSUE TRACKING
    issuedTo: {
        type: String,
        default: ""
    },

    issuedBy: {
        type: String,
        default: ""
    },

    issuedQuantity: {
        type: Number,
        default: 0
    },

    issueDate: Date,



    // ✅ RETURN TRACKING
    returned: {
        type: Boolean,
        default: false
    },

    returnDate: Date,



    // ✅ HISTORY LOGS
    history: [
        {
            action: String,

            by: String,

            quantity: Number,

            date: {
                type: Date,
                default: Date.now
            }
        }
    ]

}, {
    timestamps: true
});

module.exports =
    mongoose.model("Stock", stockSchema);