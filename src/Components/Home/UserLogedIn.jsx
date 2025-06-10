// import React, { useEffect, useState, useContext } from "react";
// import axios from "axios";
import { AppStates } from "../../App";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const Home = () => {
  // const { user } = useContext(AppStates);
  // const [questions, setQuestions] = useState([]);
  // const [searchTerm, setSearchTerm] = useState("");

  // useEffect(() => {
  //   axios
  //     .get("/api/questions")
  //     .then((res) => setQuestions(res.data))
  //     .catch((err) => console.error(err));
  // }, []);

  // const filteredQuestions = questions.filter((q) =>
  //   q.title.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  return (
    <>
      <main className="home-page">
        <section className="welcome-section">
          <button className="ask-btn">Ask Question</button>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search question"
            />
          </div>
          <p className="welcome-text">
            {/* Welcome: <span>{user?.username || "Guest"}</span> */}
          </p>
        </section>
        {/* <section className="questions-list">
          {filteredQuestions.length > 0 ? (
            filteredQuestions.map((q) => (
              <div key={q.id} className="question-card">
                <div className="profile">
                  <img src="/default-avatar.png" alt="profile" /> 
                  <p>{q.username}</p>
                </div>
                <div className="question-title">{q.title}</div>
                <div className="arrow">{">"}</div>
              </div>
            ))
          ) : (
            <p>No questions found.</p>
          )}
        </section> */}
      </main>
    </>
  );
};

export default Home;