const express = require("express");
const router = express.Router();
const {
  getAnswersByQuestionId,
  postAnswer, updateAnswer,deleteAnswer,
} = require("../controller/answerController");

const authMiddleware = require("../middleware/authMiddleware");

// Public: View answers for a question
router.get("/:question_id", getAnswersByQuestionId);

// Protected: Post an answer
router.post("/", authMiddleware, postAnswer);

//  Protected: Update an answer
router.put("/:answer_id", authMiddleware, updateAnswer);

// Protected: Delete an answer
router.delete("/:answer_id", authMiddleware, deleteAnswer);


module.exports = router;
