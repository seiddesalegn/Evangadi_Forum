const express = require("express");
const router = express.Router();
const db = require("../db/dbConfig");

router.get("/create-table", async (req, res) => {
  try {
    const users = `
      CREATE TABLE IF NOT EXISTS users (
        userId INT AUTO_INCREMENT PRIMARY KEY,
        userName VARCHAR(20) NOT NULL,
        firstName VARCHAR(20) NOT NULL,
        lastName VARCHAR(20) NOT NULL,
        email VARCHAR(40) NOT NULL,
        password VARCHAR(100) NOT NULL
      );
    `;

    const questions = `
      CREATE TABLE IF NOT EXISTS questions (
        id INT AUTO_INCREMENT,
        questionId VARCHAR(100) NOT NULL UNIQUE,
        userId INT NOT NULL,
        title VARCHAR(50) NOT NULL,
        tag VARCHAR(40),
        description VARCHAR(200) NOT NULL,
        PRIMARY KEY(id, questionId),
        FOREIGN KEY(userId) REFERENCES users(userId)
      );
    `;

    const answers = `
      CREATE TABLE IF NOT EXISTS answers (
        answereid INT AUTO_INCREMENT PRIMARY KEY,
        questionId VARCHAR(100) NOT NULL,
        userId INT NOT NULL,
        answere VARCHAR(200) NOT NULL,
        FOREIGN KEY(userId) REFERENCES users(userId),
        FOREIGN KEY(questionId) REFERENCES questions(questionId)
      );
    `;

    await db.query(users);
    await db.query(questions);
    await db.query(answers);

    res.send("All tables created successfully!");
  } catch (error) {
    console.error("Error creating tables:", error);
    res.status(500).send("Table creation failed.");
  }
});

module.exports = router;
