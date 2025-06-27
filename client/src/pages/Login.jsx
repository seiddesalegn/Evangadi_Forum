import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import axiosInstance from "../Axios";
import { Link } from "react-router-dom";
import style from "./login.module.css";
import About from "./About";

function Login() {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const { data } = await axiosInstance.post("/user/login", {
        email,
        password,
      });

      localStorage.setItem("token", data.token);
      window.location.href = "/";
    } catch (error) {
      const errorMsg = error.response?.data?.msg || "Login failed";
      setError(errorMsg);
      // console.log(error);
    }
  }

  return (
    <section className={style.wrapper}>
      <div className={style.login}>
        {error && <span style={{ color: "red" }}>{error}</span>}
        <div style={{ textAlign: "center" }}>
          <h2>Login to your Account</h2>
          <div>
            <span>
              Don't have an account?{" "}
              <Link to={"/register"}>Create a new account</Link>
            </span>
          </div>
        </div>
        <form onSubmit={handleSubmit} className={style.loginform}>
          <div>
            <input
              type="email"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={style.inputWrapper}>
            <div className={style.inputIconWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={style.passwordInput}
              />
              <span
                className={style.icon}
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </span>
            </div>
          </div>
          <div className={style.forget}>
            <Link to="/reset">Forget password?</Link>
          </div>

          <button type="submit" className={style.loginbtn}>
            Login
          </button>
        </form>
      </div>
      <About />
    </section>
  );
}

export default Login;
