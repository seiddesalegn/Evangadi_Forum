function getQuestion(req, res) {
  res.send("question");
}
function postQuestion(req, res) {
  res.send("Question created successfully");
}

module.exports = { getQuestion, postQuestion };
