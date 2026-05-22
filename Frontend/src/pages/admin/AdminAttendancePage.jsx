import { useEffect, useState } from "react";
import axios from "axios";

function AdminAttendancePage() {

    const [teachers, setTeachers] = useState([]);
    const [students, setStudents] = useState([]);
    const [attendance, setAttendance] = useState([]);

    const [activeTab, setActiveTab] =
        useState("teachers");

    const [search, setSearch] =
        useState("");

    const [loading, setLoading] =
        useState(true);

    const token =
        localStorage.getItem("token");

    const user =
        JSON.parse(
            localStorage.getItem("user")
        );

    const role =
        user?.role;

    // ADMIN ONLY
    if (role !== "admin") {

        return (

            <div
                className="
                    min-h-screen
                    bg-[#020617]
                    text-white
                    flex
                    items-center
                    justify-center
                    text-3xl
                    font-bold
                "
            >
                Admin Access Only
            </div>
        );
    }

    // FETCH USERS
    const fetchUsers = async () => {

        try {

            const res =
                await axios.get(

                    "http://localhost:5000/api/admin/users",

                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

            const allUsers =
                res.data || [];

            setTeachers(
                allUsers.filter(
                    (u) =>
                        u.role === "teacher"
                )
            );

            setStudents(
                allUsers.filter(
                    (u) =>
                        u.role === "student"
                )
            );

        } catch (err) {

            console.log(err);
        }
    };

    // FETCH ATTENDANCE
    const fetchAttendance = async () => {

        try {

            const res =
                await axios.get(

                    "http://localhost:5000/api/attendance",

                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

            console.log(
                "ATTENDANCE DATA =>",
                res.data
            );

            setAttendance(
                Array.isArray(res.data)
                    ? res.data
                    : []
            );

        } catch (err) {

            console.log(err);

        } finally {

            setLoading(false);
        }
    };

    useEffect(() => {

        fetchUsers();
        fetchAttendance();

    }, []);

    // SAFE USER ID
    const getUserId = (record) => {

        if (!record) return null;

        // populated object
        if (
            typeof record.studentId === "object" &&
            record.studentId !== null
        ) {

            return String(
                record.studentId._id
            );
        }

        // plain string
        return String(
            record.studentId
        );
    };

    // TODAY ATTENDANCE
    const getTodayAttendance = (
        userId
    ) => {

        const today =
            new Date()
                .toISOString()
                .split("T")[0];

        return attendance.find((a) => {

            if (!a.date) return false;

            const attendanceDate =
                new Date(a.date)
                    .toISOString()
                    .split("T")[0];

            return (

                getUserId(a) ===
                    String(userId)

                &&

                attendanceDate === today
            );
        });
    };

    // MARK TEACHER ATTENDANCE
    const markTeacherAttendance =
        async (
            teacherId,
            status
        ) => {

            try {

                await axios.post(

                    "http://localhost:5000/api/attendance",

                    {
                        studentId:
                            teacherId,

                        className:
                            "Teacher",

                        role:
                            "teacher",

                        status,

                        date:
                            new Date()
                    },

                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

                await fetchAttendance();

                alert(
                    "Attendance marked successfully"
                );

            } catch (err) {

                console.log(err);

                alert(

                    err?.response?.data?.message ||

                    "Failed to mark attendance"
                );
            }
        };

    // EDIT ATTENDANCE
    const editAttendance =
        async (
            attendanceId,
            status
        ) => {

            try {

                await axios.put(

                    `http://localhost:5000/api/attendance/${attendanceId}`,

                    {
                        status
                    },

                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

                await fetchAttendance();

                alert(
                    "Attendance updated successfully"
                );

            } catch (err) {

                console.log(err);

                alert(

                    err?.response?.data?.message ||

                    "Failed to update attendance"
                );
            }
        };

    // PERFORMANCE
    const getPerformance = (
        userId
    ) => {

        const records =
            attendance.filter((a) => {

                return (
                    getUserId(a) ===
                    String(userId)
                );
            });

        const total =
            records.length;

        const present =
            records.filter(
                (r) =>
                    r.status === "present"
            ).length;

        const absent =
            records.filter(
                (r) =>
                    r.status === "absent"
            ).length;

        const percentage =
            total > 0

                ? Math.round(
                    (present / total) * 100
                )

                : 0;

        return {

            total,
            present,
            absent,
            percentage
        };
    };

    // FILTERS
    const filteredTeachers =
        teachers.filter((teacher) =>

            teacher.name
                ?.toLowerCase()
                .includes(
                    search.toLowerCase()
                )
        );

    const filteredStudents =
        students.filter((student) =>

            student.name
                ?.toLowerCase()
                .includes(
                    search.toLowerCase()
                )
        );

    if (loading) {

        return (

            <div
                className="
                    min-h-screen
                    bg-[#020617]
                    text-white
                    flex
                    items-center
                    justify-center
                    text-3xl
                "
            >
                Loading...
            </div>
        );
    }

    return (

        <div
            className="
                min-h-screen
                bg-[#020617]
                text-white
                p-6
            "
        >

            {/* HEADER */}
            <div className="mb-8">

                <h1
                    className="
                        text-5xl
                        font-bold
                        mb-2
                    "
                >
                    Attendance Dashboard
                </h1>

                <p className="text-gray-400">
                    Admin Attendance Management
                </p>

            </div>

            {/* TABS */}
            <div className="flex gap-4 mb-8">

                <button
                    onClick={() =>
                        setActiveTab(
                            "teachers"
                        )
                    }
                    className={`
                        px-8
                        py-4
                        rounded-2xl
                        font-semibold

                        ${
                            activeTab ===
                            "teachers"

                                ? "bg-blue-500"

                                : "bg-white/10"
                        }
                    `}
                >
                    Teachers
                </button>

                <button
                    onClick={() =>
                        setActiveTab(
                            "students"
                        )
                    }
                    className={`
                        px-8
                        py-4
                        rounded-2xl
                        font-semibold

                        ${
                            activeTab ===
                            "students"

                                ? "bg-blue-500"

                                : "bg-white/10"
                        }
                    `}
                >
                    Students Reports
                </button>

            </div>

            {/* SEARCH */}
            <div className="mb-8">

                <input
                    type="text"
                    placeholder={`Search ${activeTab}`}
                    value={search}
                    onChange={(e) =>
                        setSearch(
                            e.target.value
                        )
                    }
                    className="
                        w-full
                        md:w-[400px]
                        bg-white/5
                        border
                        border-white/10
                        rounded-2xl
                        p-4
                        outline-none
                    "
                />

            </div>

            {/* TEACHERS */}
            {activeTab ===
                "teachers" && (

                <div className="space-y-5">

                    {filteredTeachers.map(
                        (teacher) => {

                            const perf =
                                getPerformance(
                                    teacher._id
                                );

                            const todayAttendance =
                                getTodayAttendance(
                                    teacher._id
                                );

                            return (

                                <div
                                    key={
                                        teacher._id
                                    }
                                    className="
                                        bg-white/5
                                        border
                                        border-white/10
                                        rounded-3xl
                                        p-6
                                    "
                                >

                                    <div
                                        className="
                                            flex
                                            flex-col
                                            lg:flex-row
                                            lg:justify-between
                                            gap-8
                                        "
                                    >

                                        {/* LEFT */}
                                        <div>

                                            <h2
                                                className="
                                                    text-3xl
                                                    font-bold
                                                    mb-4
                                                "
                                            >
                                                {
                                                    teacher.name
                                                }
                                            </h2>

                                            <div
                                                className="
                                                    grid
                                                    grid-cols-2
                                                    md:grid-cols-4
                                                    gap-4
                                                "
                                            >

                                                <StatCard
                                                    title="Working Days"
                                                    value={perf.total}
                                                />

                                                <StatCard
                                                    title="Present"
                                                    value={perf.present}
                                                    color="green"
                                                />

                                                <StatCard
                                                    title="Absent"
                                                    value={perf.absent}
                                                    color="red"
                                                />

                                                <StatCard
                                                    title="Performance"
                                                    value={`${perf.percentage}%`}
                                                    color="blue"
                                                />

                                            </div>

                                        </div>

                                        {/* RIGHT */}
                                        <div className="flex gap-4 flex-wrap">

                                            {!todayAttendance ? (

                                                <>

                                                    <button
                                                        onClick={() =>
                                                            markTeacherAttendance(
                                                                teacher._id,
                                                                "present"
                                                            )
                                                        }
                                                        className="
                                                            bg-green-500
                                                            hover:bg-green-600
                                                            px-6
                                                            py-3
                                                            rounded-2xl
                                                            font-bold
                                                        "
                                                    >
                                                        Present
                                                    </button>

                                                    <button
                                                        onClick={() =>
                                                            markTeacherAttendance(
                                                                teacher._id,
                                                                "absent"
                                                            )
                                                        }
                                                        className="
                                                            bg-red-500
                                                            hover:bg-red-600
                                                            px-6
                                                            py-3
                                                            rounded-2xl
                                                            font-bold
                                                        "
                                                    >
                                                        Absent
                                                    </button>

                                                </>

                                            ) : (

                                                <>

                                                    <button
                                                        onClick={() =>
                                                            editAttendance(
                                                                todayAttendance._id,
                                                                "present"
                                                            )
                                                        }
                                                        className="
                                                            bg-yellow-500
                                                            hover:bg-yellow-600
                                                            px-6
                                                            py-3
                                                            rounded-2xl
                                                            font-bold
                                                        "
                                                    >
                                                        Edit Present
                                                    </button>

                                                    <button
                                                        onClick={() =>
                                                            editAttendance(
                                                                todayAttendance._id,
                                                                "absent"
                                                            )
                                                        }
                                                        className="
                                                            bg-orange-500
                                                            hover:bg-orange-600
                                                            px-6
                                                            py-3
                                                            rounded-2xl
                                                            font-bold
                                                        "
                                                    >
                                                        Edit Absent
                                                    </button>

                                                </>

                                            )}

                                        </div>

                                    </div>

                                </div>
                            );
                        }
                    )}

                </div>
            )}

            {/* STUDENTS */}
            {activeTab ===
                "students" && (

                <div className="space-y-5">

                    {filteredStudents.map(
                        (student) => {

                            const perf =
                                getPerformance(
                                    student._id
                                );

                            const todayAttendance =
                                getTodayAttendance(
                                    student._id
                                );

                            return (

                                <div
                                    key={
                                        student._id
                                    }
                                    className="
                                        bg-white/5
                                        border
                                        border-white/10
                                        rounded-3xl
                                        p-6
                                    "
                                >

                                    <div
                                        className="
                                            flex
                                            flex-col
                                            lg:flex-row
                                            lg:justify-between
                                            gap-8
                                        "
                                    >

                                        <div>

                                            <h2
                                                className="
                                                    text-3xl
                                                    font-bold
                                                    mb-4
                                                "
                                            >
                                                {
                                                    student.name
                                                }
                                            </h2>

                                            <div
                                                className="
                                                    grid
                                                    grid-cols-2
                                                    md:grid-cols-4
                                                    gap-4
                                                "
                                            >

                                                <StatCard
                                                    title="Working Days"
                                                    value={perf.total}
                                                />

                                                <StatCard
                                                    title="Present"
                                                    value={perf.present}
                                                    color="green"
                                                />

                                                <StatCard
                                                    title="Absent"
                                                    value={perf.absent}
                                                    color="red"
                                                />

                                                <StatCard
                                                    title="Performance"
                                                    value={`${perf.percentage}%`}
                                                    color="blue"
                                                />

                                            </div>

                                        </div>

                                        <div className="flex gap-4 flex-wrap">

                                            {todayAttendance && (

                                                <>

                                                    <button
                                                        onClick={() =>
                                                            editAttendance(
                                                                todayAttendance._id,
                                                                "present"
                                                            )
                                                        }
                                                        className="
                                                            bg-yellow-500
                                                            hover:bg-yellow-600
                                                            px-6
                                                            py-3
                                                            rounded-2xl
                                                            font-bold
                                                        "
                                                    >
                                                        Edit Present
                                                    </button>

                                                    <button
                                                        onClick={() =>
                                                            editAttendance(
                                                                todayAttendance._id,
                                                                "absent"
                                                            )
                                                        }
                                                        className="
                                                            bg-orange-500
                                                            hover:bg-orange-600
                                                            px-6
                                                            py-3
                                                            rounded-2xl
                                                            font-bold
                                                        "
                                                    >
                                                        Edit Absent
                                                    </button>

                                                </>

                                            )}

                                        </div>

                                    </div>

                                </div>
                            );
                        }
                    )}

                </div>
            )}

        </div>
    );
}

// STAT CARD
function StatCard({
    title,
    value,
    color
}) {

    let bg = "bg-black/20";
    let text = "text-white";

    if (color === "green") {
        bg = "bg-green-500/10";
        text = "text-green-400";
    }

    if (color === "red") {
        bg = "bg-red-500/10";
        text = "text-red-400";
    }

    if (color === "blue") {
        bg = "bg-blue-500/10";
        text = "text-blue-400";
    }

    return (

        <div
            className={`${bg} rounded-2xl p-4`}
        >

            <p className="text-gray-400">
                {title}
            </p>

            <h3
                className={`text-3xl font-bold ${text}`}
            >
                {value}
            </h3>

        </div>
    );
}

export default AdminAttendancePage;