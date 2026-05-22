const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const { protect } = require("../middleware/authMiddleware");

// Upload File
router.post("/", protect, upload.single("file"),

    async (req, res) => {

        try {

            res.json({

                fileUrl: req.file.path
            });

        } catch (err) {

            res.status(500).json({

                message: err.message
            });
        }
    }
);

module.exports = router;