const express = require("express");
const router = express.Router();
const db = require("../db/dbConfig");

router.get("/create-table", async (req, res) => {
  try {
    const users = `
      CREATE TABLE IF NOT EXISTS users (
        userid INT(20) NOT NULL AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(20) NOT NULL,
        firstname VARCHAR(20) NOT NULL,
        lastname VARCHAR(20) NOT NULL,
        email VARCHAR(40) NOT NULL,
        password VARCHAR(100) NOT NULL
      );
    `;

    const questions = `
      CREATE TABLE IF NOT EXISTS questions (
        id INT(20) NOT NULL AUTO_INCREMENT PRIMARY KEY,
        questionid VARCHAR(100) NOT NULL UNIQUE,
        userid INT(20) NOT NULL,
        title VARCHAR(50) NOT NULL,
        description VARCHAR(200) NOT NULL,
        tag VARCHAR(20),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(userid) REFERENCES users(userid)
      );
    `;

    const answers = `
      CREATE TABLE IF NOT EXISTS answers (
        answerid INT(20) NOT NULL AUTO_INCREMENT PRIMARY KEY,
        userid INT(20) NOT NULL,
        questionid VARCHAR(100) NOT NULL,
        answer VARCHAR(200) NOT NULL,
        FOREIGN KEY(userid) REFERENCES users(userid),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(questionid) REFERENCES questions(questionid)
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
