require("dotenv").config();

const Notification =
require("./src/models/notification");

const app =
require("./src/app");

const connectDB =
require("./src/config/db");

const http =
require("http");

const { Server } =
require("socket.io");

const jwt =
require("jsonwebtoken");

const Message =
require("./src/models/message");

require("./src/peerServer");


// ======================================
// CONNECT DATABASE
// ======================================
connectDB();


// ======================================
// CREATE HTTP SERVER
// ======================================
const server =
http.createServer(app);


// ======================================
// SOCKET.IO
// ======================================
const io = new Server(server, {

    cors: {

        origin: "*",

        methods: ["GET", "POST"]
    }
});


// ======================================
// SOCKET AUTH MIDDLEWARE
// ======================================
io.use((socket, next) => {

    try {

        const token =
        socket.handshake.auth.token;

        if (!token) {

            return next(
                new Error("No token")
            );
        }

        const decoded =
        jwt.verify(

            token,

            process.env.JWT_SECRET
        );

        socket.userId =
        decoded.id;

        next();

    } catch (err) {

        return next(
            new Error("Invalid token")
        );
    }
});


// ======================================
// SOCKET CONNECTION
// ======================================
io.on("connection", (socket) => {

    console.log(
        "User connected:",
        socket.userId
    );


    // personal room
    socket.join(
        socket.userId
    );



    // ==================================
    // JOIN CHAT ROOM
    // ==================================
    socket.on(

        "joinRoom",

        (roomId) => {

            socket.join(roomId);
        }
    );



    // ==================================
    // SEND MESSAGE
    // ==================================
    socket.on(

        "sendMessage",

        async (data) => {

            try {

                const {

                    receiverId,

                    groupId,

                    message,

                    fileUrl,

                    fileType

                } = data;


                const senderId =
                socket.userId;


                // save message
                const newMsg =
                await Message.create({

                    senderId,

                    receiverId,

                    groupId,

                    message,

                    fileUrl,

                    fileType
                });



                // ==========================
                // PERSONAL CHAT
                // ==========================
                if (receiverId) {

                    // save notification
                    await Notification.create({

                        userId:
                        receiverId,

                        title:
                        "New Message",

                        message:
                        "You received a new message"
                    });


                    // realtime notification
                    io.to(receiverId).emit(

                        "newNotification",

                        {

                            title:
                            "New Message",

                            message:
                            "You received a new message"
                        }
                    );


                    // realtime message
                    io.to(receiverId).emit(

                        "receiveMessage",

                        newMsg
                    );
                }



                // ==========================
                // GROUP CHAT
                // ==========================
                if (groupId) {

                    io.to(groupId).emit(

                        "receiveMessage",

                        newMsg
                    );
                }

            } catch (err) {

                console.log(
                    "Socket Message Error:",
                    err
                );
            }
        }
    );



    // ==================================
    // LIVE CLASS / VIDEO CALL
    // ==================================
    socket.on(

        "join-live-room",

        ({ roomId, peerId }) => {

            socket.join(roomId);

            console.log(

                `Peer ${peerId} joined room ${roomId}`
            );

            socket.to(roomId).emit(

                "user-connected",

                peerId
            );
        }
    );



    // ==================================
    // DISCONNECT
    // ==================================
    socket.on(

        "disconnect",

        () => {

            console.log(

                "User disconnected:",

                socket.userId
            );

            socket.broadcast.emit(

                "user-disconnected",

                socket.id
            );
        }
    );
});



// ======================================
// START SERVER
// ======================================
const PORT =
process.env.PORT || 5000;

server.listen(PORT, () => {

    console.log(

        `Server running on port ${PORT}`
    );
});