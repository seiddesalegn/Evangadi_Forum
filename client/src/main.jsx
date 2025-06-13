import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { QuestionProvider } from "./Components/AskQuestion/QuestionContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <QuestionProvider>
      <App />
    </QuestionProvider>
  </BrowserRouter>
);
