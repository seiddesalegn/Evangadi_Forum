import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import classes from "./Home.module.css";
import { QuestionContext } from "../AskQuestion/QuestionContext";
import { jwtDecode } from "jwt-decode";
import PersonIcon from "@mui/icons-material/Person";

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
        <p>Welcome {user?.username || "Guest"}</p>
      </div>

      <section>
        <h3>Questions from the Community</h3>
        <hr />
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
