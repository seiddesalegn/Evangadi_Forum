const express = require("express");
const router = express.Router();

// question controllers import

const {
  getQuestions,
  getSingleQuestion,
  postQuestion,
} = require("../controller/questionController");

// get questions route
router.get("/all-questions", getQuestions);
router.get("/:question_id", getSingleQuestion);
router.post("/", postQuestion);

module.exports = router;
