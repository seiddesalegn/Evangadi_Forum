import React, { useRef } from "react";
import axiosInstance from "../Axios";
import { Link, useNavigate } from "react-router-dom";
import style from "./login.module.css";

import About from "./About";
import { useState } from "react";
function Login() {
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const email = useRef(null);
  const password = useRef(null);
  async function handleSubmit(event) {
    event.preventDefault();
    const emailValue = email.current.value;
    const passwordValue = password.current.value;
    // You can add validation here if needed
    // if ( !emailValue || !passwordValue) {
    //     alert("Please fill in all fields.");
    //     return;
    // }
    try {
      const { data } = await axiosInstance.post("/user/login", {
        email: emailValue,
        password: passwordValue,
      });
      
      navigate("/home");
      localStorage.setItem("token : ", data.token);
      localStorage.setItem("username : ", data.username);
      const username = data.username;
      console.log(username);
    } catch (error) {
      console.error("Error during registration:", error);
      setError(true);
    }
  }
  return (
    <section className={style.wrapper}>
      <div className={style.login}>
        {error && <span style={{ color: "red" }}>something went wrong</span>}
        <h2>Login to your Account</h2>
        <div>
          <span>
            Don't have account?
            <Link to={"/register"}>Create Account</Link>
          </span>
        </div>
        <form onSubmit={handleSubmit} className={style.loginform}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              ref={email}
              id="email"
              name="email"
              placeholder="Enter your Email"
              required
            />
          </div>
          <br />
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              ref={password}
              id="password"
              name="password"
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
      <About />
    </section>
  );
}
export default Login;
