function getAnswer(req, res) {
  res.send("answer");
}
function postAnswer(req, res) {
  res.send("Answer posted successfully");
}

module.exports = { getAnswer, postAnswer };
