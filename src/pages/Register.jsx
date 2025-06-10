import React, {useRef } from 'react'
import axiosInstance from '../Axios';
import style from './login.module.css'
import { Link, useNavigate } from 'react-router-dom';
import About from './About';
import { useState } from 'react';
function Register() {
    const userName = useRef(null);
    const firstName = useRef(null);
    const lastName = useRef(null);
    const password = useRef(null);
    const email = useRef(null);
    const navigate = useNavigate();
    const [field, setField] = useState(false)
    const [error, setError] = useState(false)

async function handleSubmit(event) {
    event.preventDefault();
   const userValue =  userName.current.value;
   const passwordValue =  password.current.value;
   const firstNameValue =  firstName.current.value;
   const lastNameValue =  lastName.current.value;
   const emailValue =  email.current.value;
    
    // You can add validation here if needed
    if (!userValue || !firstNameValue || !lastNameValue || !emailValue || !passwordValue) {
        setField(true);
        return;
    }
    
    try{
        await axiosInstance.post('/users/register', {
            userName : userValue,
            firstName : firstNameValue,
            lastName : lastNameValue,
            email : emailValue,
            password : passwordValue
        });
        alert("Registration successful!");
        navigate('/login'); // Redirect to login page after successful registration

    }catch(error) {
        console.log(error);
        
        setError(true);
    }
    
}

  return (
    <section className={style.wrapper}>
    <div className={style.login}>
        <div>
            {
                field&&(<span style={{color:"red"}}>Please fill in all fields.</span>)
            }
            {
                error&&(<span style={{color:"red"}}>Error ocurred during registration: or User exist</span>)
            }
            <h2>Join the Community</h2>
            <span>Already have account? 
        <Link to={"/login"}>login</Link></span>
        </div>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="userName">userName</label>
                <input type="text" ref={userName} id="userName" name="userName"  />
            </div>
            <br />
            <div>
                <label htmlFor="firstName">First Name</label>
                <input type="text" ref={firstName} id="firstName" name="firstName"  />
            </div>
            <br />
            <div>
                <label htmlFor="lastName">Last Name</label>
                <input type="text" ref={lastName} id="lastName" name="lastName"  />
            </div>
            <br />
            <div>
                <label htmlFor="email">Email</label>
                <input type="email" ref={email} id="email" name="email"  />
            </div>
            <br />
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" ref={password} id="password" name="password"  />
            </div>
            <button type="submit">Create Account</button>
        </form>
    </div>
    <About />
    </section>
  )
}
export default Register
