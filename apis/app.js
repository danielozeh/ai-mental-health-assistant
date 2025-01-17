require("dotenv").config();
const express = require("express");
const axios = require("axios");
const helmet = require("helmet");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
app.use(helmet());

// Mock Encryption (Use proper keys and algorithms in production)
const encrypt = (data) => Buffer.from(data).toString("base64");
const decrypt = (data) => Buffer.from(data, "base64").toString("utf-8");

// AI Integration Route
app.post("/api/chat", async (req, res) => {
    const { userMessage } = req.body;
    if (!userMessage) return res.status(400).send("Message is required.");

    try {
        const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-4",
                messages: [{ role: "user", content: userMessage }],
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                },
            }
        );

        const aiResponse = response.data.choices[0].message.content;

        // Encrypt AI response before sending
        res.json({ encryptedResponse: encrypt(aiResponse) });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Error communicating with AI.");
    }
});

// User Authentication (Example)
app.post("/api/login", (req, res) => {
    const { username } = req.body;
    if (!username) return res.status(400).send("Username is required.");

    const token = jwt.sign({ username }, process.env.JWT_SECRET, {
        expiresIn: "1h",
    });

    res.json({ token });
});

// Middleware to validate token
const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).send("Unauthorized.");

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch {
        res.status(401).send("Invalid token.");
    }
};

// Example secure route
app.get("/api/secure-data", authenticate, (req, res) => {
    res.json({ message: "This is secure data.", user: req.user });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
