import { useEffect, useState } from "react";
import axios from "axios";

function Users() {

    const [users, setUsers] = useState([]);

    const [search, setSearch] = useState("");

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role: "student"
    });

    const [editingId, setEditingId] = useState(null);

    const token = localStorage.getItem("token");



    // ================= FETCH USERS =================
    const fetchUsers = async () => {

        try {

            const res = await axios.get(
                // "http://localhost:5000/api/admin/users",
                `${import.meta.env.VITE_API_URL}/api/admin/users`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setUsers(res.data);

        } catch (err) {

            console.log(err);
        }
    };



    useEffect(() => {

        fetchUsers();

    }, []);




    // ================= CREATE / UPDATE =================
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            // UPDATE
            if (editingId) {

                await axios.put(

                    // `http://localhost:5000/api/admin/user/${editingId}`,
                    `${import.meta.env.VITE_API_URL}/api/admin/user/${editingId}`,

                    form,

                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                alert("User updated");

            } else {

                // CREATE
                await axios.post(

                    // "http://localhost:5000/api/admin/users",
                    `${import.meta.env.VITE_API_URL}/api/admin/users`,

                    form,

                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                alert("User created");
            }



            setForm({
                name: "",
                email: "",
                password: "",
                role: "student"
            });

            setEditingId(null);

            fetchUsers();

        } catch (err) {

            console.log(err);

            alert("Something went wrong");
        }
    };




    // ================= DELETE =================
    const deleteUser = async (id) => {

        try {

            await axios.delete(

                // `http://localhost:5000/api/admin/user/${id}`,
                `${import.meta.env.VITE_API_URL}/api/admin/user/${id}`,

                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            fetchUsers();

        } catch (err) {

            console.log(err);
        }
    };




    // ================= EDIT =================
    const editUser = (user) => {

        setEditingId(user._id);

        setForm({
            name: user.name,
            email: user.email,
            password: "",
            role: user.role
        });
    };




    // ================= SEARCH =================
    const searchUsers = async () => {

        try {

            const res = await axios.get(

                // `http://localhost:5000/api/admin/search?keyword=${search}`,
                `${import.meta.env.VITE_API_URL}/api/admin/search?keyword=${search}`,

                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setUsers(res.data);

        } catch (err) {

            console.log(err);
        }
    };




    return (

        <div className="min-h-screen bg-gray-900 text-white p-6">

            <h1 className="text-4xl font-bold mb-6">
                User Management
            </h1>



            {/* SEARCH */}
            <div className="flex gap-3 mb-6">

                <input
                    type="text"
                    placeholder="Search user..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                    className="p-3 rounded-xl bg-white/10 flex-1"
                />

                <button
                    onClick={searchUsers}
                    className="bg-blue-500 px-5 rounded-xl"
                >
                    Search
                </button>

                <button
                    onClick={fetchUsers}
                    className="bg-gray-700 px-5 rounded-xl"
                >
                    Reset
                </button>

            </div>





            {/* FORM */}
            <form
                onSubmit={handleSubmit}
                className="grid grid-cols-4 gap-4 mb-8"
            >

                <input
                    type="text"
                    placeholder="Name"
                    value={form.name}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            name: e.target.value
                        })
                    }
                    className="p-3 rounded-xl bg-white/10"
                    required
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            email: e.target.value
                        })
                    }
                    className="p-3 rounded-xl bg-white/10"
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            password: e.target.value
                        })
                    }
                    className="p-3 rounded-xl bg-white/10"
                />

                <select
                    value={form.role}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            role: e.target.value
                        })
                    }
                    className="p-3 rounded-xl bg-white/10"
                >
                    <option value="student">
                        Student
                    </option>

                    <option value="teacher">
                        Teacher
                    </option>

                    <option value="admin">
                        Admin
                    </option>

                </select>

                <button
                    type="submit"
                    className="bg-green-500 p-3 rounded-xl col-span-4"
                >
                    {editingId
                        ? "Update User"
                        : "Create User"}
                </button>

            </form>






            {/* USERS TABLE */}
            <div className="overflow-x-auto">

                <table className="w-full">

                    <thead>

                        <tr className="bg-white/10">

                            <th className="p-3 text-left">
                                Name
                            </th>

                            <th className="p-3 text-left">
                                Email
                            </th>

                            <th className="p-3 text-left">
                                Role
                            </th>

                            <th className="p-3 text-left">
                                Actions
                            </th>

                        </tr>

                    </thead>





                    <tbody>

                        {users.map((user) => (

                            <tr
                                key={user._id}
                                className="border-b border-white/10"
                            >

                                <td className="p-3">
                                    {user.name}
                                </td>

                                <td className="p-3">
                                    {user.email}
                                </td>

                                <td className="p-3">
                                    {user.role}
                                </td>

                                <td className="p-3 flex gap-3">

                                    <button
                                        onClick={() =>
                                            editUser(user)
                                        }
                                        className="bg-yellow-500 px-3 py-1 rounded-lg"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() =>
                                            deleteUser(user._id)
                                        }
                                        className="bg-red-500 px-3 py-1 rounded-lg"
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>
                        ))}

                    </tbody>

                </table>

            </div>

        </div>
    );
}

export default Users;