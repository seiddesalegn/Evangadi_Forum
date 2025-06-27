import { useState } from "react";
import axiosInstance from "../Axios";
import { Link, useNavigate } from "react-router-dom";
import style from "./login.module.css";
import About from "./About";

function Reset() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleEmailSubmit(e) {
    e.preventDefault();
    setError("");
    if (!email) {
      setError("Please enter your email");
      return;
    }

    setStep(2); // Continue to step 2
  }

  async function handleConfirmSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const { data } = await axiosInstance.delete("/user/delete", {
        data: { email, username },
      });

      setSuccess(data.success);
      setEmail("");
      setUsername("");

      setTimeout(() => {
        navigate("/register");
      }, 2000);
    } catch (err) {
      console.error("Reset error:", err.response?.data || err.message);
      setError(err.response?.data?.msg || "Something went wrong");
    }
  }

  return (
    <section className={style.wrapper}>
      <div className={style.login}>
        <div style={{ textAlign: "center" }}>
          <h2>Reset Your Account</h2>
          <div>
            <span>
              Want to create a new one? <Link to={"/register"}>Register</Link>
            </span>
          </div>
        </div>

        {error && <span style={{ color: "red" }}>{error}</span>}
        {success && <span style={{ color: "green" }}>{success}</span>}

        {step === 1 && (
          <form onSubmit={handleEmailSubmit} className={style.loginform}>
            <div>
              <input
                type="email"
                placeholder="Enter your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className={style.forget}>
              <Link to="/login">Back to Login</Link>
            </div>

            <button type="submit" className={style.loginbtn}>
              Next
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleConfirmSubmit} className={style.loginform}>
            <div style={{ marginBottom: "1rem", color: "#555", textAlign: "center" }}>
              Confirm reset for: <strong>{email}</strong>
            </div>

            <div>
              <input
                type="text"
                placeholder="Enter your Username to confirm"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className={style.forget}>
              <button
                type="button"
                onClick={() => {
                  setStep(1);
                  setUsername("");
                }}
                style={{ background: "none", border: "none", color: "#007bff", cursor: "pointer" }}
              >
                Back to email
              </button>
            </div>

            <button type="submit" className={style.loginbtn}>
              Confirm Reset
            </button>
          </form>
        )}
      </div>

      <About />
    </section>
  );
}

export default Reset;
