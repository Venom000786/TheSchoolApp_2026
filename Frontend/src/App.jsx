import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/admin/AdminDashboard";
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import StudentDashboard from "./pages/student/StudentDashboard";
import ChatPage from "./pages/ChatPage";
import NotesPage from "./pages/NotesPage";
import NotificationsPage from "./pages/NotificationsPage";
import ProtectedRoute from "./components/Common/ProtectedRoutes";
import TimetablePage from "./pages/TimetablePage";
import AdminAttendancePage from "./pages/admin/AdminAttendancePage";
import FeesPage from "./pages/FeesPage";
import AIStudyPage from "./pages/AIStudyPage";
import LiveClassPage from "./pages/LiveClassPage";
import Users from "./pages/admin/Users";
import StockPage from "./pages/admin/StockPage";
import AdminAnnouncementsPage from "./pages/admin/AdminAnnouncementsPage";
import AdminAssignmentPage from "./pages/admin/AdminAssignmentPage";
import TeacherClassPage from "./pages/teacher/TeacherClassPage";
import TeacherAttendance from "./pages/Teacher/TeacherAttendance";
import TeacherAssignment from "./pages/teacher/TeacherAssignment";
import StudentAttendancePage from "./pages/student/StudentAttendancePage";
import Assignments from "./pages/student/Assignment";


function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />

        {/* Admin */}
        <Route
          path="/admin"

          element={
            <ProtectedRoute
              allowedRole="admin"
            >
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Teacher */}
        <Route
          path="/teacher"

          element={
            <ProtectedRoute
              allowedRole="teacher"
            >
              <TeacherDashboard />
            </ProtectedRoute>
          }
        />

        {/* Student */}
        <Route
          path="/student"

          element={
            <ProtectedRoute
              allowedRole="student"
            >
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        {/* Shared */}
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/notes" element={<NotesPage />} />

        <Route
          path="/notifications"
          element={<NotificationsPage />}
        />

        <Route
          path="/timetable"
          element={<TimetablePage />}
        />

        <Route
          path="/attendance"
          element={<AdminAttendancePage />}
        />

        <Route
          path="/fees"
          element={<FeesPage />}
        />

        <Route
          path="/ai-study"
          element={<AIStudyPage />}
        />

        <Route
          path="/live-class"
          element={<LiveClassPage />}
        />

        <Route
          path="/admin/users"
          element={
            <ProtectedRoute allowedRole="admin">
              <Users />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/stocks"
          element={<StockPage />}
        />

        <Route
          path="/admin/announcements"
          element={<AdminAnnouncementsPage />}
        />

        <Route
          path="/admin/assignment"
          element={<AdminAssignmentPage />}
        />

        <Route
          path="/teacher/classes"
          element={<TeacherClassPage />}
        />

        <Route
          path="/teacher/attendance"
          element={<TeacherAttendance />}
        />

        <Route
          path="/teacher/assignment"
          element={<TeacherAssignment />}
        />

        <Route 
        path="/student/attendance"
        element={<StudentAttendancePage />}
        />

        <Route 
        path="/student/assignment"
        element={<Assignments />}
        />

        

      </Routes>
    </BrowserRouter>
  );
}

export default App;