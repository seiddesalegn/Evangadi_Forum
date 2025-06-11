import React, { createContext, useEffect, useState } from 'react'
import Register from './pages/Register'
import Home from './pages/Home'
import Howitworks from './Components/HowItWorks/HowItWorks'
import { Routes, Route, useNavigate } from 'react-router-dom'
import UserLogedIn from './Components/Home/UserLogedIn'
import axiosInstance from './Axios'
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import Login from './pages/Login'
import AskQuestion from './Components/AskQuestion/AskQuestion'


export const AppStates = createContext()
function App() {
  const [user, setUser] = useState([])
  const token = localStorage.getItem("token")
  const navigate = useNavigate()
  async function checkUser() {
    try{
      const {data} = await axiosInstance.get("/users/check",{
        headers : {
          Authorization: 'Bearer ' + token
        }
      })
      setUser(data)
      console.log(data);
      
    }catch(error){
      console.log(error.response);
      navigate("/login")
      
    }
    
  }

  useEffect(()=>{
    checkUser()
  }, [])
  return (
    <AppStates.Provider value={{user, setUser}}>
      <Header />
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path='/howitworks' element={<Howitworks />} />
            <Route path="/home" element={<UserLogedIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/AskQuestion" element={< AskQuestion/>} />
        </Routes>
        <Footer />
    </AppStates.Provider>
  )
}

export default App
