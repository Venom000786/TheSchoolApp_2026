import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BackgroundImage from "../../public/BackgroundLogin.png";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            const res = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/auth/login`,
                {
                    email,
                    password
                }
            );

            console.log(res.data);

            // Save token
            localStorage.setItem(
                "token",
                res.data.token
            );

            // Save user
            localStorage.setItem(
                "user",
                JSON.stringify(res.data.user)
            );

            // Save userId
            localStorage.setItem(
                "userId",
                res.data.user._id
            );

            // Save role
            localStorage.setItem(
                "role",
                res.data.user.role
            );

            alert("Login Successful");

            console.log("Navigating...");
            // Navigate by role
            if (res.data.user.role === "admin") {
                navigate("/admin");
            }

            else if (res.data.user.role === "teacher") {
                navigate("/teacher");
            }

            else if (res.data.user.role === "student") {
                navigate("/student");
            }

        } catch (err) {

            console.log(err);

            alert(
                err.response?.data?.message ||
                "Login failed"
            );
        }
    };

    return (
// for local host
        // <div className="flex flex-col justify-center items-center 
        // bg-[url(BackgroundLogin.png)] 
        // bg-cover bg-bottom-right w-full px-5">

        // for Live production level
            <div
                className="flex flex-col justify-center items-center w-full px-5 bg-cover bg-center min-h-screen"
                style={{
                    backgroundImage: `url(${BackgroundImage})`
                }}
            >
            {/* <div className="flex flex-col justify-center items-center bg-linear-to-r from-blue-900 to-blue-300 w-full px-5"> */}

            <div className="min-h-screen flex flex-col items-center justify-center text-white w-[50%] gap-15 ">

                <h1 className="text-2xl">Welcome to THE SCHOOL APP</h1>

                <form
                    onSubmit={handleLogin}
                    className="bg-white/30 p-10 rounded-3xl w-[400px] backdrop-blur-xl">

                    <h1 className="text-4xl mb-6 text-center">
                        Login
                    </h1>

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        className="w-full p-3 mb-4 rounded-xl bg-white/30"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        className="w-full p-3 mb-4 rounded-xl bg-white/30"
                    />

                    <button
                        type="submit"
                        className="w-full bg-blue-500 p-3 rounded-xl" >
                        Login
                    </button>


                </form>

                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl px-8 py-6 flex gap-10 text-white shadow-2xl">

                    <div className="flex flex-col items-center justify-center">
                        <h3 className="font-bold text-lg">🔒 Secure</h3>
                        <p className="text-sm text-white/70">
                            Your data is protected
                        </p>
                    </div>

                    <div className="flex flex-col items-center justify-center">
                        <h3 className="font-bold text-lg">⚡ Smart</h3>
                        <p className="text-sm text-white/70">
                            Manage everything easily
                        </p>
                    </div>

                    <div className="flex flex-col items-center justify-center">
                        <h3 className="font-bold text-lg">🚀 Simple</h3>
                        <p className="text-sm text-white/70">
                            Fast and modern UI
                        </p>
                    </div>

                </div>


            </div>



        </div>
    );
}


export default Login;