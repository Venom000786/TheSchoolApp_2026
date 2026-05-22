import { useEffect, useState } from "react";

import axios from "axios";

function AdminAnnouncementsPage() {

    const [announcements,
    setAnnouncements] = useState([]);

    const [form,
    setForm] = useState({

        title: "",

        message: "",

        audience: "all"
    });

    const token =
    localStorage.getItem("token");





    // FETCH
    const fetchAnnouncements =
    async () => {

        try {

            const res =
            await axios.get(

                "http://localhost:5000/api/announcements",

                {
                    headers: {

                        Authorization:
                        `Bearer ${token}`
                    }
                }
            );

            setAnnouncements(res.data);

        } catch (err) {

            console.log(err);
        }
    };





    useEffect(() => {

        fetchAnnouncements();

    }, []);






    // INPUT
    const handleChange = (e) => {

        setForm({

            ...form,

            [e.target.name]:
            e.target.value
        });
    };






    // CREATE
    const handleSubmit =
    async (e) => {

        e.preventDefault();

        try {

            await axios.post(

                "http://localhost:5000/api/announcements",

                form,

                {
                    headers: {

                        Authorization:
                        `Bearer ${token}`
                    }
                }
            );

            setForm({

                title: "",

                message: "",

                audience: "all"
            });

            fetchAnnouncements();

        } catch (err) {

            console.log(err);
        }
    };






    // DELETE
    const deleteAnnouncement =
    async (id) => {

        try {

            await axios.delete(

                `http://localhost:5000/api/announcements/${id}`,

                {
                    headers: {

                        Authorization:
                        `Bearer ${token}`
                    }
                }
            );

            fetchAnnouncements();

        } catch (err) {

            console.log(err);
        }
    };







    return (

        <div
            className="
                min-h-screen
                bg-[#0f172a]
                text-white
                p-6
            "
        >

            {/* HEADER */}
            <div className="mb-8">

                <h1
                    className="
                        text-4xl
                        font-bold
                        mb-2
                    "
                >
                    Announcements
                </h1>

                <p className="text-gray-400">
                    Create and manage announcements
                </p>

            </div>







            {/* FORM */}
            <form

                onSubmit={handleSubmit}

                className="
                    bg-white/5
                    border
                    border-white/10
                    rounded-2xl
                    p-6
                    mb-8
                    space-y-4
                "
            >

                <input
                    type="text"
                    name="title"
                    placeholder="Announcement title"
                    value={form.title}
                    onChange={handleChange}
                    required
                    className="
                        w-full
                        bg-black/20
                        border
                        border-white/10
                        p-4
                        rounded-xl
                    "
                />




                <textarea
                    name="message"
                    placeholder="Write announcement..."
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="
                        w-full
                        bg-black/20
                        border
                        border-white/10
                        p-4
                        rounded-xl
                    "
                />




                <select
                    name="audience"
                    value={form.audience}
                    onChange={handleChange}
                    className="
                        w-full
                        bg-black/20
                        border
                        border-white/10
                        p-4
                        rounded-xl
                    "
                >

                    <option value="all">
                        All
                    </option>

                    <option value="students">
                        Students
                    </option>

                    <option value="teachers">
                        Teachers
                    </option>

                </select>





                <button
                    type="submit"
                    className="
                        bg-blue-500
                        hover:bg-blue-600
                        px-6
                        py-3
                        rounded-xl
                        font-semibold
                    "
                >
                    Publish Announcement
                </button>

            </form>








            {/* LIST */}
            <div className="space-y-4">

                {announcements.map((a) => (

                    <div

                        key={a._id}

                        className="
                            bg-white/5
                            border
                            border-white/10
                            rounded-2xl
                            p-5
                        "
                    >

                        <div
                            className="
                                flex
                                justify-between
                                items-start
                                gap-4
                            "
                        >

                            <div>

                                <h2
                                    className="
                                        text-2xl
                                        font-bold
                                        mb-2
                                    "
                                >
                                    {a.title}
                                </h2>

                                <p className="text-gray-300 mb-4">
                                    {a.message}
                                </p>

                                <div
                                    className="
                                        flex
                                        gap-4
                                        text-sm
                                        text-gray-400
                                    "
                                >

                                    <span>
                                        Audience:
                                        {" "}
                                        {a.audience}
                                    </span>

                                    <span>
                                        By:
                                        {" "}
                                        {a.createdBy?.name}
                                    </span>

                                </div>

                            </div>






                            <button

                                onClick={() =>
                                    deleteAnnouncement(a._id)
                                }

                                className="
                                    bg-red-500
                                    hover:bg-red-600
                                    px-4
                                    py-2
                                    rounded-xl
                                "
                            >
                                Delete
                            </button>

                        </div>

                    </div>
                ))}

            </div>

        </div>
    );
}

export default AdminAnnouncementsPage;