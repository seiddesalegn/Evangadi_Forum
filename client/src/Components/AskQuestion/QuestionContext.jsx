import { createContext, useEffect, useState } from "react";
import axiosInstance from "../../Axios";

export const QuestionContext = createContext();

export function QuestionProvider({ children }) {
  const [questions, setQuestions] = useState(null);

  const fetchQuestions = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axiosInstance.get("/question/all-questions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setQuestions(res.data.questions);
    } catch (err) {
      console.error("Failed to fetch questions", err);
    }
  };

  useEffect(() => {
    fetchQuestions();

    const interval = setInterval(() => {
      fetchQuestions();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <QuestionContext.Provider
      value={{ questions, setQuestions, fetchQuestions }}
    >
      {children}
    </QuestionContext.Provider>
  );
}
