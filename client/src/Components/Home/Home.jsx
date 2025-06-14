import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import classes from "./Home.module.css";
import { QuestionContext } from "../AskQuestion/QuestionContext";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { jwtDecode } from "jwt-decode";

function Home() {
  const [user, setUser] = useState({});
  const { questions } = useContext(QuestionContext);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token && typeof token === "string") {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (error) {
        console.error("Invalid token:", error.message);
        localStorage.removeItem("token");
      }
    }
  }, []);

  return (
    <div className={classes.homeContainer}>
      <div className={classes.welcome}>
        <Link to="/Askquestion" className={classes.askbtn}>
          Ask Question
        </Link>
<<<<<<< HEAD
        <p>Welcome: {user?.username || "Guest"}</p>
=======
        <p>Welcome {user?.username || "Guest"}</p>
>>>>>>> 85f4d2c48e6b5e41604a0fd9ada9f29967cdad01
      </div>

      <section>
        <h3>Questions from the Community</h3>
        <hr />
<<<<<<< HEAD
        {questions && questions.length > 0 ? (
          questions.map((q) => (
            <Link to={`/answers/${q.questionid}`} key={q.questionid}>
              <div className={classes.askpara}>
                <div className={classes.userBlock}>
                  <div className={classes.avatarSection}>
                    <AccountCircleIcon className={classes.avatarIcon} />
                    <div className={classes.askerName}>{q.username}</div>
                  </div>
                  <div className={classes.questionContent}>
                    <div className={classes.questionTitle}>{q.title}</div>
                  </div>
=======
        <div className={classes.wrapQuestion}>
          {questions && questions.length > 0 ? (
            questions.map((q) => (
              <Link to={`/answers/${q.questionid}`} key={q.questionid}>
                <div className={classes.askpara}>
                  <div className={classes.userBox}>
                    <PersonIcon />
                    <p className={classes.username}>
                      {q.username || "Unknown"}
                    </p>
                  </div>
                  <span className={classes.questionTitle}>{q.title}</span>
                  <button> &#62; </button>
>>>>>>> 85f4d2c48e6b5e41604a0fd9ada9f29967cdad01
                </div>
              </Link>
            ))
          ) : (
            <p>No questions posted yet.</p>
          )}
        </div>
      </section>
    </div>
  );
}

export default Home;
