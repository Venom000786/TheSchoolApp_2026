const express = require("express");

const router = express.Router();

const {
    getMessages,
    uploadFile
} = require("../controllers/chatController");

const {
    protect
} = require("../middleware/authMiddleware");

const upload =
require("../middleware/uploadMiddleware");


// ======================================
// GET CHAT MESSAGES
// ======================================
router.get(

    "/messages",

    protect,

    getMessages
);


// ======================================
// FILE UPLOAD
// ======================================
router.post(

    "/upload",

    protect,

    (req, res, next) => {

        upload.single("file")(req, res, function (err) {

            // multer error
            if (err) {

                console.log(err);

                return res.status(400).json({

                    message: "File upload failed"
                });
            }

            // no file selected
            if (!req.file) {

                return res.status(400).json({

                    message: "No file uploaded"
                });
            }

            next();
        });
    },

    uploadFile
);

module.exports = router;