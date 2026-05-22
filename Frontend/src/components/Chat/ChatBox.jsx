import { useEffect, useRef, useState } from "react";

import socket from "../../Socket";

import MessageBubble from "./MessageBubble";

import ChatInput from "./ChatInput";

import axios from "axios";

import FileUpload from "../common/FileUpload";


function ChatBox({

    receiverId,

    selectedUser

}) {

    const [messages, setMessages] = useState([]);

    const [fileUrl, setFileUrl] = useState("");

    const messagesEndRef = useRef(null);



    // Auto scroll to latest message
    useEffect(() => {

        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth"
        });

    }, [messages]);



    // Receive realtime messages
    useEffect(() => {

        socket.on("receiveMessage", (msg) => {

            setMessages((prev) => [

                ...prev,

                msg
            ]);
        });


        return () => {

            socket.off("receiveMessage");
        };

    }, []);





    // Fetch old messages
    useEffect(() => {

        const fetchMessages = async () => {

            try {

                const token =
                    localStorage.getItem("token");

                const user =
                    JSON.parse(
                        localStorage.getItem("user")
                    );

                const res = await axios.get(

                    `http://localhost:5000/api/chat/messages?senderId=${user._id}&receiverId=${receiverId}`,

                    {
                        headers: {

                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

                setMessages(res.data);

            } catch (err) {

                console.log(err);
            }
        };



        if (receiverId) {

            fetchMessages();
        }

    }, [receiverId]);



    // Add instant message to UI
    useEffect(() => {

        window.addMessageToChat =
            (msg) => {

                setMessages((prev) => [
                    ...prev,
                    msg
                ]);
            };

        return () => {

            delete window.addMessageToChat;
        };

    }, []);




    return (

        <div className="flex flex-col h-screen">






            {/* Messages Area */}
            <div
                className="
        flex-1
        overflow-y-auto
        px-4
        pt-28
        pb-4
        space-y-3
        bg-gray-950
    "
            >

                {messages.map((msg, i) => (

                    <MessageBubble
                        key={i}
                        msg={msg}
                    />
                ))}

                {/* Auto Scroll Ref */}
                <div ref={messagesEndRef} />

            </div>





            {/* Bottom Section */}
            <div
                // className="
                //     border-t
                //     border-white/10
                //     bg-gray-900
                //     p-2
                // "
            >

                {/* File Upload */}
                {/* <div className="mb-2">

                    <FileUpload

                        onUpload={(url) => {

                            setFileUrl(url);
                        }}
                    />

                </div> */}



                {/* Chat Input */}
                <ChatInput

                    receiverId={receiverId}

                    fileUrl={fileUrl}

                    clearFile={() =>
                        setFileUrl("")
                    }
                />

            </div>

        </div>
    );
}

export default ChatBox;