const express = require("express");
const router = express.Router();
const {
  getAnswersByQuestionId,
  postAnswer,
} = require("../controller/answerController");

const authMiddleware = require("../middleware/authMiddleware");

// Public: View answers for a question
router.get("/:question_id", getAnswersByQuestionId);

// Protected: Post an answer
router.post("/", authMiddleware, postAnswer);

module.exports = router;
