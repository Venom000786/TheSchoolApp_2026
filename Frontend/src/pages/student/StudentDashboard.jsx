import { Link } from "react-router-dom";

function StudentDashboard() {

    const user =
        JSON.parse(
            localStorage.getItem("user")
        );

    return (

        <div className="
            min-h-screen
             bg-linear-to-t from-gray-500 to-blue-950
            text-white
            p-6
        ">

            {/* Header */}
            <div className="
                flex
                justify-between
                items-center
                mb-8
            ">

                <div>

                    <h1 className="
                        text-4xl
                        font-bold
                    ">
                        Student Dashboard
                    </h1>

                    <p className="text-white/60 mt-2">
                        Welcome,
                        {" "}
                        {user?.name}
                    </p>

                </div>

            </div>



            {/* Cards */}
            <div className="
                grid
                grid-cols-1
                md:grid-cols-2
                lg:grid-cols-3
                gap-6
            ">

                {/* Attendance */}
                <Link to="/student/attendance">

                    <div className="
                        bg-white/10
                        hover:bg-white/20
                        transition
                        rounded-3xl
                        p-6
                        cursor-pointer hover:scale-105
                        
                    ">
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="
                            text-2xl
                            font-bold
                            mb-2
                        ">
                                    Attendance
                                </h2>


                                <p className="text-white/70">
                                    View your attendance records
                                </p>
                            </div>
                            <div>
                                <span className="text-3xl">
                                    📋
                                </span>
                            </div>
                        </div>

                    </div>

                </Link>

                {/* Assignment */}
                <Link to='/student/assignment'>
                    <div
                        className="
                        bg-white/10
                        hover:bg-white/20
                        transition
                        rounded-3xl
                        p-6
                        cursor-pointer
                         hover:scale-105
                        
                    "
                    >
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="
                            text-2xl
                            font-bold
                            mb-2
                        ">
                                    Assignments
                                </h2>

                                <p className="text-white/70">
                                    View and submit assignments
                                </p>
                            </div>
                            <span className="text-3xl">
                                📝
                            </span>
                        </div>
                    </div>
                </Link>


                {/* Timetable */}
                <Link
                    to="/timetable"
                    className="
                        bg-white/10
                        hover:bg-white/20
                        transition
                        rounded-3xl
                        p-6
                        cursor-pointer
                         hover:scale-105
                        
                    "
                >

                    <div
                        className="
                            flex
                            items-center
                            justify-between">



                    </div>

                    <div className="flex justify-between items-center">
                        <div>

                            <h2 className="text-2xl font-bold">
                                Timetable
                            </h2>

                            <p className="mt-3 text-gray-300">
                                Manage class schedules
                            </p>

                        </div>
                        <span className="text-3xl">
                            📅
                        </span>
                    </div>

                </Link>


                {/* Fees */}
                <Link to="/fees">

                    <div className="
                        bg-white/10
                        hover:bg-white/20
                        transition
                        rounded-3xl
                        p-6
                        cursor-pointer
                         hover:scale-105
                        transition
                    ">
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="
                            text-2xl
                            font-bold
                            mb-2
                        ">
                                    Fees
                                </h2>

                                <p className="text-white/70">
                                    Check pending and paid fees
                                </p>
                            </div>
                            <span className="text-3xl">
                                💵
                            </span>
                        </div>

                    </div>

                </Link>



                {/* Notes */}
                <Link to="/notes">

                    <div className="
                        bg-white/10
                        hover:bg-white/20
                        transition
                        rounded-3xl
                        p-6
                        cursor-pointer
                         hover:scale-105
                    ">

                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="
                            text-2xl
                            font-bold
                            mb-2
                        ">
                                    Notes
                                </h2>

                                <p className="text-white/70">
                                    Access study materials
                                </p>
                            </div>
                            <span className="text-3xl">
                                📚
                            </span>
                        </div>

                    </div>

                </Link>



                {/* Chat */}
                <Link to="/chat">

                    <div className="
                        bg-white/10
                        hover:bg-white/20
                        transition
                        rounded-3xl
                        p-6
                        cursor-pointer
                         hover:scale-105
                        
                    ">
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="
                            text-2xl
                            font-bold
                            mb-2
                        ">
                                    Chat
                                </h2>

                                <p className="text-white/70">
                                    Chat with teachers & admin
                                </p>
                            </div>
                            <span className="text-3xl">
                                💬
                            </span>
                        </div>

                    </div>

                </Link>



                {/* AI Study */}
                <Link to="/ai-study">

                    <div className="
                        bg-white/10
                        hover:bg-white/20
                        transition
                        rounded-3xl
                        p-6
                        cursor-pointer
                         hover:scale-105
                        
                    ">

                        <div className="flex justify-between items-center">
                            <div>

                                <h2 className="
                            text-2xl
                            font-bold
                            mb-2
                        ">
                                    AI Study Assistant
                                </h2>

                                <p className="text-white/70">
                                    Ask questions using AI
                                </p>

                            </div>
                            <span className="text-3xl">
                                🤖
                            </span>
                        </div>

                    </div>

                </Link>



                {/* Notifications */}
                <Link
                    to="/notifications"
                    className="
                        bg-white/10
                        hover:bg-white/20
                        transition
                        rounded-3xl
                        p-6
                        cursor-pointer hover:scale-105
                        
                    "
                >

                    <div
                        className="
                            flex
                            items-center
                            justify-between
                        "
                    >
                    </div>

                    <div className="flex justify-between items-center">
                        <div>

                            <h2 className="
                            text-2xl
                            font-bold
                            mb-2
                        ">
                                Notifications
                            </h2>

                            <p className="text-white/70">
                                View school announcements
                            </p>

                        </div>
                        <span className="text-3xl">
                            🔔
                        </span>
                    </div>

                </Link>

                {/* Live Class */}
                <Link to="/live-class">

                    <div className="
                        bg-white/10
                        hover:bg-white/20
                        transition
                        rounded-3xl
                        p-6
                        cursor-pointer
                         hover:scale-105
                        
                    ">

                        <div className="flex justify-between items-center">
                            <div>

                                <h2 className="
                            text-2xl
                            font-bold
                            mb-2
                        ">
                                    Live Classes
                                </h2>

                                <p className="text-white/70">
                                    Join live video classes
                                </p>

                            </div>
                            <span className="text-3xl">
                                🎥
                            </span>
                        </div>

                    </div>

                </Link>

            </div>

            {/* Logout */}
            <div className="flex justify-end">
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

export default StudentDashboard;