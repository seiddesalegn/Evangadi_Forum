import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { AuthProvider } from "./Components/AuthContext.jsx";
import { QuestionProvider } from "./Components/AskQuestion/QuestionContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <QuestionProvider>
        <App />
      </QuestionProvider>
    </AuthProvider>
  </BrowserRouter>
);
