import { useState } from "react";

import socket from "../../Socket";

import axios from "axios";


function ChatInput({

    receiverId

}) {

    const [message,
    setMessage] = useState("");

    const [fileUrl,
    setFileUrl] = useState("");

    const [fileType,
    setFileType] = useState("");

    const [loading,
    setLoading] = useState(false);


    const token =
    localStorage.getItem("token");



    // 📤 SEND MESSAGE
    const sendMessage = () => {

    if (
        !message.trim() &&
        !fileUrl
    ) return;

    const newMessage = {

        senderId: localStorage.getItem("userId"),

        receiverId,

        message,

        fileUrl,

        fileType
    };

    // 🚀 Emit socket event
    socket.emit(
        "sendMessage",
        newMessage
    );

    // ✅ Add instantly to UI
    if (window.addMessageToChat) {

        window.addMessageToChat(
            newMessage
        );
    }

    setMessage("");
    setFileUrl("");
    setFileType("");
};



    // 📎 FILE UPLOAD
    const handleFile =
    async (e) => {

        try {

            const file =
            e.target.files[0];

            if (!file) return;


            setLoading(true);


            const formData =
            new FormData();

            formData.append(
                "file",
                file
            );


            const res =
            await axios.post(

                "http://localhost:5000/api/chat/upload",

                formData,

                {
                    headers: {

                        Authorization:
                        `Bearer ${token}`,

                        "Content-Type":
                        "multipart/form-data"
                    }
                }
            );


            setFileUrl(
                res.data.fileUrl
            );


            setFileType(
                res.data.fileType
            );

        } catch (err) {

            console.log(err);

        } finally {

            setLoading(false);
        }
    };



    return (

        <div
            className="
                p-4
                border-t
                border-white/10
                flex
                gap-3
                items-center
            "
        >

            {/* 💬 Message Input */}
            <input

                className="
                    flex-1
                    p-3
                    rounded-xl
                    bg-white/10
                    outline-none
                "

                value={message}

                onChange={(e) =>
                    setMessage(
                        e.target.value
                    )
                }

                placeholder="Type a message..."
            />


            {/* 📎 File Upload */}
            {/* 📎 FILE INPUT HIDDEN */}
<input

    type="file"

    id="chat-file"

    className="hidden"

    onChange={handleFile}
/>

{/* 📎 ICON BUTTON */}
{!fileUrl && !loading && (

    <label

        htmlFor="chat-file"

        className="
            w-12
            h-12
            flex
            items-center
            justify-center
            rounded-xl
            bg-white/10
            hover:bg-white/20
            cursor-pointer
            transition
            text-2xl
        "
    >
        📎
    </label>
)}

{/* ⏳ Uploading */}
{loading && (

    <div
        className="
            px-4
            py-3
            rounded-xl
            bg-white/10
            text-sm
            text-gray-300
        "
    >
        
    </div>
)}

{/* ✅ Uploaded */}
{fileUrl && (

    <div
        className="
            px-4
            py-3
            rounded-xl
            bg-green-500/20
            text-green-400
            text-sm
            flex
            items-center
            gap-2
        "
    >
        ✅ File Ready
    </div>
)}


            {/* ⏳ Uploading */}
            {loading && (

                <p>
                    Uploading...
                </p>
            )}


            {/* ✅ Uploaded */}
            {fileUrl && (

                <p className="text-green-400">
                    File Ready
                </p>
            )}


            {/* 🚀 Send */}
            <button

                onClick={sendMessage}

                className="
                    px-5
                    py-3
                    bg-blue-500
                    hover:bg-blue-600
                    rounded-xl
                "
            >
                Send
            </button>

        </div>
    );
}

export default ChatInput;