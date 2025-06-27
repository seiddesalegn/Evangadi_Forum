import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axiosInstance from "../../Axios";
import classes from "./Answer.module.css";
import ArrowCircleRightRoundedIcon from "@mui/icons-material/ArrowCircleRightRounded";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RubikLoader from "../Loader/Loader";

export default function Answer() {
  const { questionId } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [newAnswer, setNewAnswer] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editedContent, setEditedContent] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const [currentUser, setCurrentUser] = useState("");

  // 🔐 Decode token to extract current username
  useEffect(() => {
    if (!token) return;
    const tokenParts = token.split(".");
    if (tokenParts.length === 3) {
      try {
        const decoded = JSON.parse(atob(tokenParts[1]));
        setCurrentUser(decoded.username);
      } catch (e) {
        console.error("Failed to decode token");
      }
    }
  }, [token]);

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
      .catch(() => {
        setQuestion(null);
      })
      .finally(() => setLoading(false));
  }, [questionId, token]);

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
      .catch(() => {
        setAnswers([]);
      });
  }, [questionId, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!token) {
      setError("You must be logged in to submit an answer.");
      return;
    }

    try {
      const res = await axiosInstance.post(
        "/answer",
        { questionid: questionId, answer: newAnswer },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setAnswers((prev) => [
        {
          ...res.data,
          user_name: currentUser,
        },
        ...prev,
      ]);

      setNewAnswer("");
      setSuccess("Answer posted successfully!");
      setTimeout(() => setSuccess(""), 3000);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/answer/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAnswers((prev) => prev.filter((a) => a.answerid !== id));
    } catch (err) {
      alert("Failed to delete answer.");
    }
  };

  const startEdit = (id, content) => {
    setEditingId(id);
    setEditedContent(content);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditedContent("");
  };

  const saveEdit = async (id) => {
    try {
      await axiosInstance.put(
        `/answer/${id}`,
        { answer: editedContent },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setAnswers((prev) =>
        prev.map((a) =>
          a.answerid === id
            ? { ...a, answer: editedContent, user_name: currentUser }
            : a
        )
      );
      setEditingId(null);
      setEditedContent("");
    } catch (err) {
      alert("Failed to update answer.");
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
          <code className={classes.subtitle}>{question?.title}</code>
        </div>
        <p className={classes.body}>{question?.description}</p>
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
                  {editingId === ans.answerid ? (
                    <>
                      <textarea
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                        className={classes.textarea}
                      />
                      <div className={classes.actionButtons}>
                        <button
                          onClick={() => saveEdit(ans.answerid)}
                          className={classes.askbtn}
                        >
                          Save
                        </button>
                        <button onClick={cancelEdit} className={classes.askbtn}>
                          Cancel
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <p>{ans.answer || "No content."}</p>
                      {ans.user_name === currentUser && (
                        <div className={classes.actionButtons}>
                          <button
                            onClick={() => startEdit(ans.answerid, ans.answer)}
                            className={classes.iconBtn}
                            title="Edit"
                          >
                            <EditIcon />
                          </button>
                          <button
                            onClick={() => handleDelete(ans.answerid)}
                            className={`${classes.iconBtn} ${classes.delete}`}
                            title="Delete"
                          >
                            <DeleteIcon />
                          </button>
                        </div>
                      )}
                    </>
                  )}
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
