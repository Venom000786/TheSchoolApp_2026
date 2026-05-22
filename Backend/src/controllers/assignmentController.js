const Assignment = require(
    "../models/assignment"
);

const ClassModel = require(
    "../models/class"
);




// ➕ CREATE ASSIGNMENT
exports.createAssignment =
async (req, res) => {

    try {

        const {

            title,

            description,

            subject,

            className,

            dueDate,

            fileUrl

        } = req.body;



        // VALIDATION
        if (

            !title ||

            !description ||

            !subject ||

            !className

        ) {

            return res.status(400).json({

                message:
                "Please fill all required fields"
            });
        }



        // CREATE
        const assignment =
        await Assignment.create({

            title,

            description,

            subject,

            className,

            dueDate,

            fileUrl:
            fileUrl || "",

            createdBy:
            req.user.id
        });



        res.status(201).json({

            message:
            "Assignment created successfully",

            assignment
        });

    } catch (error) {

        res.status(500).json({

            message:
            error.message
        });
    }
};








// 📥 GET ASSIGNMENTS
exports.getAssignments =
async (req, res) => {

    try {

        // =========================
        // STUDENT VIEW
        // =========================
        if (
            req.user.role === "student"
        ) {

            // FIND STUDENT CLASS
            const studentClass =
            await ClassModel.findOne({

                students:
                req.user.id
            });



            // NO CLASS
            if (!studentClass) {

                return res.json([]);
            }



            // GET ONLY CLASS ASSIGNMENTS
            const assignments =
            await Assignment.find({

                className:
                studentClass.className
            })

            .populate(
                "createdBy",
                "name"
            )

            .sort({

                createdAt: -1
            });



            return res.json(assignments);
        }






        // =========================
        // TEACHER / ADMIN VIEW
        // =========================
        const assignments =
        await Assignment.find()

        .populate(
            "createdBy",
            "name"
        )

        .sort({

            createdAt: -1
        });



        res.json(assignments);

    } catch (err) {

        res.status(500).json({

            message:
            err.message
        });
    }
};








// ❌ DELETE ASSIGNMENT
exports.deleteAssignment =
async (req, res) => {

    try {

        const assignment =
        await Assignment.findById(
            req.params.id
        );



        if (!assignment) {

            return res.status(404).json({

                message:
                "Assignment not found"
            });
        }



        await Assignment.findByIdAndDelete(
            req.params.id
        );



        res.json({

            message:
            "Assignment deleted"
        });

    } catch (err) {

        res.status(500).json({

            message:
            err.message
        });
    }
};