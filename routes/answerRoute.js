const express = require("express");
const router = express.Router();

// answer controller import

const { getAnswer, postAnswer } = require("../controller/answerController");

// register route
router.get("/:question_id", getAnswer);

// login route
router.post("/", postAnswer);

module.exports = router;
