import React, {useState, useEffect } from "react"
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Login from "./Login";
import Chat from "./Chat";

export default function App() {

    const [email, setEmail] = useState("")
    const user = JSON.parse(localStorage.getItem("loginDeets"))
    useEffect(() => {
        if(user){
            setEmail(user.email)
        }   
    }, [user])
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/chat" element={<Chat email={email}/>} />
      </Routes>
    </BrowserRouter>
  );
}