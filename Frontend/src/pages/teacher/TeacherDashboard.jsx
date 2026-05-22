import {
    Link
} from "react-router-dom";

function TeacherDashboard() {

    return (

        <div
            className="
                min-h-screen
                bg-linear-to-t from-gray-500 to-blue-950
                text-white
                p-6
            "
        >

            {/* Header */}
            <div className="mb-8">

                <h1 className="text-4xl font-bold">
                    Teacher Dashboard
                </h1>

                <p className="text-gray-400 mt-2">
                    Welcome Teacher
                </p>

            </div>



            {/* Main Dashboard Cards */}
            <div
                className="
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    lg:grid-cols-3
                    gap-6
                "
            >

                {/* Classes */}
                <Link
                    to="/teacher/classes"
                    className="
                        glass
                        p-6
                        rounded-2xl
                        hover:scale-105
                        transition
                        border
                        border-white/10
                        bg-white/5">

                    <div
                        className="
                            flex
                            items-center
                            justify-between">

                        <h2 className="text-2xl font-bold">
                            Classes
                        </h2>

                        <span className="text-3xl">
                            🏫
                        </span>

                    </div>

                    <p className="mt-3 text-gray-300">
                        Create classes and manage students
                    </p>

                </Link>



                {/* Attendance */}
                <Link
                    to="/teacher/attendance"
                    className="
                        glass
                        p-6
                        rounded-2xl
                        hover:scale-105
                        transition
                        border
                        border-white/10
                        bg-white/5
                    "
                >

                    <div
                        className="
                            flex
                            items-center
                            justify-between
                        "
                    >

                        <h2 className="text-2xl font-bold">
                            Attendance
                        </h2>

                        <span className="text-3xl">
                            📋
                        </span>

                    </div>

                    <p className="mt-3 text-gray-300">
                        Take attendance class-wise
                    </p>

                </Link>



                {/* Assignments */}
                <Link
                    to="/teacher/assignment"
                    className="
                        glass
                        p-6
                        rounded-2xl
                        hover:scale-105
                        transition
                        border
                        border-white/10
                        bg-white/5
                    "
                >

                    <div
                        className="
                            flex
                            items-center
                            justify-between
                        "
                    >

                        <h2 className="text-2xl font-bold">
                            Assignments
                        </h2>

                        <span className="text-3xl">
                            📝
                        </span>

                    </div>

                    <p className="mt-3 text-gray-300">
                        Upload and manage assignments
                    </p>

                </Link>



                {/* Timetable */}
                <Link
                    to="/timetable"
                    className="
                        glass
                        p-6
                        rounded-2xl
                        hover:scale-105
                        transition
                        border
                        border-white/10
                        bg-white/5
                    "
                >

                    <div
                        className="
                            flex
                            items-center
                            justify-between
                        "
                    >

                        <h2 className="text-2xl font-bold">
                            Timetable
                        </h2>

                

                    </div>

                    <p className="mt-3 text-gray-300">
                        Manage class schedules
                    </p>

                </Link>



                {/* Chat */}
                <Link
                    to="/chat"
                    className="
                        glass
                        p-6
                        rounded-2xl
                        hover:scale-105
                        transition
                        border
                        border-white/10
                        bg-white/5
                    "
                >

                    <div
                        className="
                            flex
                            items-center
                            justify-between
                        "
                    >

                        <h2 className="text-2xl font-bold">
                            Chat
                        </h2>

                        <span className="text-3xl">
                            💬
                        </span>

                    </div>

                    <p className="mt-3 text-gray-300">
                        Talk with students
                    </p>

                </Link>



                {/* Notifications */}
                <Link
                    to="/notifications"
                    className="
                        glass
                        p-6
                        rounded-2xl
                        hover:scale-105
                        transition
                        border
                        border-white/10
                        bg-white/5
                    "
                >

                    <div
                        className="
                            flex
                            items-center
                            justify-between
                        "
                    >

                        <h2 className="text-2xl font-bold">
                            Notifications
                        </h2>

                        <span className="text-3xl">
                            🔔
                        </span>

                    </div>

                    <p className="mt-3 text-gray-300">
                        View school announcements
                    </p>

                </Link>

                {/* NOTES */}
                <Link
                    to="/notes"
                    className="
                        glass
                        p-6
                        rounded-2xl
                        hover:scale-105
                        transition
                        border
                        border-white/10
                        bg-white/5
                    "
                >

                    <div
                        className="
                            flex
                            items-center
                            justify-between
                        "
                    >

                        <h2 className="text-2xl font-bold">
                            Notes
                        </h2>

                        <span className="text-3xl">
                            📚
                        </span>

                    </div>

                    <p className="mt-3 text-gray-300">
                        Upload and manage study notes
                    </p>

                </Link>


                {/* AI Study */}
                <Link
                    to="/ai-study"
                    className="
                        glass
                        p-6
                        rounded-2xl
                        hover:scale-105
                        transition
                        border
                        border-white/10
                        bg-white/5
                    "
                >

                    <div
                        className="
                            flex
                            items-center
                            justify-between
                        "
                    >

                        <h2 className="text-2xl font-bold">
                            AI Study
                        </h2>

                        <span className="text-3xl">
                            🤖
                        </span>

                    </div>

                    <p className="mt-3 text-gray-300">
                        AI teaching assistant
                    </p>

                </Link>



                {/* Live Classes */}
                <Link
                    to="/live-class"
                    className="
                        glass
                        p-6
                        rounded-2xl
                        hover:scale-105
                        transition
                        border
                        border-white/10
                        bg-white/5
                    "
                >

                    <div
                        className="
                            flex
                            items-center
                            justify-between
                        "
                    >

                        <h2 className="text-2xl font-bold">
                            Live Classes
                        </h2>

                        <span className="text-3xl">
                            🎥
                        </span>

                    </div>

                    <p className="mt-3 text-gray-300">
                        Start video classes
                    </p>

                </Link>

            </div>

            {/* Logout */}
            <div className=" flex justify-end">
                <button

                    onClick={() => {

                        localStorage.clear();

                        window.location.href = "/";
                    }}

                    className="
                    mt-10
                    bg-red-500
                    hover:bg-red-600
                    px-6
                    py-3
                    rounded-xl
                "
                >
                    Logout
                </button>
            </div>

        </div>
    );
}

export default TeacherDashboard;