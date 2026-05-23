import { useEffect, useState } from "react";
import axios from "axios";
import ChatBox from "../components/Chat/ChatBox";

const ChatPage = () => {

    const [users, setUsers] = useState([]);

    const [filteredUsers, setFilteredUsers] = useState([]);

    const [selectedUser, setSelectedUser] = useState(null);

    const [search, setSearch] = useState("");





    useEffect(() => {

        const fetchUsers = async () => {

            try {

                const token =
                    localStorage.getItem("token");

                const currentUser =
                    JSON.parse(
                        localStorage.getItem("user")
                    );

                const res = await axios.get(

                    // "http://localhost:5000/api/admin/users",
                    `${import.meta.env.VITE_API_URL}/api/admin/users`,

                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );





                // REMOVE LOGGED-IN USER
                const otherUsers =
                    (res.data || []).filter(

                        (user) =>
                            user._id !== currentUser?._id
                    );

                setUsers(otherUsers);

                setFilteredUsers(otherUsers);

            } catch (err) {

                console.log(err);
            }
        };

        fetchUsers();

    }, []);





    // SEARCH USERS
    useEffect(() => {

        if (!search.trim()) {

            setFilteredUsers(users);

            return;
        }

        const filtered =
            users.filter((user) =>

                user?.name
                    ?.toLowerCase()
                    .includes(
                        search.toLowerCase()
                    )
            );

        setFilteredUsers(filtered);

    }, [search, users]);





    return (

        <div className="h-screen flex bg-gray-900 text-white overflow-hidden">

            {/* SIDEBAR */}
            <div
                className="
                    w-full
                    md:w-1/4
                    border-r
                    border-white/10
                    flex
                    flex-col
                    bg-[#111827]
                "
            >

                {/* HEADER */}
                <div className="p-4 border-b border-white/10">

                    <h2 className="text-3xl font-bold mb-4">
                        Chats
                    </h2>





                    {/* SEARCH BAR */}
                    <input

                        type="text"

                        placeholder="Search users..."

                        value={search}

                        onChange={(e) =>
                            setSearch(
                                e.target.value
                            )
                        }

                        className="
                            w-full
                            bg-white/5
                            border
                            border-white/10
                            rounded-2xl
                            p-4
                            outline-none
                            focus:border-blue-500
                        "
                    />

                </div>





                {/* USERS LIST */}
                <div
                    className="
                        flex-1
                        overflow-y-auto
                        p-4
                    "
                >

                    {filteredUsers.length === 0 ? (

                        <div
                            className="
                                text-center
                                text-gray-400
                                mt-10
                            "
                        >
                            No users found
                        </div>

                    ) : (

                        filteredUsers.map((user) => (

                            <div

                                key={user._id}

                                onClick={() =>
                                    setSelectedUser(user)
                                }

                                className={`
                                    p-4
                                    mb-3
                                    rounded-2xl
                                    cursor-pointer
                                    transition
                                    border
                                    border-white/10

                                    ${
                                        selectedUser?._id === user._id

                                            ? "bg-blue-500"

                                            : "bg-white/10 hover:bg-white/20"
                                    }
                                `}
                            >

                                <h3 className="font-semibold text-lg">
                                    {user.name}
                                </h3>

                                <p className="text-sm text-gray-300">
                                    {user.role}
                                </p>

                            </div>
                        ))
                    )}

                </div>

            </div>





            {/* CHAT AREA */}
            <div className="flex-1 flex flex-col overflow-hidden">

                {selectedUser ? (

                    <>

                        {/* CHAT HEADER */}
                        <div
                            className="
                                p-4
                                border-b
                                border-white/10
                                bg-black/20
                            "
                        >

                            <h2 className="text-2xl font-bold">
                                Chat with {selectedUser.name}
                            </h2>

                            <p className="text-gray-400">
                                {selectedUser.role}
                            </p>

                        </div>





                        {/* CHATBOX */}
                        <div className="flex-1 overflow-hidden">

                            <ChatBox
                                receiverId={selectedUser._id}
                                selectedUser={selectedUser}
                            />

                        </div>

                    </>

                ) : (

                    <div
                        className="
                            flex
                            items-center
                            justify-center
                            h-full
                            text-gray-400
                            text-2xl
                        "
                    >
                        Select a user to start chatting
                    </div>
                )}

            </div>

        </div>
    );
};

export default ChatPage;