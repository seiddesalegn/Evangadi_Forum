import React from 'react'
import { Link } from 'react-router-dom'
import style from './login.module.css'
function About() {
  return (
    <div className={style.aboutsection}>
      <p className={style.about}>About</p>
      <h1>Evangadi Networks </h1>
      <p>
        Evangadi Student Forum is a space where students can ask questions,
        share answers, and support each other throughout their learning journey.
        It encourages collaboration and makes it easier to get help from peers
        in the Evangadi community.
      </p>

      <p>
        The forum also gives students hands-on experience building a real-world
        full-stack app using technologies like React, Node.js, and MySQL.
      </p>
      <Link to="/howItworks">
        <button className={style.howthiswork}>How it works</button>
      </Link>
    </div>
  );
}

export default About
