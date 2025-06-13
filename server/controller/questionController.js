const db = require("../db/dbConfig");
const { StatusCodes } = require("http-status-codes");
const { v4: uuidv4 } = require("uuid");

// Get all questions
async function getQuestions(req, res) {
  try {
    const [rows] = await db.query(
      "SELECT * FROM questions ORDER BY created_at DESC"
    );
    console.log("✅ Questions fetched:", rows);

    if (rows.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: "Not Found",
        message: "No questions found.",
      });
    }

    return res.status(StatusCodes.OK).json({ questions: rows });
  } catch (error) {
    console.error(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
}

// Get single question by ID
async function getSingleQuestion(req, res) {
  const { question_id } = req.params;

  try {
    const [rows] = await db.query(
      "SELECT * FROM questions WHERE questionid = ?",
      [question_id]
    );

    if (rows.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: "Not Found",
        message: "The requested question could not be found.",
      });
    }

    return res.status(StatusCodes.OK).json({ question: rows[0] });
  } catch (error) {
    console.error(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
}

// Post a new question
async function postQuestion(req, res) {
  const { title, description } = req.body;
  const userid = req.user.userid;

  if (!title || !description) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: "Bad Request",
      message: "Please provide both title and description",
    });
  }

  const questionid = uuidv4();
  const tag = null;

  try {
    await db.query(
      "INSERT INTO questions (questionid, userid, title, description, tag) VALUES (?, ?, ?, ?, ?)",
      [questionid, userid, title, description, tag]
    );

    return res.status(StatusCodes.CREATED).json({
      message: "Question created successfully",
      questionid,
    });
  } catch (error) {
    console.error(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
}

module.exports = { getQuestions, getSingleQuestion, postQuestion };
