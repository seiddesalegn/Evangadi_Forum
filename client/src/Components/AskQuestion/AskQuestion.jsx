import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AskQuestion.css";
import axiosInstance from "../../Axios";

function AskQuestion() {
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      await axiosInstance.post(
        "question",
        {
          title,
          description: detail,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Your question was posted!");
      setTitle("");
      setDetail("");
      navigate("/");
    } catch (err) {
      console.error("Error posting question:", err);
      alert("Failed to post question");
    }
  };

  return (
    <div className="ask-container">
      <div className="ask-wrapper">
        <h2 className="ask-title">
          <span className="title-highlight">Steps To Write A</span> Good
          Question.
        </h2>
        <ul className="ask-list">
          <li> Summarize your problems in a one-line title.</li>
          <li> Describe your problem in more detail.</li>
          <li> Describe what you tried and what you expected to happen.</li>
          <li> Review your question and post it here.</li>
        </ul>

        <h3 className="post-title">Post Your Question</h3>

        <form onSubmit={handleSubmit}>
          <input
            className="ask-input"
            type="text"
            placeholder="Question title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="ask-textarea"
            placeholder="Question detail ..."
            name="detail"
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
          ></textarea>

          <button type="submit" className="ask-button">
            Post Question
          </button>
        </form>
      </div>
    </div>
  );
}

export default AskQuestion;
