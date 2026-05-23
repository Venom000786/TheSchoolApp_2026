import { useEffect, useState } from "react";

import axios from "axios";

import NoteCard from "../components/Notes/NoteCard";

import NoteModal from "../components/Notes/NoteModal";


const NotesPage = () => {

    const [notes,
    setNotes] = useState([]);

    const [selectedNote,
    setSelectedNote] = useState(null);

    const [loading,
    setLoading] = useState(true);


    const token =
    localStorage.getItem("token");



    // 📥 FETCH NOTES
    const fetchNotes =
    async () => {

        try {

            setLoading(true);

            const res =
            await axios.get(

                // "http://localhost:5000/api/notes",
                `${import.meta.env.VITE_API_URL}/api/notes`,

                {
                    headers: {

                        Authorization:
                        `Bearer ${token}`
                    }
                }
            );

            setNotes(res.data);

        } catch (err) {

            console.log(err);

        } finally {

            setLoading(false);
        }
    };



    useEffect(() => {

        fetchNotes();

    }, []);




    // 🗑 DELETE NOTE
    const deleteNote =
    async (id) => {

        try {

            await axios.delete(

                // `http://localhost:5000/api/notes/${id}`,
                `${import.meta.env.VITE_API_URL}/api/notes/${id}`,

                {
                    headers: {

                        Authorization:
                        `Bearer ${token}`
                    }
                }
            );



            // remove instantly from UI
            setNotes((prev) =>

                prev.filter((note) =>

                    note._id !== id
                )
            );

        } catch (err) {

            console.log(err);
        }
    };




    return (

        <div
            className="
                p-6
                bg-gray-900
                min-h-screen
                text-white
            "
        >

            {/* Header */}
            <div
                className="
                    flex
                    items-center
                    justify-between
                    mb-6
                "
            >

                <h1
                    className="
                        text-3xl
                        font-bold
                    "
                >
                    My Notes
                </h1>



                {/* ➕ Add Note */}
                <button

                    onClick={() =>
                        setSelectedNote({})
                    }

                    className="
                        px-5
                        py-3
                        bg-blue-500
                        hover:bg-blue-600
                        rounded-xl
                    "
                >
                    + Add Note
                </button>

            </div>





            {/* Loading */}
            {loading && (

                <div
                    className="
                        text-gray-400
                    "
                >
                    Loading notes...
                </div>
            )}





            {/* Empty State */}
            {!loading &&
            notes.length === 0 && (

                <div
                    className="
                        bg-white/5
                        p-10
                        rounded-2xl
                        text-center
                        text-gray-400
                    "
                >
                    No notes found.
                </div>
            )}





            {/* Notes Grid */}
            {!loading &&
            notes.length > 0 && (

                <div
                    className="
                        grid
                        grid-cols-1
                        md:grid-cols-2
                        lg:grid-cols-3
                        gap-5
                    "
                >

                    {notes.map((note) => (

                        <div
                            key={note._id}
                            className="relative"
                        >

                            <NoteCard

                                note={note}

                                onClick={() =>
                                    setSelectedNote(note)
                                }
                            />



                            {/* 🗑 Delete */}
                            <button

                                onClick={() =>
                                    deleteNote(note._id)
                                }

                                className="
                                    absolute
                                    top-2
                                    right-2
                                    bg-red-500
                                    hover:bg-red-600
                                    px-3
                                    py-1
                                    rounded-lg
                                    text-sm
                                "
                            >
                                Delete
                            </button>

                        </div>
                    ))}

                </div>
            )}





            {/* Modal */}
            {selectedNote !== null && (

                <NoteModal

                    note={selectedNote}

                    close={() =>
                        setSelectedNote(null)
                    }

                    refreshNotes={fetchNotes}
                />
            )}

        </div>
    );
};

export default NotesPage;