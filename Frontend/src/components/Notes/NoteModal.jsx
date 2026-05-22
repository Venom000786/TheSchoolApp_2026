import { useState } from "react";

import axios from "axios";


function NoteModal({

    note,

    close,

    refreshNotes

}) {

    const [title,
    setTitle] = useState(
        note?.title || ""
    );

    const [content,
    setContent] = useState(
        note?.content || ""
    );

    const [loading,
    setLoading] = useState(false);


    const token =
    localStorage.getItem("token");



    // 💾 SAVE NOTE
    const saveNote =
    async () => {

        if (
            !title ||
            !content
        ) {

            alert(
                "Please fill all fields"
            );

            return;
        }

        try {

            setLoading(true);

            // ✨ CREATE
            if (!note?._id) {

                await axios.post(

                    "http://localhost:5000/api/notes",

                    {
                        title,
                        content
                    },

                    {
                        headers: {

                            Authorization:
                            `Bearer ${token}`
                        }
                    }
                );

            } else {

                // ✏️ UPDATE
                await axios.put(

                    `http://localhost:5000/api/notes/${note._id}`,

                    {
                        title,
                        content
                    },

                    {
                        headers: {

                            Authorization:
                            `Bearer ${token}`
                        }
                    }
                );
            }



            alert(
                "Note saved successfully"
            );

            refreshNotes();

            close();

        } catch (err) {

            console.log(err);

            alert(
                "Failed to save note"
            );

        } finally {

            setLoading(false);
        }
    };





    return (

        <div
            className="
                fixed
                inset-0
                bg-black/70
                flex
                items-center
                justify-center
                z-50
            "
        >

            <div
                className="
                    bg-gray-900
                    p-6
                    rounded-2xl
                    w-[500px]
                    border
                    border-white/10
                "
            >

                <h2
                    className="
                        text-2xl
                        font-bold
                        mb-4
                    "
                >
                    {note?._id
                        ? "Edit Note"
                        : "Add Note"}
                </h2>



                {/* Title */}
                <input

                    value={title}

                    onChange={(e) =>
                        setTitle(
                            e.target.value
                        )
                    }

                    placeholder="Note title"

                    className="
                        w-full
                        p-3
                        rounded-xl
                        bg-white/10
                        mb-4
                        outline-none
                    "
                />



                {/* Content */}
                <textarea

                    value={content}

                    onChange={(e) =>
                        setContent(
                            e.target.value
                        )
                    }

                    rows={8}

                    placeholder="Write note..."

                    className="
                        w-full
                        p-3
                        rounded-xl
                        bg-white/10
                        outline-none
                    "
                />



                {/* Buttons */}
                <div
                    className="
                        flex
                        justify-end
                        gap-3
                        mt-5
                    "
                >

                    <button

                        onClick={close}

                        className="
                            px-5
                            py-2
                            bg-gray-600
                            rounded-xl
                        "
                    >
                        Cancel
                    </button>



                    <button

                        onClick={saveNote}

                        disabled={loading}

                        className="
                            px-5
                            py-2
                            bg-blue-500
                            hover:bg-blue-600
                            rounded-xl
                        "
                    >
                        {loading
                            ? "Saving..."
                            : "Save"}
                    </button>

                </div>

            </div>

        </div>
    );
}

export default NoteModal;