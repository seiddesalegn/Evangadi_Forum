import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const QuestionContext = createContext();

export function QuestionProvider({ children }) {
  const [questions, setQuestions] = useState([]);

  const fetchQuestions = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "http://localhost:5500/api/question/all-questions",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setQuestions(res.data);
    } catch (err) {
      console.error("Failed to fetch questions", err);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <QuestionContext.Provider
      value={{ questions, setQuestions, fetchQuestions }}
    >
      {children}
    </QuestionContext.Provider>
  );
}
