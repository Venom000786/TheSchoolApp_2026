import { useEffect, useState } from "react";
import axios from "axios";

function TeacherClassesPage() {

    const [classes, setClasses] = useState([]);

    const [students, setStudents] = useState([]);

    const [className, setClassName] = useState("");

    const [selectedStudent, setSelectedStudent] = useState("");

    const [selectedClass, setSelectedClass] = useState("");

    const [loading, setLoading] = useState(false);

    const [editingClassId, setEditingClassId] = useState(null);

    const [editClassName, setEditClassName] = useState("");

    const token = localStorage.getItem("token");



    // FETCH CLASSES
    const fetchClasses = async () => {

        try {

            const res = await axios.get(

                "http://localhost:5000/api/classes/my",

                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setClasses(res.data || []);

        } catch (err) {

            console.log(err);
        }
    };





    // FETCH STUDENTS
    const fetchStudents = async () => {

        try {

            const res = await axios.get(

                "http://localhost:5000/api/classes/students",

                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setStudents(res.data || []);

        } catch (err) {

            console.log(err);
        }
    };





    useEffect(() => {

        fetchClasses();

        fetchStudents();

    }, []);





    // CREATE CLASS
    const createClass = async () => {

        if (!className) {

            return alert("Enter class name");
        }

        try {

            setLoading(true);

            await axios.post(

                "http://localhost:5000/api/classes",

                { className },

                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setClassName("");

            fetchClasses();

            alert("Class created");

        } catch (err) {

            console.log(err);

            alert(
                err?.response?.data?.message ||
                "Failed to create class"
            );

        } finally {

            setLoading(false);
        }
    };





    // ADD STUDENT
    const addStudent = async () => {

        if (!selectedClass || !selectedStudent) {

            return alert("Fill all fields");
        }

        try {

            setLoading(true);

            await axios.post(

                "http://localhost:5000/api/classes/add-student",

                {
                    classId: selectedClass,
                    studentId: selectedStudent
                },

                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setSelectedStudent("");

            fetchClasses();

            alert("Student added");

        } catch (err) {

            console.log(err);

            alert(
                err?.response?.data?.message ||
                "Failed to add student"
            );

        } finally {

            setLoading(false);
        }
    };





    // REMOVE STUDENT
    const removeStudent = async (
        classId,
        studentId
    ) => {

        try {

            await axios.post(

                "http://localhost:5000/api/classes/remove-student",

                {
                    classId,
                    studentId
                },

                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            fetchClasses();

        } catch (err) {

            console.log(err);

            alert(
                err?.response?.data?.message ||
                "Failed to remove student"
            );
        }
    };





    // DELETE CLASS
    const deleteClass = async (id) => {

        const confirmDelete =
        window.confirm(
            "Delete this class?"
        );

        if (!confirmDelete) return;

        try {

            await axios.delete(

                `http://localhost:5000/api/classes/${id}`,

                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            fetchClasses();

            alert("Class deleted");

        } catch (err) {

            console.log(err);

            alert(
                err?.response?.data?.message ||
                "Failed to delete class"
            );
        }
    };





    // UPDATE CLASS
    const updateClass = async (id) => {

        if (!editClassName) {

            return alert("Enter class name");
        }

        try {

            await axios.put(

                `http://localhost:5000/api/classes/${id}`,

                {
                    className: editClassName
                },

                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setEditingClassId(null);

            setEditClassName("");

            fetchClasses();

            alert("Class updated");

        } catch (err) {

            console.log(err);

            alert(
                err?.response?.data?.message ||
                "Failed to update class"
            );
        }
    };





    return (

        <div className="min-h-screen bg-[#020817] text-white">

            <div className="max-w-7xl mx-auto p-6">

                {/* HEADER */}
                <div className="mb-10">

                    <h1 className="text-4xl font-bold mb-2">
                        Teacher Classes
                    </h1>

                    <p className="text-gray-400">
                        Create classes and manage students
                    </p>

                </div>





                {/* TOP GRID */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

                    {/* CREATE CLASS */}
                    <div
                        className="
                            bg-white/5
                            border
                            border-white/10
                            rounded-3xl
                            p-6
                            backdrop-blur-md
                        "
                    >

                        <h2 className="text-2xl font-bold mb-5">
                            Create Class
                        </h2>

                        <div className="space-y-4">

                            <input
                                type="text"
                                placeholder="Enter class name"
                                value={className}
                                onChange={(e) =>
                                    setClassName(
                                        e.target.value
                                    )
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

                            <button
                                onClick={createClass}
                                disabled={loading}
                                className="
                                    w-full
                                    bg-blue-600
                                    hover:bg-blue-700
                                    rounded-xl
                                    p-4
                                    font-semibold
                                    transition
                                "
                            >
                                {loading
                                    ? "Creating..."
                                    : "Create Class"}
                            </button>

                        </div>

                    </div>





                    {/* ADD STUDENT */}
                    <div
                        className="
                            bg-white/5
                            border
                            border-white/10
                            rounded-3xl
                            p-6
                            backdrop-blur-md
                        "
                    >

                        <h2 className="text-2xl font-bold mb-5">
                            Add Student
                        </h2>

                        <div className="space-y-4">

                            <select
                                value={selectedClass}
                                onChange={(e) =>
                                    setSelectedClass(
                                        e.target.value
                                    )
                                }
                                className="
                                    w-full
                                    bg-[#1e293b]
                                    border
                                    border-white/10
                                    rounded-xl
                                    p-4
                                "
                            >

                                <option value="">
                                    Select Class
                                </option>

                                {classes.map((c) => (

                                    <option
                                        key={c._id}
                                        value={c._id}
                                    >
                                        {c.className}
                                    </option>
                                ))}

                            </select>





                            <select
                                value={selectedStudent}
                                onChange={(e) =>
                                    setSelectedStudent(
                                        e.target.value
                                    )
                                }
                                className="
                                    w-full
                                    bg-[#1e293b]
                                    border
                                    border-white/10
                                    rounded-xl
                                    p-4
                                "
                            >

                                <option value="">
                                    Select Student
                                </option>

                                {students.map((student) => (

                                    <option
                                        key={student._id}
                                        value={student._id}
                                    >
                                        {student.name}
                                        {" - "}
                                        {student.email}
                                    </option>
                                ))}

                            </select>





                            <button
                                onClick={addStudent}
                                disabled={loading}
                                className="
                                    w-full
                                    bg-green-600
                                    hover:bg-green-700
                                    rounded-xl
                                    p-4
                                    font-semibold
                                    transition
                                "
                            >
                                Add Student
                            </button>

                        </div>

                    </div>

                </div>





                {/* CLASSES */}
                <div className="space-y-6">

                    {classes.length === 0 ? (

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
                            No classes created yet
                        </div>

                    ) : (

                        classes.map((c) => (

                            <div
                                key={c._id}
                                className="
                                    bg-white/5
                                    border
                                    border-white/10
                                    rounded-3xl
                                    p-6
                                    backdrop-blur-md
                                "
                            >

                                {/* CLASS HEADER */}
                                <div
                                    className="
                                        flex
                                        flex-col
                                        lg:flex-row
                                        lg:items-center
                                        lg:justify-between
                                        gap-4
                                        mb-6
                                    "
                                >

                                    <div>

                                        {editingClassId === c._id ? (

                                            <div className="flex gap-3">

                                                <input
                                                    type="text"
                                                    value={editClassName}
                                                    onChange={(e) =>
                                                        setEditClassName(
                                                            e.target.value
                                                        )
                                                    }
                                                    className="
                                                        bg-[#1e293b]
                                                        border
                                                        border-white/10
                                                        rounded-xl
                                                        px-4
                                                        py-2
                                                    "
                                                />

                                                <button
                                                    onClick={() =>
                                                        updateClass(c._id)
                                                    }
                                                    className="
                                                        bg-green-600
                                                        px-4
                                                        rounded-xl
                                                    "
                                                >
                                                    Save
                                                </button>

                                            </div>

                                        ) : (

                                            <>
                                                <h2 className="text-3xl font-bold">
                                                    {c.className}
                                                </h2>

                                                <p className="text-gray-400 mt-1">
                                                    Classroom Students
                                                </p>
                                            </>
                                        )}

                                    </div>





                                    <div className="flex gap-3 flex-wrap">

                                        <div
                                            className="
                                                bg-blue-500/20
                                                text-blue-300
                                                px-4
                                                py-2
                                                rounded-xl
                                                text-sm
                                            "
                                        >
                                            {c.students?.length || 0}
                                            {" "}
                                            Students
                                        </div>





                                        <button
                                            onClick={() => {

                                                setEditingClassId(c._id);

                                                setEditClassName(
                                                    c.className
                                                );
                                            }}
                                            className="
                                                bg-yellow-500
                                                hover:bg-yellow-600
                                                px-4
                                                py-2
                                                rounded-xl
                                                text-sm
                                                font-semibold
                                            "
                                        >
                                            Edit
                                        </button>





                                        <button
                                            onClick={() =>
                                                deleteClass(c._id)
                                            }
                                            className="
                                                bg-red-600
                                                hover:bg-red-700
                                                px-4
                                                py-2
                                                rounded-xl
                                                text-sm
                                                font-semibold
                                            "
                                        >
                                            Delete
                                        </button>

                                    </div>

                                </div>





                                {/* STUDENTS */}
                                <div className="grid md:grid-cols-2 gap-4">

                                    {c.students?.length === 0 ? (

                                        <div className="text-gray-400">
                                            No students added
                                        </div>

                                    ) : (

                                        c.students.map((s) => (

                                            <div
                                                key={s._id}
                                                className="
                                                    bg-[#1e293b]
                                                    border
                                                    border-white/5
                                                    rounded-2xl
                                                    p-5
                                                    flex
                                                    items-center
                                                    justify-between
                                                    gap-4
                                                "
                                            >

                                                <div>

                                                    <h3 className="font-semibold text-lg">
                                                        {s.name}
                                                    </h3>

                                                    <p className="text-gray-400 text-sm mt-1">
                                                        {s.email}
                                                    </p>

                                                </div>





                                                <button
                                                    onClick={() =>
                                                        removeStudent(
                                                            c._id,
                                                            s._id
                                                        )
                                                    }
                                                    className="
                                                        bg-red-500
                                                        hover:bg-red-600
                                                        px-4
                                                        py-2
                                                        rounded-xl
                                                        text-sm
                                                    "
                                                >
                                                    Remove
                                                </button>

                                            </div>
                                        ))
                                    )}

                                </div>

                            </div>
                        ))
                    )}

                </div>

            </div>

        </div>
    );
}

export default TeacherClassesPage;