import { useState } from "react";
import axios from "axios";

function NoteForm({ note, close }) {
    const [title, setTitle] = useState(note.title || "");
    const [content, setContent] = useState(note.content || "");
    const [color, setColor] = useState(note.color || "#ffffff22");

    const token = localStorage.getItem("token");

    const saveNote = async () => {
        if (note._id) {
            // update
            await axios.put(
                `http://localhost:5000/api/notes/${note._id}`,
                { title, content, color },
                { headers: { Authorization: `Bearer ${token}` } }
            );
        } else {
            // create
            await axios.post(
                "http://localhost:5000/api/notes",
                { title, content, color },
                { headers: { Authorization: `Bearer ${token}` } }
            );
        }

        close();
        window.location.reload(); // simple refresh (later optimize)
    };

    const deleteNote = async () => {
        await axios.delete(
            `http://localhost:5000/api/notes/${note._id}`,
            { headers: { Authorization: `Bearer ${token}` } }
        );

        close();
        window.location.reload();
    };

    return (
        <div>
            <input
                className="w-full mb-2 p-2 bg-white/10"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
            />

            <textarea
                className="w-full mb-2 p-2 bg-white/10"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Content"
            />

            <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
            />

            <div className="flex justify-between mt-4">
                <button onClick={saveNote} className="bg-green-500 px-3 py-1">
                    Save
                </button>

                {note._id && (
                    <button onClick={deleteNote} className="bg-red-500 px-3 py-1">
                        Delete
                    </button>
                )}
            </div>
        </div>
    );
}

export default NoteForm;