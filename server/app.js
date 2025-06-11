require("dotenv").config();
const express = require("express");
const app = express();
const port = 5500;

// Parse JSON body
app.use(express.json());

// DB connection
const db = require("./db/dbConfig.js");

// Route imports
const createTableRoute = require("./routes/tableCreator.js");
const userRoutes = require("./routes/userRoute.js");
const questionRoutes = require("./routes/questionRoute.js");
const answerRoutes = require("./routes/answerRoute.js");

// auth middleware import

const authMiddleware = require("./middleware/authMiddleware");

// Use routes (middleware)
app.use("/", createTableRoute);
app.use("/api/user", userRoutes);
app.use("/api/question", authMiddleware, questionRoutes);
app.use("/api/answer", authMiddleware, answerRoutes);

// Start function
async function start() {
  try {
    const [result] = await db.execute("SELECT 'test'");
    console.log("DB connected:", result);

    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("DB Connection Failed:", error.message);
  }
}

start();
