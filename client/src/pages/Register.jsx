import React, { useRef, useState } from "react";
import axiosInstance from "../Axios";
import style from "./login.module.css";
import { Link, useNavigate } from "react-router-dom";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
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
  const [showPassword, setShowPassword] = useState(false); 

  async function handleSubmit(event) {
    event.preventDefault();
    const userValue = username.current.value;
    const passwordValue = password.current.value;
    const firstnameValue = firstname.current.value;
    const lastnameValue = lastname.current.value;
    const emailValue = email.current.value;

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
      navigate("/login");
    } catch (error) {
      console.log(error);

      setError(true);
    }
  }

  return (
   <section className={style.wrapper}>
      <div className={style.login}>
        <div>
          <h2>Join the Community</h2>
          <span>
            Already have account? <Link to={"/login"}>login</Link>
          </span>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">username</label>
            <input type="text" ref={username} placeholder="Enter username" id="username" name="username" />
          </div>
          <br />
          <div>
            <label htmlFor="firstname">First Name</label>
            <input
              type="text"
              ref={firstname}
              placeholder="Enter firstname"
              id="firstname"
              name="firstname"
            />
          </div>
          <br />
          <div>
            <label htmlFor="lastname">lastname</label>
            <input type="text" ref={lastname} placeholder="Enter lastname" id="lastname" name="lastname" />
          </div>
          <br />
          <div>
            <label htmlFor="email">Email</label>
            <input type="email" ref={email} placeholder="Enter email" id="email" name="email" />
          </div>
          <br />
          <div style={{ position: "relative" }}>
            <label htmlFor="password">Password</label>
            <input
              type={showPassword ? "text" : "password"} 
              ref={password}
              id="password"
              placeholder="Enter password"
              name="password"
              style={{ paddingRight: "10px" }}
            />
            <span
              onClick={() => setShowPassword(!showPassword)} >
              {showPassword ? (<VisibilityIcon />) : (<VisibilityOffIcon />)}
            </span>
          </div>
          
          <br />
          <button type="submit">Agree And Join</button>
        </form>
        
          {field && (
            <span style={{ color: "red" }}>Please fill in all fields.</span>
          )}
          {error && (
            <span style={{ color: "red" }}>
              Error ocurred during registration: or User exist
            </span>
          )}
      </div>
      <About />
    </section>
  );
}
export default Register;
