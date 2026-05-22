const Announcement =
require("../models/announcement");



// CREATE
exports.createAnnouncement =
async (req, res) => {

    try {

        const announcement =
        await Announcement.create({

            title:
            req.body.title,

            message:
            req.body.message,

            audience:
            req.body.audience,

            createdBy:
            req.user.id
        });

        res.json(announcement);

    } catch (err) {

        res.status(500).json({

            message: err.message
        });
    }
};




// GET ALL
exports.getAnnouncements =
async (req, res) => {

    try {

        const announcements =
        await Announcement.find()

        .populate(
            "createdBy",
            "name role"
        )

        .sort({
            createdAt: -1
        });

        res.json(announcements);

    } catch (err) {

        res.status(500).json({

            message: err.message
        });
    }
};




// DELETE
exports.deleteAnnouncement =
async (req, res) => {

    try {

        await Announcement.findByIdAndDelete(
            req.params.id
        );

        res.json({
            message:
            "Announcement deleted"
        });

    } catch (err) {

        res.status(500).json({

            message: err.message
        });
    }
};