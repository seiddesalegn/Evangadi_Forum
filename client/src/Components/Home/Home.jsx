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
        <p >
          Welcome:  <span className={classes.usernameRed}>
            {user?.username || "Guest"}
          </span>
        </p>
      </div>

      <section>
        <hr />
        <div className={classes.questioncards}>
        {questions && questions.length > 0 ? (
          questions.map((q) => (
            <Link to={`/answers/${q.questionid}`} key={q.questionid}>
              <div className={classes.askpara}>
                <div className={classes.userBlock}>
                  <div className={classes.avatarSection}>
                    <div className={classes.avatarCircle}>
                      <AccountCircleIcon className={classes.avatarIcon} />
                    </div>
                    <div className={classes.askerName}>{q.username}</div>
                  </div>
                  <div className={classes.questionContent}>
                    <div className={classes.questionTitle}>{q.title}</div>
                  </div>
                </div>
                <button>&#62;</button>
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
