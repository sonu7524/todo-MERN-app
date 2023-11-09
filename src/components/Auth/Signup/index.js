import React, { useState } from "react";
import signupImg from "../../../assets/login.png";
import "./styles.css";
import axios from "axios";
import { Link } from "react-router-dom";


function Signup() {
  let[fullName,setFullName] = useState("");
    let[email,setEmail] = useState("");
    let[password,setPassword] = useState("");
    let[confirmPassword,setConfirmPassword] = useState("");
    let[error,setError] = useState("");

    const handleFullName = (e)=>{
        setFullName(e.target.value);
    }
    const handleEmail = (e)=>{
        setEmail(e.target.value);
    }
    const handlePassword = (e)=>{
        setPassword(e.target.value);
    }
    const handleConfirmPassword = (e)=>{
        setConfirmPassword(e.target.value);
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        if(fullName && email && password && confirmPassword){
            if(password === confirmPassword){
                const user = {
                    username: fullName,
                    email: email,
                    password: password
                }

                const auth = await axios.post("https://todolist-mern-x95t.onrender.com/api/auth/signup", user);
                if(auth.data){
                    window.location.href = "/";
                    setFullName("");
                    setEmail("");
                    setPassword("");
                    setConfirmPassword("");
                }
                else{
                    setError("User Already Exists");
                }
            }else{
                setError("Passwords do not match");
            }
        }
        else{
            setError("All fields are required");
        }
    }

  return (
      <div className="signup">
          <img className="signup-img" src={signupImg} />
          <form class="form-signup">
                <p class="title">Register </p>
                <p class="message">Register now and get full access to our app. </p>
                <input onChange={handleFullName} required="" placeholder="Full Name" type="text" class="input"/>
                <input onChange={handleEmail} required="" placeholder="Email" type="email" class="input"/>
                <input onChange={handlePassword} required="" placeholder="Password" type="password" class="input"/>
                <input onChange={handleConfirmPassword} required="" placeholder="Confirm Password" type="password" class="input"/>
                {error && <span style={{color:"red"}} class="error">{error}</span>}
                <button onClick={handleSubmit} type="submit" class="submit">Submit</button>
                <p class="signin">Already have an acount ? <Link to={"/login"}>Signin</Link> </p>
            </form>
      </div>
  );
}

export default Signup;
