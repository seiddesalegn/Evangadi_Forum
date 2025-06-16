import React, { useRef, useState } from "react";
import axiosInstance from "../Axios";
import style from "./login.module.css";
import { Link, useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import About from "./About";

function Register() {
  const username = useRef(null);
  const firstname = useRef(null);
  const lastname = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const navigate = useNavigate();

  const [field, setField] = useState(false);
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userValue = username.current.value;
    const firstnameValue = firstname.current.value;
    const lastnameValue = lastname.current.value;
    const emailValue = email.current.value;
    const passwordValue = password.current.value;

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
    } catch (err) {
      console.error(err);
      setError(true);
    }
  };

  return (
    <section className={style.wrapper}>
      <div className={style.login}>
        <div style={{textAlign:'center'}}>
        <h2>Join the network</h2><div
            style={{ textAlign: "center", marginTop: "6px", color: "#ff8500" }}>
            Already have an account? <Link to="/login">Sign in</Link>
          </div>
        </div>
        <form onSubmit={handleSubmit} className={style.loginform}>
          <div>
            <input
              type="text"
              ref={username}
              name="username"
              placeholder="Username"
              required
            />
          </div>

          <div className={style.nameGroup}>
            <div>
              <input
                type="text"
                ref={firstname}
                name="firstname"
                placeholder="First name"
                required
              />
            </div>
            <div>
              <input
                type="text"
                ref={lastname}
                name="lastname"
                placeholder="Last name"
                required
              />
            </div>
          </div>

          <div>
            <input
              type="email"
              ref={email}
              name="email"
              placeholder="Email address"
              required
            />
          </div>

          <div className={style.inputWrapper}>
            <div className={style.inputIconWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                ref={password}
                name="password"
                placeholder="Password"
                className={style.passwordInput}
                required
              />
              <span
                className={style.icon}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </span>
            </div>
          </div>

          <div className={style.agreementText}>
            I agree to the{" "}
            <a href="#" className={style.privacy}>
              privacy policy
            </a>{" "}
            and{" "}
            <a href="#" className={style.terms}>
              terms of service
            </a>
            .
          </div>

          <button type="submit">Agree and Join</button>

          
        </form>

        {field && (
          <span style={{ color: "red" }}>Please fill in all fields.</span>
        )}
        {error && (
          <span style={{ color: "red" }}>
            Registration failed or user already exists.
          </span>
        )}
      </div>

      <About />
    </section>
  );
}

export default Register;
