
import React, { useState } from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import axiosInstance from "../Axios";
import { Link, useNavigate } from "react-router-dom";
import style from "./login.module.css";
import About from "./About";
import { useState } from "react";

function Login() {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const email = useRef(null);
  const password = useRef(null);
  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const { data } = await axiosInstance.post("/user/login", {
        email,
        password,
      });

      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (error) {
      console.error("Error during registration:", error);
      setError(true);
    }
  }
  return (
    <section className={style.wrapper}>
      <div className={style.login}>
        {error && <span style={{ color: "red" }}>Something went wrong</span>}
        <h2>Login to your Account</h2>
        <div>
          <span>
            Don't have an account?{" "}
            <Link to={"/register"}>Create Account</Link>
          </span>
        </div>
        <form onSubmit={handleSubmit} className={style.loginform}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <br />
          <div>
            <label htmlFor="password">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ paddingRight: "10px" }}
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}>
              {showPassword ? (<VisibilityIcon />) : (<VisibilityOffIcon />)}
            </span>
          </div>
          <br />
          <button type="submit">Login</button>
        </form>
      </div>
      <About />
    </section>
  );
}
export default Login;
