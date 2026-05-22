import { useEffect, useState } from "react";
import Socket from "../Socket";
import axios from "axios";

function Chat({ receiverId }) {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on("receiveMessage", (msg) => {
            setMessages((prev) => [...prev, msg]);
        });

        socket.on("newNotification", (data) => {
            alert(data.message);
        });

        return () => {
            socket.off("receiveMessage");
            socket.off("newNotification");
        };
    }, []);

    const sendMessage = () => {
        if (!message.trim()) return;

        socket.emit("sendMessage", {
            receiverId,
            message
        });

        setMessage("");
    };

    const sendFile = async (file) => {
        const formData = new FormData();
        formData.append("file", file);

        const res = await axios.post(
            "http://localhost:5000/api/chat/upload",
            formData,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            }
        );

        socket.emit("sendMessage", {
            receiverId,
            fileUrl: res.data.fileUrl,
            fileType: res.data.fileType
        });
    };

    return (
        <div style={{ padding: "20px" }}>
            <h3>Chat</h3>

            <div style={{ border: "1px solid #ccc", height: "200px", overflowY: "scroll" }}>
                {messages.map((m, i) => (
                    <p key={i}>
                        <b>{m.senderId}</b>: {m.message}
                    </p>
                ))}
            </div>

            <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type message..."
            />

            <button onClick={sendMessage}>Send</button>
        </div>
    );
}

export default Chat;