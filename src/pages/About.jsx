import React from 'react'
import { Link } from 'react-router-dom'
import style from './login.module.css'
function About() {
  return (
    <div className={style.aboutsection}>
      <p className={style.about}>About</p>
      <h1>Evangadi Networks Q&A</h1>
      <p>
  The main objective of the Evangadi Forum project is to provide a safe and interactive platform where students in the Evangadi community can ask questions, share answers, and support each other's learning journey. By creating a Q&A environment tailored to our bootcamp's needs, the forum encourages peer-to-peer support and makes it easier to find help, resources, and shared knowledge all in one place.
</p>

<p>
  Another key goal of this project is to give students real-world experience working on a full-stack application using modern technologies like React, Node.js, and MySQL. Every team member contributes to different sections of the site — from frontend UI to backend APIs — which helps us simulate working on a professional development team and prepares us for industry-level collaboration.
</p>
      <Link to="/howItworks">
      <button>How it works</button>
      </Link>
    </div>
  )
}

export default About
