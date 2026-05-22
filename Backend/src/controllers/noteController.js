const Note = require("../models/note");


// CREATE NOTE
exports.createNote = async (req, res) => {

    try {

        const note = await Note.create({

            ...req.body,

            userId: req.user.id
        });

        res.json(note);

    } catch (err) {

        res.status(500).json({

            message: err.message
        });
    }
};




// GET NOTES
exports.getNotes = async (req, res) => {

    try {

        const notes = await Note.find({

            userId: req.user.id

        }).sort({

            isPinned: -1,

            createdAt: -1
        });

        res.json(notes);

    } catch (err) {

        res.status(500).json({

            message: err.message
        });
    }
};




// UPDATE NOTE
exports.updateNote = async (req, res) => {

    try {

        const note =
        await Note.findByIdAndUpdate(

            req.params.id,

            req.body,

            { new: true }
        );

        res.json(note);

    } catch (err) {

        res.status(500).json({

            message: err.message
        });
    }
};




// DELETE NOTE
exports.deleteNote = async (req, res) => {

    try {

        await Note.findByIdAndDelete(

            req.params.id
        );

        res.json({

            msg: "Deleted"
        });

    } catch (err) {

        res.status(500).json({

            message: err.message
        });
    }
};