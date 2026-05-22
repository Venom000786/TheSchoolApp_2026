const Timetable = require("../models/timetable");
const fs = require("fs");



// 📄 UPLOAD / UPDATE TIMETABLE PDF
exports.uploadTimetablePdf = async (req, res) => {

    try {

        // CHECK FILE
        if (!req.file) {

            return res.status(400).json({
                message: "PDF file required"
            });
        }



        // FILE URL
        const pdfUrl =
            `/uploads/${req.file.filename}`;



        // CHECK EXISTING TIMETABLE
        let existing =
            await Timetable.findOne();



        // IF EXISTS → UPDATE
        if (existing) {

            // DELETE OLD PDF
            if (existing.pdfFile) {

                const oldPath =
                    `.${existing.pdfFile}`;

                if (fs.existsSync(oldPath)) {

                    fs.unlinkSync(oldPath);
                }
            }



            existing.pdfFile = pdfUrl;

            await existing.save();



            return res.json({

                message:
                    "Timetable updated successfully",

                timetable:
                    existing
            });
        }



        // CREATE NEW
        const timetable =
            await Timetable.create({

                pdfFile: pdfUrl
            });



        res.status(201).json({

            message:
                "Timetable uploaded successfully",

            timetable
        });

    } catch (err) {

        res.status(500).json({

            message: err.message
        });
    }
};






// 📥 GET TIMETABLE
exports.getTimetable = async (req, res) => {

    try {

        const timetable =
            await Timetable.findOne();

        res.json(timetable);

    } catch (err) {

        res.status(500).json({

            message: err.message
        });
    }
};






// ❌ DELETE TIMETABLE
exports.deleteTimetable = async (req, res) => {

    try {

        const timetable =
            await Timetable.findOne();

        if (!timetable) {

            return res.status(404).json({

                message:
                    "Timetable not found"
            });
        }



        // DELETE PDF FILE
        if (timetable.pdfFile) {

            const filePath =
                `.${timetable.pdfFile}`;

            if (fs.existsSync(filePath)) {

                fs.unlinkSync(filePath);
            }
        }



        await Timetable.findByIdAndDelete(
            timetable._id
        );



        res.json({

            message:
                "Timetable deleted successfully"
        });

    } catch (err) {

        res.status(500).json({

            message: err.message
        });
    }
};