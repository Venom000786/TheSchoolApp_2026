import { useEffect, useRef, useState } from "react";
import Peer from "peerjs";
import io from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:5000", {
    auth: {
        token: localStorage.getItem("token")
    }
});

function LiveClassPage() {

    const [roomId, setRoomId] = useState("");

    const [classes, setClasses] = useState([]);

    const [selectedClass, setSelectedClass] = useState("");

    const [joined, setJoined] = useState(false);

    const [loading, setLoading] = useState(true);

    const myVideoRef = useRef(null);

    const remoteVideoRef = useRef(null);

    const peerRef = useRef(null);

    const streamRef = useRef(null);

    const token =
        localStorage.getItem("token");

    const user =
        JSON.parse(
            localStorage.getItem("user")
        );

    // ====================================
    // FETCH CLASSES
    // ====================================

    const fetchClasses = async () => {

        try {

            // 👨‍🎓 STUDENT
            if (user?.role === "student") {

                const res =
                    await axios.get(

                        "http://localhost:5000/api/classes/student/my",

                        {
                            headers: {
                                Authorization:
                                    `Bearer ${token}`
                            }
                        }
                    );

                if (res.data) {

                    setClasses([
                        res.data
                    ]);

                    setSelectedClass(
                        res.data.className
                    );

                    setRoomId(
                        res.data.className
                    );
                }

            } else {

                // 👨‍🏫 TEACHER / 👑 ADMIN

                const res =
                    await axios.get(

                        "http://localhost:5000/api/classes",

                        {
                            headers: {
                                Authorization:
                                    `Bearer ${token}`
                            }
                        }
                    );

                setClasses(
                    res.data || []
                );
            }

        } catch (err) {

            console.log(err);

        } finally {

            setLoading(false);
        }
    };

    useEffect(() => {

        fetchClasses();

    }, []);

    // ====================================
    // JOIN LIVE CLASS
    // ====================================

    const joinClass = async () => {

        if (!selectedClass) {

            return alert(
                "Please select class"
            );
        }

        try {

            const stream =
                await navigator.mediaDevices.getUserMedia({

                    video: true,

                    audio: true
                });

            streamRef.current =
                stream;

            // SHOW MY VIDEO
            if (myVideoRef.current) {

                myVideoRef.current.srcObject =
                    stream;

                await myVideoRef.current.play();
            }

            // CREATE PEER
            const peer =
                new Peer(undefined, {

                    host: "localhost",

                    port: 9000,

                    path: "/peerjs"
                });

            peerRef.current =
                peer;

            // PEER READY
            peer.on(
                "open",
                (peerId) => {

                    socket.emit(

                        "join-live-room",

                        {
                            roomId:
                                selectedClass,

                            peerId
                        }
                    );
                }
            );

            // NEW USER CONNECTED
            socket.on(

                "user-connected",

                (peerId) => {

                    const call =
                        peer.call(
                            peerId,
                            stream
                        );

                    call.on(

                        "stream",

                        async (
                            remoteStream
                        ) => {

                            if (
                                remoteVideoRef.current &&
                                !remoteVideoRef.current.srcObject
                            ) {

                                remoteVideoRef.current.srcObject =
                                    remoteStream;

                                try {

                                    await remoteVideoRef.current.play();

                                } catch (err) {

                                    console.log(err);
                                }
                            }
                        }
                    );
                }
            );

            // RECEIVE CALL
            peer.on(
                "call",
                (call) => {

                    call.answer(stream);

                    call.on(

                        "stream",

                        async (
                            remoteStream
                        ) => {

                            if (
                                remoteVideoRef.current &&
                                !remoteVideoRef.current.srcObject
                            ) {

                                remoteVideoRef.current.srcObject =
                                    remoteStream;

                                try {

                                    await remoteVideoRef.current.play();

                                } catch (err) {

                                    console.log(err);
                                }
                            }
                        }
                    );
                }
            );

            setJoined(true);

        } catch (err) {

            console.log(err);

            alert(
                "Camera/Microphone permission denied"
            );
        }
    };

    // ====================================
    // CLEANUP
    // ====================================

    useEffect(() => {

        return () => {

            socket.off(
                "user-connected"
            );

            if (
                streamRef.current
            ) {

                streamRef.current
                    .getTracks()
                    .forEach(
                        (track) =>
                            track.stop()
                    );
            }
        };

    }, []);

    if (loading) {

        return (

            <div
                className="
                    min-h-screen
                    bg-black
                    text-white
                    flex
                    items-center
                    justify-center
                    text-3xl
                    font-bold
                "
            >
                Loading...
            </div>
        );
    }

    return (

        <div
            className="
                bg-black
                min-h-screen
                text-white
                p-6
            "
        >

            {/* HEADER */}
            <div
                className="
                    flex
                    flex-col
                    lg:flex-row
                    lg:items-center
                    lg:justify-between
                    gap-5
                    mb-10
                "
            >

                <div>

                    <h1
                        className="
                            text-5xl
                            font-bold
                            mb-2
                        "
                    >
                        Live Class
                    </h1>

                    <p className="text-gray-400">

                        {
                            user?.role === "student"

                            ? "Join your class live session"

                            : "Select any class to start live class"
                        }

                    </p>

                </div>

                {/* SELECT CLASS */}

                <div
                    className="
                        flex
                        gap-4
                        flex-wrap
                    "
                >

                    {/* STUDENT */}
                    {
                        user?.role === "student"

                        ? (

                            <div
                                className="
                                    px-6
                                    py-4
                                    rounded-2xl
                                    bg-white/10
                                    text-lg
                                    font-semibold
                                "
                            >
                                {selectedClass}
                            </div>
                        )

                        : (

                            <select

                                value={selectedClass}

                                onChange={(e) => {

                                    setSelectedClass(
                                        e.target.value
                                    );

                                    setRoomId(
                                        e.target.value
                                    );
                                }}

                                className="
                                    bg-[#1e293b]
                                    border
                                    border-white/10
                                    rounded-2xl
                                    px-5
                                    py-4
                                    outline-none
                                    min-w-[250px]
                                "
                            >

                                <option value="">
                                    Select Class
                                </option>

                                {classes.map((c) => (

                                    <option
                                        key={c._id}
                                        value={c.className}
                                    >
                                        {c.className}
                                    </option>
                                ))}

                            </select>
                        )
                    }

                    {/* JOIN BUTTON */}

                    {
                        !joined && (

                            <button

                                onClick={joinClass}

                                className="
                                    bg-blue-600
                                    hover:bg-blue-700
                                    px-8
                                    py-4
                                    rounded-2xl
                                    font-bold
                                    transition
                                "
                            >
                                Join Class
                            </button>
                        )
                    }

                </div>

            </div>

            {/* VIDEOS */}

            <div
                className="
                    flex
                    gap-8
                    flex-wrap
                "
            >

                {/* MY VIDEO */}

                <div>

                    <h2
                        className="
                            mb-3
                            text-xl
                            font-semibold
                        "
                    >
                        You
                    </h2>

                    <video

                        ref={myVideoRef}

                        autoPlay

                        muted

                        playsInline

                        className="
                            w-[500px]
                            h-[350px]
                            bg-gray-900
                            rounded-2xl
                            object-cover
                        "
                    />

                </div>

                {/* REMOTE VIDEO */}

                <div>

                    <h2
                        className="
                            mb-3
                            text-xl
                            font-semibold
                        "
                    >
                        Other User
                    </h2>

                    <video

                        ref={remoteVideoRef}

                        autoPlay

                        playsInline

                        className="
                            w-[500px]
                            h-[350px]
                            bg-gray-900
                            rounded-2xl
                            object-cover
                        "
                    />

                </div>

            </div>

        </div>
    );
}

export default LiveClassPage;