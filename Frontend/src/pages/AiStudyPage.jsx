import { useState }
from "react";

import axios from "axios";



function AiStudyPage() {

    // 🧠 User input
    const [question,
    setQuestion] = useState("");



    // 🤖 AI response
    const [answer,
    setAnswer] = useState("");



    // ⏳ Loading
    const [loading,
    setLoading] = useState(false);




    // 🚀 Ask AI
    const askAI =
    async () => {

        // ❌ Empty question
        if (!question.trim()) return;



        try {

            setLoading(true);



            const token =
            localStorage.getItem(
                "token"
            );



            // 📡 API request
            const res =
            await axios.post(

                // "http://localhost:5000/api/ai/ask",
                `${import.meta.env.VITE_API_URL}/api/ai/ask`,

                {
                    question
                },

                {
                    headers: {

                        Authorization:
                        `Bearer ${token}`
                    }
                }
            );



            // 📝 Save answer
            setAnswer(
                res.data.answer
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
                min-h-screen
                bg-gray-950
                text-white
                p-6
            "
        >

            {/* 🧠 Heading */}
            <h1
                className="
                    text-4xl
                    font-bold
                    mb-8
                "
            >
                AI Study Assistant
            </h1>




            {/* ✍️ Question Box */}
            <div
                className="
                    glass
                    p-6
                    rounded-3xl
                    border
                    border-white/10
                "
            >

                <textarea

                    value={question}

                    onChange={(e) =>
                        setQuestion(
                            e.target.value
                        )
                    }

                    placeholder="
                        Ask anything...
                    "

                    className="
                        w-full
                        h-40
                        bg-transparent
                        outline-none
                        text-lg
                        resize-none
                    "
                />



                <button

                    onClick={askAI}

                    className="
                        mt-4
                        px-6
                        py-3
                        rounded-2xl
                        bg-blue-500
                        hover:bg-blue-600
                        transition
                    "
                >

                    {loading

                        ? "Thinking..."

                        : "Ask AI"}
                </button>

            </div>




            {/* 🤖 AI Response */}
            {answer && (

                <div
                    className="
                        mt-8
                        glass
                        p-6
                        rounded-3xl
                        border
                        border-white/10
                        whitespace-pre-wrap
                    "
                >

                    <h2
                        className="
                            text-2xl
                            font-semibold
                            mb-4
                        "
                    >
                        AI Answer
                    </h2>

                    <p
                        className="
                            leading-8
                            text-gray-200
                        "
                    >
                        {answer}
                    </p>

                </div>
            )}

        </div>
    );
}

export default AiStudyPage;