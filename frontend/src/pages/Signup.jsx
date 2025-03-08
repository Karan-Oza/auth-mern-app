import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { handlerror, handlesuccess } from "../utlis";

const Signup = () => {
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const Navigate = useNavigate();

  const handleSignup = async(e)=>{
    e.preventDefault();
    const {name , email , password}  = signupInfo;

    if (!name || !email || !password ){
      return handlerror("name , email and password are required");

    }
    try {
      const url = "https://auth-mern-app-5.onrender.com/auth/signup"
    
      const response = await fetch(url , {
          method : "POST",
          headers : {
            "Content-Type" : "application/json",
          },
          body : JSON.stringify(signupInfo)         
      });
      const result = await response.json()
      const {message , success , error} = result;

      if(success){
        handlesuccess(message);
        setTimeout(()=>{
          Navigate("/login")
        }, 1000)
      }else if(error){
        const details = error.details[0].message;
        handlerror(details);
      }else if(!success){
        handlerror(message)
      }

      console.log(result);
        
    } catch (error) {
  
      handlerror(error);
    }
    
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    console.log(name, value);

    const copysignupInfo = { ...signupInfo };
    copysignupInfo[name] = value;
    setSignupInfo(copysignupInfo);
  };

  // console.log(signupInfo);

  return (
    <div className="container">
      <h1>Signup</h1>
      <form onSubmit={handleSignup}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            onChange={handleSubmit}
            type="text"
            name="name"
            autoFocus
            placeholder="Enter your name..."
            value={signupInfo.name}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            onChange={handleSubmit}
            type="email"
            name="email"
            placeholder="Enter your email..."
            value={signupInfo.email}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            onChange={handleSubmit}
            type="password"
            name="password"
            placeholder="Enter your password..."
            value={signupInfo.password}
          />
        </div>
        <button type="submit">Signup</button>
        <span>
          Already have an account ?<Link to="/login">Login</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Signup;
