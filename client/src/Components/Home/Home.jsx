import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import classes from "./Home.module.css";
import { QuestionContext } from "../AskQuestion/QuestionContext";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { jwtDecode } from "jwt-decode";
import RubikLoader from "../Loader/Loader";

// day formatting
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

function Home() {
  const [user, setUser] = useState({});
  const { questions } = useContext(QuestionContext);
  const [loading, setLoading] = useState(true);

  // search bar
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCount, setVisibleCount] = useState(10); // Show first 10 questions

  // Decode user token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && typeof token === "string") {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (error) {
        localStorage.removeItem("token");
      }
    }
  }, []);

  // Stop loader after questions load
  useEffect(() => {
    if (questions) {
      setLoading(false);
    }
  }, [questions]);

  // Filter questions dynamically by search
  const filteredQuestions = questions?.filter((q) =>
    q.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Show limited number of questions
  const visibleQuestions = filteredQuestions?.slice(0, visibleCount);

  // Load more handler
  const loadMore = () => {
    setVisibleCount((prev) => prev + 10);
  };

  // Show loading animation while data loads
  if (loading) return <RubikLoader />;

  return (
    <div className={classes.homeContainer}>
      {/* Welcome & Ask Question */}
      <div className={classes.welcome}>
        <Link to="/Askquestion" className={classes.askbtn}>
          Ask Question
        </Link>
        <p>
          Welcome:{" "}
          <span className={classes.usernameRed}>
            {user?.username || "Guest"}
          </span>
        </p>
      </div>

      {/* Search Bar */}
      <div className={classes.searchBarWrapper}>
        <input
          type="text"
          placeholder="Search questions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={classes.searchInput}
        />
      </div>

      {/* Questions Section */}
      <section>
        <hr />
        <div className={classes.questioncards}>
          {questions && questions.length > 0 ? (
            <>
              {visibleQuestions.map((q) => (
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
                        <div className={classes.dateText}>
                          {`${dayjs(q.created_at).fromNow()} • ${dayjs(
                            q.created_at
                          ).format("MMM D")}`}
                        </div>
                      </div>
                    </div>
                    <button>&#62;</button>
                  </div>
                </Link>
              ))}

              {/* Load More Button */}
              {filteredQuestions.length > visibleCount && (
                <div className={classes.loadMoreWrapper}>
                  <button onClick={loadMore} className={classes.loadMoreBtn}>
                    Load More
                  </button>
                </div>
              )}
            </>
          ) : (
            <p>No questions posted yet.</p>
          )}
        </div>
      </section>
    </div>
  );
}

export default Home;
