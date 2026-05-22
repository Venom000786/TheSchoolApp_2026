function MessageBubble({ msg }) {

    const myId =
    localStorage.getItem("userId");


    const isMe =
    msg.senderId === myId;



    return (

        <div
            className={`
                flex

                ${isMe
                    ? "justify-end"
                    : "justify-start"}
            `}
        >

            <div

                className={`
                    max-w-xs
                    p-3
                    rounded-2xl
                    glass

                    ${isMe

                    ? "bg-blue-500/30"

                    : "bg-white/10"}
                `}
            >

                {/* 💬 Text */}
                {msg.message && (

                    <p>
                        {msg.message}
                    </p>
                )}



                {/* 📎 File */}
                {msg.fileUrl && (

                    <a

                        href={msg.fileUrl}

                        target="_blank"

                        rel="noreferrer"

                        className="
                            text-blue-400
                            underline
                            block
                            mt-2
                        "
                    >
                        📎 Open File
                    </a>
                )}

            </div>

        </div>
    );
}

export default MessageBubble;