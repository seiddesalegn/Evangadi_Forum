import React, { useState } from 'react';
import classes from './Header.module.css';
import logo from '../../../public/logo.png';
import { Link } from 'react-router-dom';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <section className={classes.headerContainer}>
      <div className={classes.wrapper}>
        <div className={classes.logocontainer}>
          <Link to="/login">
            <img src={logo} alt="Logo" />
          </Link>
          <button className={classes.navbarbtn} onClick={toggleMenu}>
            ☰
          </button>
        </div>

        <div className={`${classes.navbar} ${isMenuOpen ? classes.active : ''}`}>
          <ul className={classes.navbarList}>
            <div className={classes.homeAndHowitwork}>
              <Link to="/login" onClick={toggleMenu}>
                <li>Home</li>
              </Link>
              <Link to="/howItworks" onClick={toggleMenu}>
                <li>How it works</li>
              </Link>
            </div>
            <Link to="/login" onClick={toggleMenu}>
              <li className={classes.signup}>Sign In</li>
            </Link>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Header;