import {
    useEffect,
    useState
} from "react";

import axios from "axios";

function AdminAssignmentPage() {

    const [
        assignments,
        setAssignments
    ] = useState([]);

    const [
        classes,
        setClasses
    ] = useState([]);

    const [
        loading,
        setLoading
    ] = useState(false);

    const [
        form,
        setForm
    ] = useState({

        title: "",

        description: "",

        subject: "",

        className: "",

        dueDate: "",

        fileUrl: ""
    });

    const token =
        localStorage.getItem(
            "token"
        );





    // =========================
    // FETCH ASSIGNMENTS
    // =========================
    const fetchAssignments =
        async () => {

            try {

                const res =
                    await axios.get(

                        // "http://localhost:5000/api/assignments",
                        `${import.meta.env.VITE_API_URL}/api/assignments`,

                        {
                            headers: {

                                Authorization:
                                    `Bearer ${token}`
                            }
                        }
                    );

                console.log(
                    "Assignments:",
                    res.data
                );

                if (
                    Array.isArray(
                        res.data
                    )
                ) {

                    setAssignments(
                        res.data
                    );

                } else if (
                    Array.isArray(
                        res.data
                            .assignments
                    )
                ) {

                    setAssignments(
                        res.data
                            .assignments
                    );

                } else {

                    setAssignments([]);
                }

            } catch (err) {

                console.log(err);

                setAssignments([]);
            }
        };





    // =========================
    // FETCH CLASSES
    // =========================
    const fetchClasses =
        async () => {

            try {

                const res =
                    await axios.get(

                        // "http://localhost:5000/api/classes/all",
                        `${import.meta.env.VITE_API_URL}/api/classes/all`,

                        {
                            headers: {

                                Authorization:
                                    `Bearer ${token}`
                            }
                        }
                    );

                console.log(
                    "Classes:",
                    res.data
                );

                if (
                    Array.isArray(
                        res.data
                    )
                ) {

                    setClasses(
                        res.data
                    );

                } else {

                    setClasses([]);
                }

            } catch (err) {

                console.log(err);

                setClasses([]);
            }
        };





    useEffect(() => {

        fetchAssignments();

        fetchClasses();

    }, []);





    // =========================
    // HANDLE INPUT
    // =========================
    const handleChange =
        (e) => {

            setForm({

                ...form,

                [e.target.name]:
                    e.target.value
            });
        };





    // =========================
    // CREATE ASSIGNMENT
    // =========================
    const createAssignment =
        async (e) => {

            e.preventDefault();

            if (
                !form.title ||
                !form.description ||
                !form.subject ||
                !form.className ||
                !form.dueDate
            ) {

                return alert(
                    "Please fill all fields"
                );
            }

            try {

                setLoading(true);

                await axios.post(

                    // "http://localhost:5000/api/assignments",
                    `${import.meta.env.VITE_API_URL}/api/assignments`,

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

                    description: "",

                    subject: "",

                    className: "",

                    dueDate: "",

                    fileUrl: ""
                });

                await fetchAssignments();

                alert(
                    "Assignment created successfully"
                );

            } catch (err) {

                console.log(err);

                alert(

                    err?.response
                        ?.data
                        ?.message ||

                    "Failed to create assignment"
                );

            } finally {

                setLoading(false);
            }
        };





    // =========================
    // DELETE ASSIGNMENT
    // =========================
    const deleteAssignment =
        async (id) => {

            const confirmDelete =
                window.confirm(
                    "Delete this assignment?"
                );

            if (!confirmDelete)
                return;

            try {

                await axios.delete(

                    // `http://localhost:5000/api/assignments/${id}`,
                    `${import.meta.env.VITE_API_URL}/api/assignments/${id}`,

                    {
                        headers: {

                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

                fetchAssignments();

                alert(
                    "Assignment deleted"
                );

            } catch (err) {

                console.log(err);

                alert(
                    "Failed to delete assignment"
                );
            }
        };





    return (

        <div
            className="
                min-h-screen
                bg-[#020817]
                text-white
                p-6
            "
        >

            {/* HEADER */}
            <div className="mb-10">

                <h1
                    className="
                        text-4xl
                        font-bold
                        mb-2
                    "
                >
                    Admin Assignments
                </h1>

                <p className="text-gray-400">
                    Create and manage assignments
                </p>

            </div>





            {/* CREATE FORM */}
            <form

                onSubmit={
                    createAssignment
                }

                className="
                    bg-white/5
                    border
                    border-white/10
                    rounded-3xl
                    p-6
                    mb-10
                    space-y-4
                "
            >

                <h2
                    className="
                        text-2xl
                        font-bold
                        mb-4
                    "
                >
                    Create Assignment
                </h2>





                {/* TITLE */}
                <input
                    type="text"
                    name="title"
                    placeholder="Assignment Title"
                    value={form.title}
                    onChange={
                        handleChange
                    }
                    className="
                        w-full
                        bg-[#1e293b]
                        border
                        border-white/10
                        rounded-xl
                        p-4
                        outline-none
                    "
                    required
                />





                {/* DESCRIPTION */}
                <textarea
                    name="description"
                    placeholder="Assignment Description"
                    value={
                        form.description
                    }
                    onChange={
                        handleChange
                    }
                    rows="5"
                    className="
                        w-full
                        bg-[#1e293b]
                        border
                        border-white/10
                        rounded-xl
                        p-4
                        outline-none
                    "
                    required
                />





                {/* SUBJECT */}
                <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={form.subject}
                    onChange={
                        handleChange
                    }
                    className="
                        w-full
                        bg-[#1e293b]
                        border
                        border-white/10
                        rounded-xl
                        p-4
                        outline-none
                    "
                    required
                />





                {/* CLASS SELECT */}
                <select
                    name="className"
                    value={
                        form.className
                    }
                    onChange={
                        handleChange
                    }
                    className="
                        w-full
                        bg-[#1e293b]
                        border
                        border-white/10
                        rounded-xl
                        p-4
                    "
                    required
                >

                    <option value="">
                        Select Class
                    </option>

                    {classes.map(
                        (c) => (

                            <option
                                key={c._id}
                                value={
                                    c.className
                                }
                            >
                                {c.className}
                            </option>
                        )
                    )}

                </select>





                {/* DATE */}
                <input
                    type="date"
                    name="dueDate"
                    value={form.dueDate}
                    onChange={
                        handleChange
                    }
                    className="
                        w-full
                        bg-[#1e293b]
                        border
                        border-white/10
                        rounded-xl
                        p-4
                        outline-none
                    "
                    required
                />





                {/* FILE */}
                <input
                    type="text"
                    name="fileUrl"
                    placeholder="PDF / Drive Link (optional)"
                    value={form.fileUrl}
                    onChange={
                        handleChange
                    }
                    className="
                        w-full
                        bg-[#1e293b]
                        border
                        border-white/10
                        rounded-xl
                        p-4
                        outline-none
                    "
                />





                {/* BUTTON */}
                <button
                    type="submit"
                    disabled={loading}
                    className="
                        bg-blue-600
                        hover:bg-blue-700
                        px-8
                        py-4
                        rounded-xl
                        font-semibold
                        transition
                        disabled:opacity-50
                    "
                >
                    {
                        loading

                            ? "Creating..."

                            : "Create Assignment"
                    }
                </button>

            </form>





            {/* ASSIGNMENTS */}
            <div className="space-y-6">

                {
                    assignments.length === 0
                        ? (

                            <div
                                className="
                                    bg-white/5
                                    border
                                    border-white/10
                                    rounded-3xl
                                    p-10
                                    text-center
                                    text-gray-400
                                "
                            >
                                No assignments found
                            </div>

                        ) : (

                            assignments.map(
                                (a) => (

                                    <div
                                        key={a._id}
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
                                                md:flex-row
                                                md:items-start
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
                                                        mb-2
                                                    "
                                                >
                                                    {a.title}
                                                </h2>

                                                <p className="text-gray-300 mb-4">
                                                    {a.description}
                                                </p>

                                                <div className="flex gap-3 flex-wrap">

                                                    <span
                                                        className="
                                                            bg-blue-500/20
                                                            text-blue-300
                                                            px-3
                                                            py-1
                                                            rounded-lg
                                                            text-sm
                                                        "
                                                    >
                                                        {a.subject}
                                                    </span>

                                                    <span
                                                        className="
                                                            bg-green-500/20
                                                            text-green-300
                                                            px-3
                                                            py-1
                                                            rounded-lg
                                                            text-sm
                                                        "
                                                    >
                                                        {a.className}
                                                    </span>

                                                    <span
                                                        className="
                                                            bg-red-500/20
                                                            text-red-300
                                                            px-3
                                                            py-1
                                                            rounded-lg
                                                            text-sm
                                                        "
                                                    >
                                                        Due:
                                                        {" "}
                                                        {
                                                            new Date(
                                                                a.dueDate
                                                            ).toLocaleDateString()
                                                        }
                                                    </span>

                                                </div>

                                                {a.fileUrl && (

                                                    <a

                                                        href={a.fileUrl}

                                                        target="_blank"

                                                        rel="noreferrer"

                                                        className="
                                                            inline-block
                                                            mt-4
                                                            text-blue-400
                                                            underline
                                                        "
                                                    >
                                                        Open Attachment
                                                    </a>
                                                )}

                                            </div>





                                            {/* RIGHT */}
                                            <div
                                                className="
                                                    flex
                                                    flex-col
                                                    items-end
                                                    gap-4
                                                "
                                            >

                                                <p className="text-gray-400 text-sm">

                                                    {
                                                        new Date(
                                                            a.createdAt
                                                        ).toLocaleDateString()
                                                    }

                                                </p>

                                                <button

                                                    onClick={() =>
                                                        deleteAssignment(
                                                            a._id
                                                        )
                                                    }

                                                    className="
                                                        bg-red-500
                                                        hover:bg-red-600
                                                        px-5
                                                        py-3
                                                        rounded-xl
                                                        font-semibold
                                                    "
                                                >
                                                    Delete
                                                </button>

                                            </div>

                                        </div>

                                    </div>
                                )
                            )
                        )
                }

            </div>

        </div>
    );
}

export default AdminAssignmentPage;