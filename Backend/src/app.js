const express = require("express")
const cors = require("cors")
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes")
const inventoryRoutes = require("./routes/inventoryRoutes");
const chatRoutes = require("./routes/chatRoutes")
const noteRoutes = require("./routes/noteRoutes");
const dashboardRoutes = require('./routes/dashboardRoutes')
const assignmentRoutes = require("./routes/assignmentRoutes");
const submissionRoutes = require("./routes/submissionRoutes");
const teacherRoutes = require("./routes/teacherRoutes");
const attendanceRoutes = require('../src/routes/attendanceRoutes')
const analyticsRoutes = require('./routes/analyticsRoutes')
const feeRoutes = require("./routes/feeRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const timetableRoutes = require("./routes/timetableRoutes");
const aiRoutes = require("./routes/aiRoutes");
const stockRoutes = require("./routes/stockRoutes");
const announcementRoutes = require("./routes/announcementRoutes");
const teacherClassRoutes = require("./routes/teacherClassRoutes")
const classRoutes = require("./routes/classRoutes");
const path = require("path");

const app = express()

// STATIC FOLDER FOR PDF / FILE ACCESS
app.use(
    "/uploads",
    express.static(
        path.join(__dirname, "../uploads")
    )
);

// middleware
app.use(express.json())
app.use(cors())

// test route
app.get('/', (req, res) => {
    res.send("API is running")
})

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/admin", adminRoutes)
app.use("/api/inventory", inventoryRoutes)
app.use("/api/chat", chatRoutes)
app.use("/api/notes", noteRoutes);
app.use("/api/dashboard", dashboardRoutes)
app.use("/api/assignments", assignmentRoutes);
app.use("/api/submissions", submissionRoutes);
app.use("/api/teacher", teacherRoutes);
app.use('/api/attendance', attendanceRoutes)
app.use("/api/analytics", analyticsRoutes);
app.use("/api/fees", feeRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/timetable", timetableRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/stocks", stockRoutes);
app.use("/api/announcements", announcementRoutes);
app.use("/api/teacher-classes",teacherClassRoutes);
app.use("/api/classes", classRoutes)
app.use("/api/submissions",require("./routes/assignmentSubmissionRoutes"));  //direct import

module.exports = app;