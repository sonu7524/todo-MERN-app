import React, { useState } from "react";
import loginImg from "../../../assets/login.png";
import "./styles.css";
import axios from "axios";
import { Link } from "react-router-dom";

const Login = () => {
    let[email,setEmail] = useState("");
    let[password,setPassword] = useState("");
    let[error,setError] = useState("");

    const handleEmail = (e)=>{
        setEmail(e.target.value);
    }
    const handlePassword = (e)=>{
        setPassword(e.target.value);
    }
    const handleSubmit = async (e) => {
      e.preventDefault();
    
      if (email && password) {
        try {
          const response = await axios.post("https://todolist-mern-x95t.onrender.com/api/auth/login", {
            email: email,
            password: password,
          });
    
          // Check if the response contains a token
          if (response.data.auth_token) {
            // Save the token in localStorage
            sessionStorage.setItem("auth_token", response.data.auth_token);
            sessionStorage.setItem("user_id", response.data.userId);
            
            // Redirect to the "/dashboard" page
            window.location.href = "/dashboard";
          } else {
            setError("Invalid Credentials");
          }
        } catch (error) {
          console.error(error);
          setError("Invalid Credentials");
        }
      } else {
        setError("All fields are required");
      }
    };
    return (
        <div className="login">
            <img className="login-img" src={loginImg} />
            <form className="login-form">
                <p className="title">Login Now</p>
                <p className="message">Login now and get full access to our app. </p> 
                <input onChange={handleEmail} required="" placeholder="Email" type="email" className="input"/>
                <input onChange={handlePassword} required="" placeholder="Password" type="password" className="input"/>
                {error && <span style={{color:"red"}} className="error">{error}</span>}
                <button onClick={handleSubmit} className="submit">Login</button>
                <p className="signin">Don't have an acount ? <Link to={"/register"}>Register Now</Link> </p>
            </form>
        </div>
    )
}

export default Login;
