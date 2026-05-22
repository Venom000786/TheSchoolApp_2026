const Notification = require("../models/notification")

exports.getMyNotifications = async (req,res) => {
    try {
        const notifications = await Notification.find({
            userId:req.user.id
        })
        .sort({created:-1})
        res.json(notifications);

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }
};

exports.markAsRead =
async (req, res) => {

  try {

    const notification =
      await Notification.findByIdAndUpdate(

        req.params.id,

        {
          isRead: true
        },

        { new: true }
      );

    res.json(notification);

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }
};