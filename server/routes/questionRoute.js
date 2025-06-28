const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

// question controllers import

const {
  getQuestions,
  getSingleQuestion,
  postQuestion,
} = require("../controller/questionController");

// get questions route

// public view
router.get("/all-questions", getQuestions);
router.get("/:question_id", getSingleQuestion);
// protected view
router.post("/", postQuestion);

module.exports = router;
