import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AskQuestion.css";
import axiosInstance from "../../Axios"; //pre-configured instance to make api request
import ArrowCircleRightRoundedIcon from '@mui/icons-material/ArrowCircleRightRounded';

function AskQuestion() {
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState(""); //stores the question detail & disc.
  const navigate = useNavigate(); //hook for navigating after form submission

  //form submission - prevent default page reload
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token"); //gets auth token from local storage

    try {//sends post request to question endpoint w/form data
      await axiosInstance.post(
        "question",
        {
          title,
          description: detail,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,//token auth header
          },
        }
      );
      //clears input field after successful submission
      setTitle("");
      setDetail("");
      navigate("/");//navigate bk to home
    } catch (err) { //logs error if api request fails 
      console.error("Error posting question:", err);
    }
  };

    //return to render the form UI
  return (
    <div className="ask-container">
      <div className="ask-wrapper">
        <h2 className="ask-title">
          <span className="title-highlight">Steps To Write A</span> Good
          Question.
        </h2>
        <ul className="ask-list">
          <li>
            {" "}
            <ArrowCircleRightRoundedIcon /> &nbsp; Summarize your problems in a
            one-line title.
          </li>
          <li>
            {" "}
            <ArrowCircleRightRoundedIcon /> &nbsp; Describe your problem in more
            detail.
          </li>
          <li>
            {" "}
            <ArrowCircleRightRoundedIcon /> &nbsp; Describe what you tried and
            what you expected to happen.
          </li>
          <li>
            {" "}
            <ArrowCircleRightRoundedIcon /> &nbsp; Review your question and post
            it here.
          </li>
        </ul>

        <h3 className="post-title">Post Your Question</h3>

        <form onSubmit={handleSubmit}>
          <input
            className="ask-input"
            type="text"
            placeholder="Question title"
            name="title"
            onChange={(e) => setTitle(e.target.value)}//gets input value from title 
          />
          <textarea
            className="ask-textarea"
            placeholder="Question detail ..."
            name="detail"
            onChange={(e) => setDetail(e.target.value)}//gets input value from description 
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
