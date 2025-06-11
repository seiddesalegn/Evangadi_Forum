import React from "react";
import "./AskQuestion.css";

function AskQuestion() {
  return (
    <div className="ask-container">
      <div className="ask-wrapper">
        <h2 className="ask-title">
          <span className="title-highlight">Steps To Write A</span> Good Question.
        </h2>
        <ul className="ask-list">
          <li> Summerize your problems in a one-line-title.</li>
          <li> Describe your problem in more detail.</li>
          <li> Describe what you tried and what you expected to happen.</li>
          <li> Review your question and post it here.</li>
        </ul>

              <h3 className="post-title">Post Your Question</h3>
              
              <form>
                  <input
          className="ask-input"
          type="text"
          placeholder="Question title"
          name="title"
        />
        <textarea
          className="ask-textarea"
          placeholder="Question detail ..."
          name="detail"
        ></textarea>

        <button className="ask-button">Post Question</button>
              </form>  
      </div>
    </div>
  );
}

export default AskQuestion;





























// import React, { useState } from "react";
// import "./AskQuestion.css"; // Create this file for styling
// import axios from "axios"; // For sending data to the backend

// const AskQuestion = () => {
//   const [title, setTitle] = useState("");
//   const [detail, setDetail] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // ✅ Send title & detail to backend API/database here
//     try {
//       const response = await axios.post("http://your-backend-url/api/questions", {
//         title,
//         detail,
//       });
//       console.log("Question posted:", response.data);

//       // Clear input fields after successful post
//       setTitle("");
//       setDetail("");
//     } catch (error) {
//       console.error("Error posting question:", error);
//     }
//   };

//   return (
//     <div className="ask-container">
//       <div className="steps">
//         <h2>Steps To Write <span className="highlight">A</span> Good Question.</h2>
//         <ul>
//           <li>🟣 Summarize your problems in a one-line title.</li>
//           <li>🟣 Describe your problem in more detail.</li>
//           <li>🟣 Describe what you tried and what you expected to happen.</li>
//           <li>🟣 Review your question and post it here.</li>
//         </ul>
//       </div>

//       <form className="ask-form" onSubmit={handleSubmit}>
//         <h3>Post Your Question</h3>
//         <input
//           type="text"
//           placeholder="Question title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)} // ✅ Track title
//           required
//         />
//         <textarea
//           placeholder="Question detail ..."
//           value={detail}
//           onChange={(e) => setDetail(e.target.value)} // ✅ Track detail
//           required
//         ></textarea>
//         <button type="submit">Post Question</button>
//       </form>
//     </div>
//   );
// };

// export default AskQuestion;
