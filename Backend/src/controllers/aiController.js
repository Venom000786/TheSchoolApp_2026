const OpenAI = require("openai");

const client = new OpenAI({

    apiKey: process.env.GROQ_API_KEY,

    baseURL: "https://api.groq.com/openai/v1"
});


// ASK AI
exports.askAI = async (req, res) => {

    try {

        const { question } = req.body;

        if (!question) {

            return res.status(400).json({
                message: "Question is required"
            });
        }

        // AI RESPONSE
        const completion =
        await client.chat.completions.create({

            model: "llama-3.3-70b-versatile",

            messages: [
                {
                    role: "user",
                    content: question
                }
            ]
        });

        const answer =
        completion.choices[0]
        .message.content;

        res.json({
            answer
        });

    } catch (err) {

        console.log(
            "AI ERROR:",
            err
        );

        res.json({
            answer:
            "AI service temporarily unavailable."
        });
    }
};