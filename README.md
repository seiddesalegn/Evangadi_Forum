# Evangadi Forum Project Documentation

# Project Overview

The **Evangadi Forum Q&A Platform** is a full-stack web application that enables users to post questions, answer them, and engage in community-based interactions. It features user authentication, a robust backend API, and a responsive frontend built using modern technologies.

---

## 1. Database Design & Configuration

### Database Engine

**Type:** MySQL  
**Database Name:** `evangadi_forum`

### Table Structures

#### `users` Table
```sql
CREATE TABLE IF NOT EXISTS users (
  userid INT(20) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(20) NOT NULL,
  firstname VARCHAR(20) NOT NULL,
  lastname VARCHAR(20) NOT NULL,
  email VARCHAR(40) NOT NULL,
  password VARCHAR(100) NOT NULL
);
🔹 questions Table
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
🔹 answers Table
CREATE TABLE IF NOT EXISTS answers (
  answerid INT(20) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  userid INT(20) NOT NULL,
  questionid VARCHAR(100) NOT NULL,
  answer VARCHAR(200) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(userid) REFERENCES users(userid),
  FOREIGN KEY(questionid) REFERENCES questions(questionid)
);

Table Creation Execution
await db.query(users);
await db.query(questions);
await db.query(answers);
res.send("All tables created successfully!");

## Configuration
Create a .env or config.js file for database and secret key storage:

USER=evangadi_admin (User name)
DATABASE=evangadi_db (Database name)
PASSWORD=Password
JWT_SECRET=jwt_secret_key
Never expose this file in public repositories.

** 2. API Development & Documentation
 Authentication Middleware
Endpoint: /api/checkUser
Function: Verifies JWT tokens
Success Response: 200 OK
Failure Response: 401 Unauthorized
Use HTTPS in production for security.


