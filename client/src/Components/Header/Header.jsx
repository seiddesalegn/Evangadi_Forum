import { useState, useContext, useEffect } from "react";
import classes from "./Header.module.css";
import logo from "../../../public/logo.png";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function Header() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token && typeof token === "string") {
      try {
        const decoded = jwtDecode(token);

        setUser(decoded);
      } catch (error) {
        console.error("Invalid token:", error.message);
        localStorage.removeItem("token");
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <section className={classes.headerContainer}>
      <div className={classes.wrapper}>
        <div className={classes.logocontainer}>
          <Link to="/">
            <img src={logo} alt="Logo" />
          </Link>
          <button className={classes.navbarbtn} onClick={toggleMenu}>
            ☰
          </button>
        </div>

        <div
          className={`${classes.navbar} ${isMenuOpen ? classes.active : ""}`}
        >
          <ul className={classes.navbarList}>
            <div className={classes.homeAndHowitwork}>
              <Link to="/" onClick={toggleMenu}>
                <li>Home</li>
              </Link>
              <Link to="/howItworks" onClick={toggleMenu}>
                <li>How it works</li>
              </Link>
            </div>

            {user ? (
              <Link to="/" onClick={toggleMenu}>
                <li className={classes.signup} onClick={handleLogout}>
                  Log Out
                </li>
              </Link>
            ) : (
              <Link to="/" onClick={toggleMenu}>
                <li className={classes.signup}>Sign In</li>
              </Link>
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Header;
