import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { handlerror, handlesuccess } from "../utlis";

const login = () => {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;

    if (!email || !password) {
      return handlerror("email and password are required");
    }
    console.log("Sending Data:", loginInfo); // Debugging

    try {
      const url = "https://auth-mern-app-5.onrender.com/auth/login";

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });
      const result = await response.json();
      console.log("Response:", result); // Debugging

      const { message, success, jwtToken, name, error } = result;

      if (success) {
        handlesuccess(message);
        localStorage.setItem("token", jwtToken);
        localStorage.setItem("loggesInUser", name);
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else if (error) {
        const details = error.details[0].message;
        handlerror(details);
      } else if (!success) {
        handlerror(message);
      }

      console.log(result);
    } catch (error) {
      handlerror(error);
    }
  };

  const handlechange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    console.log(name, value);

    const copyloginInfo = { ...loginInfo };
    copyloginInfo[name] = value;
    setLoginInfo(copyloginInfo);
  };

  // console.log(signupInfo);

  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            onChange={handlechange}
            type="email"
            name="email"
            placeholder="Enter your email..."
            value={loginInfo.email}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            onChange={handlechange}
            type="password"
            name="password"
            placeholder="Enter your password..."
            value={loginInfo.password}
          />
        </div>
        <button type="submit">Login</button>
        <span>
          Don't have an account ?<Link to="/signup">Signup</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default login;
