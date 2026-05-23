import { useEffect, useState } from "react";

import axios from "axios";

function NotificationsPage() {

    const [notifications,
    setNotifications] = useState([]);

    const [loading,
    setLoading] = useState(true);

    const [error,
    setError] = useState("");



    const token =
    localStorage.getItem(
        "token"
    );






    // FETCH NOTIFICATIONS
    const fetchNotifications =
    async () => {

        try {

            setLoading(true);

            setError("");



            const res =
            await axios.get(

                // "http://localhost:5000/api/announcements",
                `${import.meta.env.VITE_API_URL}/api/announcements`,

                {
                    headers: {

                        Authorization:
                        `Bearer ${token}`
                    }
                }
            );



            setNotifications(
                res.data || []
            );

        } catch (err) {

            console.log(err);

            setError(
                err?.response?.data?.message ||

                "Failed to load notifications"
            );

        } finally {

            setLoading(false);
        }
    };






    useEffect(() => {

        fetchNotifications();

    }, []);








    return (

        <div
            className="
                p-6
                min-h-screen
                bg-[#0f172a]
                text-white
            "
        >

            {/* HEADER */}
            <div
                className="
                    flex
                    flex-col
                    md:flex-row
                    md:items-center
                    md:justify-between
                    gap-4
                    mb-8
                "
            >

                <div>

                    <h1
                        className="
                            text-4xl
                            font-bold
                            mb-2
                        "
                    >
                        Notifications
                    </h1>

                    <p className="text-gray-400">
                        Latest school announcements
                    </p>

                </div>






                {/* REFRESH */}
                <button

                    onClick={fetchNotifications}

                    className="
                        bg-blue-500
                        hover:bg-blue-600
                        px-5
                        py-3
                        rounded-xl
                        font-semibold
                    "
                >
                    Refresh
                </button>

            </div>








            {/* LOADING */}
            {loading && (

                <div
                    className="
                        bg-white/5
                        border
                        border-white/10
                        p-8
                        rounded-2xl
                        text-gray-400
                    "
                >
                    Loading notifications...
                </div>
            )}








            {/* ERROR */}
            {!loading && error && (

                <div
                    className="
                        bg-red-500/20
                        border
                        border-red-500/20
                        text-red-300
                        p-5
                        rounded-2xl
                        mb-5
                    "
                >
                    {error}
                </div>
            )}








            {/* EMPTY */}
            {!loading &&
            notifications.length === 0 &&
            !error && (

                <div
                    className="
                        bg-white/5
                        border
                        border-white/10
                        p-10
                        rounded-2xl
                        text-center
                        text-gray-400
                    "
                >
                    No announcements found
                </div>
            )}








            {/* NOTIFICATION LIST */}
            {!loading &&
            notifications.length > 0 && (

                <div className="space-y-5">

                    {notifications.map((n) => (

                        <div

                            key={n._id}

                            className="
                                bg-white/5
                                border
                                border-white/10
                                rounded-2xl
                                p-6
                                hover:bg-white/[0.07]
                                transition
                            "
                        >

                            <div
                                className="
                                    flex
                                    flex-col
                                    md:flex-row
                                    md:items-start
                                    md:justify-between
                                    gap-4
                                "
                            >

                                <div className="flex-1">

                                    <h2
                                        className="
                                            text-2xl
                                            font-bold
                                            mb-2
                                        "
                                    >
                                        {n.title}
                                    </h2>





                                    <p
                                        className="
                                            text-gray-300
                                            leading-7
                                            mb-4
                                        "
                                    >
                                        {n.message}
                                    </p>





                                    <div
                                        className="
                                            flex
                                            flex-wrap
                                            gap-4
                                            text-sm
                                            text-gray-400
                                        "
                                    >

                                        <p>
                                            Posted By:
                                            {" "}
                                            {
                                                n.createdBy?.name ||

                                                "Admin"
                                            }
                                        </p>

                                        <p>
                                            {
                                                new Date(
                                                    n.createdAt
                                                ).toLocaleString()
                                            }
                                        </p>

                                    </div>

                                </div>

                            </div>

                        </div>
                    ))}

                </div>
            )}

        </div>
    );
}

export default NotificationsPage;