import { Link } from "react-router-dom";

function Sidebar() {
  const role = localStorage.getItem("role");

  return (
    <div className="w-64 h-screen glass p-4 text-white">

      <h2 className="text-2xl font-bold mb-6">
        School App
      </h2>

      {/* ADMIN LINKS */}
      {role === "admin" && (
        <>
          <div className="flex justify-between flex-col  h-[90%]">
            <div>
              <Link to="/admin" className="block mb-3">
                Dashboard
              </Link>

              <Link to="/chat" className="block mb-3">
                Chat
              </Link>

              <Link to="/notes" className="block mb-3">
                Notes
              </Link>
              <Link
                to="/admin/stocks" className="block mb-3">
                Stock Management
              </Link>
              <Link to="/admin/users" className="block mb-3">
                Users
              </Link>
              <Link to="/attendance" className="block mb-3">
                Attendance
              </Link>
              <Link to="/admin/announcements" className="block mb-3">
                Announcements
              </Link>
              <Link to="/fees" className="block mb-3">
                Fees
              </Link>
              <Link to="/timetable" className="block mb-3">
                Timetable
              </Link>
              <Link to="/admin/assignment" className="block mb-3">
                Assignment
              </Link>
            </div>
            <div>
              {/* Logout */}
              <button

                onClick={() => {

                  localStorage.clear();

                  window.location.href = "/";
                }}

                className="
                    
                    bg-red-500
                    hover:bg-red-600
                    px-6
                    py-3
                    rounded-xl
                    w-full
                    
                "
              >
                Logout
              </button>
            </div>
          </div>
        </>
      )}

      {/* TEACHER LINKS */}
      {role === "teacher" && (
        <>
          <Link to="/teacher" className="block mb-3">
            Dashboard
          </Link>

          <Link to="/chat" className="block mb-3">
            Chat
          </Link>
        </>
      )}

      {/* STUDENT LINKS */}
      {role === "student" && (
        <>
          <Link to="/student" className="block mb-3">
            Dashboard
          </Link>

          <Link to="/chat" className="block mb-3">
            Chat
          </Link>
        </>
      )}

    </div>
  );
}

export default Sidebar;