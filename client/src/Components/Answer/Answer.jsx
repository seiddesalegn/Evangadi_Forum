import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axiosInstance from "../../Axios";
import classes from "./Answer.module.css";
import ArrowCircleRightRoundedIcon from "@mui/icons-material/ArrowCircleRightRounded";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import RubikLoader from "../Loader/Loader";

export default function Answer() {
  const { questionId } = useParams();
  const navigate = useNavigate();

  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [newAnswer, setNewAnswer] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  // Fetch question
  useEffect(() => {
    if (!token) return;

    axiosInstance
      .get(`/question/${questionId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setQuestion(res.data.question);
      })
      .catch((err) => {
        // console.error("❌ Error fetching question:", err.message);
        setQuestion(null);
      })
      .finally(() => setLoading(false));
  }, [questionId]);

  // Fetch answers
  useEffect(() => {
    if (!token) return;

    axiosInstance
      .get(`/answer/${questionId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setAnswers(res.data.answers);
      })
      .catch((err) => {
        // console.error("❌ Error fetching answers:", err.message);
        setAnswers([]);
      });
  }, [questionId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!token) {
      setError("You must be logged in to submit an answer.");
      return;
    }

    try {
      await axiosInstance.post(
        "/answer",
        { questionid: questionId, answer: newAnswer },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAnswers((prev) => [
        {
          answerid: Date.now(),
          answer: newAnswer,
          user_name: "You",
          created_at: new Date().toISOString(),
        },
        ...prev,
      ]);
      navigate("/");

      setNewAnswer("");
      setSuccess("Answer posted successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit.");
    }
  };

  if (loading) return <RubikLoader />;

  return (
    <div className={classes.page}>
      {/* QUESTION */}
      <section className={classes.questionSection}>
        <Link to="/">
          <h2 className={classes.ribbon}>QUESTION</h2>
        </Link>
        <div className={classes.meta}>
          <span className={classes.arrowIcon}>
            <ArrowCircleRightRoundedIcon />
          </span>
          <code className={classes.subtitle}>{question.title}</code>
        </div>
        <p className={classes.body}>{question.description}</p>
      </section>

      {/* ANSWERS */}
      <section className={classes.answersSection}>
        <h3>Answers From The Community</h3>
        <hr />
        <div className={classes.answersList}>
          {answers.length === 0 ? (
            <p>No answers yet.</p>
          ) : (
            answers.map((ans) => (
              <div key={ans.answerid} className={classes.answerCard}>
                <div>
                  <div className={classes.avatarCircle}>
                    <AccountCircleIcon className={classes.avatarIcon} />
                  </div>
                  <strong>{ans.user_name || "Unknown user"}</strong>
                </div>

                <div className={classes.answerContent}>
                  <p>{ans.answer || "No content."}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* POST ANSWER FORM */}
      {token ? (
        <form onSubmit={handleSubmit} className={classes.postForm}>
          <textarea
            className={classes.textarea}
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
            placeholder="Your answer …"
            required
          />
          {error && <p className={classes.error}>{error}</p>}
          {success && <p className={classes.success}>{success}</p>}
          <button
            type="submit"
            className={classes.askbtn}
            disabled={!newAnswer.trim()}
          >
            Post Answer
          </button>
        </form>
      ) : (
        <p className={classes.error}>
          You must be logged in to post an answer.
        </p>
      )}
    </div>
  );
}
