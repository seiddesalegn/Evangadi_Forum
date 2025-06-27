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

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Decode token
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

  // Handle loader
  useEffect(() => {
    if (questions) {
      setLoading(false);
    }
  }, [questions]);

  // Filter by search
  const filteredQuestions = questions?.filter((q) =>
    q.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredQuestions?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentQuestions = filteredQuestions?.slice(startIndex, endIndex);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  if (loading) return <RubikLoader />;

  return (
    <div className={classes.homeContainer}>
      {/* Header */}
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

      {/* Search */}
      <div className={classes.searchBarWrapper}>
        <input
          type="text"
          placeholder="Search questions..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // reset to page 1 when searching
          }}
          className={classes.searchInput}
        />
      </div>

      {/* Questions */}
      <section>
        <hr />
        <div className={classes.questioncards}>
          {filteredQuestions?.length > 0 ? (
            <>
              {currentQuestions.map((q) => (
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
                          ).format("MMM D, YYYY")}`}
                        </div>
                      </div>
                    </div>
                    <button>&#62;</button>
                  </div>
                </Link>
              ))}

              {/* Pagination */}
              <div className={classes.paginationWrapper}>
                <button
                  onClick={handlePrev}
                  disabled={currentPage === 1}
                  className={classes.pageBtn}
                >
                  ← Previous
                </button>

                <span className={classes.pageText}>
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                  className={classes.pageBtn}
                >
                  Next →
                </button>
              </div>
            </>
          ) : (
            <p>No questions found.</p>
          )}
        </div>
      </section>
    </div>
  );
}

export default Home;
