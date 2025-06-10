import React from 'react'
import classes from './Header.module.css'
import logo from '../../../public/logo.png' 
import { Link } from 'react-router-dom'
function Header() {
  return (
    <section className={classes.headerContainer}>
        <div className={classes.wrapper}>
        <div className={classes.logocontainer}>
            <Link to="/login">
                <img src={logo}  />
            </Link>
            <button className={classes.navbarbtn}>☰</button>
        </div>

        <div className={classes.navbar}>
            <ul className={classes.navbarList}>
                <div className={classes.homeAndHowitwork}>
                <Link to="/login">
                    <li>Home</li>
                </Link>
                <Link to="/howItworks">
                    <li>How it works</li>   
                </Link>
                </div>
                <Link to="/login">
                    <li className={classes.signup}>Sign In</li>
                </Link>
            </ul>
        </div>
        </div>

    </section>
  )
}

export default Header
