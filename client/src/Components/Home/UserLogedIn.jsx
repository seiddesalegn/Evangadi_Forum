import { useContext } from "react";
import { Link } from "react-router-dom";
import classes from "./Home.module.css";
import { AuthContext } from "../AuthContext";
import { QuestionContext } from "../AskQuestion/QuestionContext";

function UserLogedIn() {
  const { user } = useContext(AuthContext);
  const { questions } = useContext(QuestionContext);

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
            <Link to={`/answeres/${q.questionid}`} key={q.questionid}>
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

export default UserLogedIn;
