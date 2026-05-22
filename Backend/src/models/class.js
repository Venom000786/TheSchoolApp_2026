const mongoose = require("mongoose");

const classSchema =
new mongoose.Schema(

    {

        className: {

            type: String,

            required: true,

            unique: true,

            trim: true
        },



        teacher: {

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

    mongoose.models.Class ||

    mongoose.model(
        "Class",
        classSchema
    );