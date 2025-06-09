const express = require("express");
const router = express.Router();

// question controllers import

const {
  getQuestion,
  postQuestion,
} = require("../controller/questionController");

// question route
router.get("/:question_id", getQuestion);

router.post("/", postQuestion);

module.exports = router;
