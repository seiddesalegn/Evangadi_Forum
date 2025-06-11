import React, { useRef } from "react";
import axiosInstance from "../Axios";
import style from "./login.module.css";
import { Link, useNavigate } from "react-router-dom";
import About from "./About";
import { useState } from "react";
function Register() {
  const username = useRef(null);
  const firstname = useRef(null);
  const lastname = useRef(null);
  const password = useRef(null);
  const email = useRef(null);
  const navigate = useNavigate();
  const [field, setField] = useState(false);
  const [error, setError] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    const userValue = username.current.value;
    const passwordValue = password.current.value;
    const firstnameValue = firstname.current.value;
    const lastnameValue = lastname.current.value;
    const emailValue = email.current.value;

    // You can add validation here if needed
    if (
      !userValue ||
      !firstnameValue ||
      !lastnameValue ||
      !emailValue ||
      !passwordValue
    ) {
      setField(true);
      return;
    }

    try {
      await axiosInstance.post("/user/register", {
        username: userValue,
        firstname: firstnameValue,
        lastname: lastnameValue,
        email: emailValue,
        password: passwordValue,
      });
      alert("Registration successful!");
      navigate("/login"); // Redirect to login page after successful registration
    } catch (error) {
      console.log(error);

      setError(true);
    }
  }

  return (
    <section className={style.wrapper}>
      <div className={style.login}>
        <div>
          {field && (
            <span style={{ color: "red" }}>Please fill in all fields.</span>
          )}
          {error && (
            <span style={{ color: "red" }}>
              Error ocurred during registration: or User exist
            </span>
          )}
          <h2>Join the Community</h2>
          <span>
            Already have account?
            <Link to={"/login"}>login</Link>
          </span>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">username</label>
            <input type="text" ref={username} id="username" name="username" />
          </div>
          <br />
          <div>
            <label htmlFor="firstname">First Name</label>
            <input
              type="text"
              ref={firstname}
              id="firstname"
              name="firstname"
            />
          </div>
          <br />
          <div>
            <label htmlFor="lastname">lastname Name</label>
            <input type="text" ref={lastname} id="lastname" name="lastname" />
          </div>
          <br />
          <div>
            <label htmlFor="email">Email</label>
            <input type="email" ref={email} id="email" name="email" />
          </div>
          <br />
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              ref={password}
              id="password"
              name="password"
            />
          </div>
          <button type="submit">Create Account</button>
        </form>
      </div>
      <About />
    </section>
  );
}
export default Register;
