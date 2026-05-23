import { useEffect, useState } from "react";
import axios from "axios";

function StudentAttendancePage() {

    const [records, setRecords] = useState([]);

    const [stats, setStats] = useState({

        totalWorkingDays: 0,

        presentDays: 0,

        absentDays: 0,

        percentage: 0
    });

    const [loading, setLoading] = useState(true);

    const token =
        localStorage.getItem("token");

    const user =
        JSON.parse(
            localStorage.getItem("user")
        );

    // FETCH MY ATTENDANCE
    const fetchAttendance = async () => {

        try {

            const res = await axios.get(

                // "http://localhost:5000/api/attendance/my",
                `${import.meta.env.VITE_API_URL}/api/attendance/my`,

                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            const data =
                res.data || {};

            const attendanceRecords =
                data.records || [];

            setRecords(attendanceRecords);

            const totalWorkingDays =
                attendanceRecords.length;

            const presentDays =
                attendanceRecords.filter(
                    (r) =>
                        r.status === "present"
                ).length;

            const absentDays =
                attendanceRecords.filter(
                    (r) =>
                        r.status === "absent"
                ).length;

            const percentage =
                totalWorkingDays > 0

                    ? Math.round(
                        (presentDays /
                            totalWorkingDays) * 100
                    )

                    : 0;

            setStats({

                totalWorkingDays,

                presentDays,

                absentDays,

                percentage
            });

        } catch (err) {

            console.log(err);

        } finally {

            setLoading(false);
        }
    };

    useEffect(() => {

        fetchAttendance();

    }, []);

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
                    font-bold
                "
            >
                Loading Attendance...
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
            <div className="mb-10">

                <h1
                    className="
                        text-5xl
                        font-bold
                        mb-3
                    "
                >
                    My Attendance
                </h1>

                <p className="text-gray-400 text-lg">

                    Attendance details for
                    {" "}
                    {user?.name}

                </p>

            </div>

            {/* STATS */}
            <div
                className="
                    grid
                    grid-cols-1
                    md:grid-cols-4
                    gap-5
                    mb-10
                "
            >

                {/* TOTAL */}
                <div
                    className="
                        bg-white/5
                        border
                        border-white/10
                        rounded-3xl
                        p-6
                    "
                >

                    <p className="text-gray-400 mb-2">
                        Total Working Days
                    </p>

                    <h2
                        className="
                            text-4xl
                            font-bold
                        "
                    >
                        {stats.totalWorkingDays}
                    </h2>

                </div>

                {/* PRESENT */}
                <div
                    className="
                        bg-green-500/10
                        border
                        border-green-500/20
                        rounded-3xl
                        p-6
                    "
                >

                    <p className="text-green-300 mb-2">
                        Present Days
                    </p>

                    <h2
                        className="
                            text-4xl
                            font-bold
                            text-green-400
                        "
                    >
                        {stats.presentDays}
                    </h2>

                </div>

                {/* ABSENT */}
                <div
                    className="
                        bg-red-500/10
                        border
                        border-red-500/20
                        rounded-3xl
                        p-6
                    "
                >

                    <p className="text-red-300 mb-2">
                        Absent Days
                    </p>

                    <h2
                        className="
                            text-4xl
                            font-bold
                            text-red-400
                        "
                    >
                        {stats.absentDays}
                    </h2>

                </div>

                {/* PERCENTAGE */}
                <div
                    className="
                        bg-blue-500/10
                        border
                        border-blue-500/20
                        rounded-3xl
                        p-6
                    "
                >

                    <p className="text-blue-300 mb-2">
                        Attendance %
                    </p>

                    <h2
                        className="
                            text-4xl
                            font-bold
                            text-blue-400
                        "
                    >
                        {stats.percentage}%
                    </h2>

                </div>

            </div>

            {/* ATTENDANCE RECORDS */}
            <div className="space-y-5">

                {records.length === 0 ? (

                    <div
                        className="
                            bg-white/5
                            border
                            border-white/10
                            rounded-3xl
                            p-10
                            text-center
                            text-gray-400
                            text-xl
                        "
                    >
                        No attendance records found
                    </div>

                ) : (

                    records.map((record) => (

                        <div

                            key={record._id}

                            className="
                                bg-white/5
                                border
                                border-white/10
                                rounded-3xl
                                p-6
                                flex
                                flex-col
                                md:flex-row
                                md:items-center
                                md:justify-between
                                gap-5
                            "
                        >

                            {/* LEFT */}
                            <div>

                                <h2
                                    className="
                                        text-2xl
                                        font-bold
                                        mb-3
                                    "
                                >
                                    {record.className}
                                </h2>

                                <p className="text-gray-400">

                                    Date:
                                    {" "}

                                    {
                                        new Date(
                                            record.date
                                        ).toLocaleDateString()
                                    }

                                </p>

                                <p className="text-gray-500 mt-2">

                                    Marked By:
                                    {" "}

                                    {
                                        record.markedBy?.name ||
                                        "Teacher"
                                    }

                                </p>

                            </div>

                            {/* STATUS */}
                            <div>

                                <span
                                    className={`

                                        px-6
                                        py-3
                                        rounded-2xl
                                        font-bold
                                        text-lg

                                        ${
                                            record.status === "present"

                                                ? `
                                                    bg-green-500/20
                                                    text-green-400
                                                    border
                                                    border-green-500/20
                                                  `

                                                : `
                                                    bg-red-500/20
                                                    text-red-400
                                                    border
                                                    border-red-500/20
                                                  `
                                        }
                                    `}
                                >

                                    {record.status}

                                </span>

                            </div>

                        </div>
                    ))
                )}

            </div>

        </div>
    );
}

export default StudentAttendancePage;