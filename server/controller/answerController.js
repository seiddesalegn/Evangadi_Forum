const db = require("../db/dbConfig");
const { StatusCodes } = require("http-status-codes");

// Get all answers for a specific question
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
    // Something went wrong while fetching answers
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
};

// Post a new answer to a question
const postAnswer = async (req, res) => {
  const { questionid, answer } = req.body;
  const userid = req.user?.userid;

  // Check for missing fields
  if (!questionid || !answer || !userid) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: "Bad Request",
      message: "Please provide all required fields.",
    });
  }

  try {
    // Insert the answer into the database
    await db.query(
      `INSERT INTO answers (questionid, userid, answer) VALUES (?, ?, ?)`,
      [questionid, userid, answer]
    );

    // Retrieve the newly inserted answer
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
    // Something went wrong while saving the answer
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
};

// Update an existing answer (only by its owner)
const updateAnswer = async (req, res) => {
  const { answer_id } = req.params;
  const { answer } = req.body;
  const userid = req.user?.userid;

  if (!answer || !userid) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: "Bad Request",
      message: "Answer content is required.",
    });
  }

  try {
    // Update the answer if it belongs to the logged-in user
    const [result] = await db.query(
      "UPDATE answers SET answer = ? WHERE answerid = ? AND userid = ?",
      [answer, answer_id, userid]
    );

    // No match means the answer wasn't found or doesn't belong to the user
    if (result.affectedRows === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: "Not Found",
        message: "Answer not found or unauthorized.",
      });
    }

    return res.status(StatusCodes.OK).json({
      message: "Answer updated successfully.",
      answer: {
        answerid: parseInt(answer_id),
        answer,
        userid,
      },
    });
  } catch (error) {
    // Something went wrong during update
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
};

// Delete an answer (only by its owner)
const deleteAnswer = async (req, res) => {
  const { answer_id } = req.params;
  const userid = req.user?.userid;

  try {
    // Delete only if the answer belongs to the logged-in user
    const [result] = await db.query(
      "DELETE FROM answers WHERE answerid = ? AND userid = ?",
      [answer_id, userid]
    );

    if (result.affectedRows === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: "Not Found",
        message: "Answer not found or unauthorized.",
      });
    }

    return res.status(StatusCodes.OK).json({
      message: "Answer deleted successfully.",
      answerid: parseInt(answer_id),
      userid,
    });
  } catch (error) {
    // Something went wrong during deletion
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
};

module.exports = {
  getAnswersByQuestionId,
  postAnswer,
  updateAnswer,
  deleteAnswer,
};
