import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import classes from "./Home.module.css";
import { QuestionContext } from "../AskQuestion/QuestionContext";
import { jwtDecode } from "jwt-decode";

function Home() {
  const [user, setUser] = useState([]);
  const { questions } = useContext(QuestionContext);
  console.log(questions);

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
        <p>Welcome {user?.username}</p>
      </div>

      <section>
        <h3>Questions from the Community</h3>
        <hr />
        {questions && questions.length > 0 ? (
          questions.map((q) => (
            <Link to={`/answers/${q.questionid}`} key={q.questionid}>
              <div className={classes.askpara}>
                <p>{q.title}</p>
                <button> &#62; </button>
              </div>
            </Link>
          ))
        ) : (
          <p>No questions posted yet.</p>
        )}
      </section>
    </div>
  );
}

export default Home;
