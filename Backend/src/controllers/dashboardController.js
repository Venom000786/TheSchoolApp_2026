const User = require('../models/user')

exports.getDashboardStats = async (req,res) => {
    try {

        // Count students
        const totalStudents = await User.countDocuments({
            role:"student"
        })

        // Count teacher
        const totalTeachers = await User.countDocuments({
            role:"teacher"
        })

        // Pending fee
        const pendingFees = 1200;

        // Inventory Count
        const inventoryItems = 121;

        res.json({
            totalStudents,
            totalTeachers,
            pendingFees,
            inventoryItems
        })
        
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
        
    }
}