import { createContext } from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Howitworks from "./Components/HowItWorks/HowItWorks";
import Header from "./Components/Header/Header";
import Home from "./Components/Home/Home";
import Footer from "./Components/Footer/Footer";
import Login from "./pages/Login";
import AskQuestion from "./Components/AskQuestion/AskQuestion";
import Answer from "./Components/Answer/Answer";
import ProtectedRoute from "./Components/ProtectedRoute";
import "./index.css";

export const AppStates = createContext();
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/howitworks" element={<Howitworks />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/AskQuestion"
          element={
            <ProtectedRoute>
              <AskQuestion />
            </ProtectedRoute>
          }
        />
        <Route
          path="/answers/:questionId"
          element={
            <ProtectedRoute>
              <Answer />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
