const db = require("../db/dbConfig");
const { StatusCodes } = require("http-status-codes");

// GET /api/answer/:question_id
const getAnswersByQuestionId = async (req, res) => {
  const { question_id } = req.params;

  try {
    const [answers] = await db.query(
      `SELECT a.answerid, a.answer, u.username AS user_name, a.created_at
       FROM answers a
       JOIN users u ON a.userid = u.userid
       WHERE a.questionid = ?
       ORDER BY a.created_at DESC`,
      [question_id]
    );

    return res.status(StatusCodes.OK).json({ answers });
  } catch (error) {
    console.error(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
};

// POST /api/answer
const postAnswer = async (req, res) => {
  const { questionid, answer } = req.body;
  const userid = req.user?.userid;

  if (!questionid || !answer || !userid) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: "Bad Request",
      message: "Please provide all required fields.",
    });
  }

  try {
    await db.query(
      `INSERT INTO answers (questionid, userid, answer) VALUES (?, ?, ?)`,
      [questionid, userid, answer]
    );

    const [[newAnswer]] = await db.query(
      `SELECT a.answerid, a.answer, u.username AS user_name, a.created_at
       FROM answers a
       JOIN users u ON a.userid = u.userid
       WHERE a.questionid = ? AND a.userid = ?
       ORDER BY a.created_at DESC LIMIT 1`,
      [questionid, userid]
    );

    return res.status(StatusCodes.CREATED).json(newAnswer);
  } catch (error) {
    console.error(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
};

module.exports = { getAnswersByQuestionId, postAnswer };
