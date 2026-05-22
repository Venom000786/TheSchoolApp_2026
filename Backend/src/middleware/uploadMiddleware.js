const multer = require("multer");
const path = require("path");
const fs = require("fs");


// ✅ CREATE UPLOADS FOLDER IF NOT EXISTS
const uploadPath = "uploads/";

if (!fs.existsSync(uploadPath)) {

    fs.mkdirSync(uploadPath, {
        recursive: true
    });
}



// 📁 STORAGE
const storage =
multer.diskStorage({

    destination:
    (req, file, cb) => {

        cb(
            null,
            uploadPath
        );
    },



    filename:
    (req, file, cb) => {

        const uniqueName =

            Date.now() +

            "-" +

            Math.round(
                Math.random() * 1e9
            ) +

            path.extname(
                file.originalname
            );

        cb(
            null,
            uniqueName
        );
    }
});





// ✅ ALLOWED FILE TYPES
const fileFilter =
(req, file, cb) => {

    const allowedTypes = [

        // IMAGES
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp",

        // PDF
        "application/pdf",

        // DOC
        "application/msword",

        // DOCX
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ];



    if (
        allowedTypes.includes(
            file.mimetype
        )
    ) {

        cb(null, true);

    } else {

        console.log(
            "Rejected File Type:",
            file.mimetype
        );

        cb(
            new Error(
                "Invalid file type"
            ),
            false
        );
    }
};





// 🚀 MULTER CONFIG
const upload =
multer({

    storage,

    fileFilter,

    limits: {

        fileSize:
        10 * 1024 * 1024
        // 10MB
    }
});

module.exports = upload;