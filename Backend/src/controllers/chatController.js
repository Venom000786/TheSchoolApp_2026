const Message =
    require("../models/message");

const cloudinary =
    require("../config/cloudinary");

const fs =
    require("fs");


// ========================================
// GET PERSONAL CHAT MESSAGES
// ========================================
exports.getMessages = async (req, res) => {

    try {

        const receiverId =
            req.query.receiverId;

        const senderId =
            req.user.id;

        const messages =
            await Message.find({

                $or: [

                    {
                        senderId,
                        receiverId
                    },

                    {
                        senderId: receiverId,
                        receiverId: senderId
                    }
                ]

            }).sort({

                createdAt: 1
            });

        res.json(messages);

    } catch (err) {

        res.status(500).json({

            message: err.message
        });
    }
};


// ========================================
// FILE UPLOAD
// ========================================
exports.uploadFile =
    async (req, res) => {

        try {

            // ✅ no file
            if (!req.file) {

                return res.status(400).json({

                    message: "No file uploaded"
                });
            }


            // ✅ upload from file path
            const result =

                await cloudinary.uploader.upload(

                    req.file.path,

                    {

                        folder: "school-app",

                        resource_type: "auto"
                    }
                );


            // ✅ delete local file after upload
            fs.unlinkSync(
                req.file.path
            );


            // detect file type
            let fileType = "file";


            if (
                result.resource_type === "image"
            ) {

                fileType = "image";
            }

            else if (
                result.resource_type === "video"
            ) {

                fileType = "video";
            }

            else if (
                result.resource_type === "raw"
            ) {

                fileType = "document";
            }


            res.json({

                fileUrl:
                    result.secure_url,

                fileType
            });

        } catch (err) {

            console.log(err);

            res.status(500).json({

                message:
                    "File upload failed"
            });
        }
    };