import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils";

function Login() {
  const navigate = useNavigate();

  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const copyLoginInfo = { ...loginInfo };
    copyLoginInfo[name] = value;
    setLoginInfo(copyLoginInfo);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;

    if (!email || !password) {
      return handleError("Email and password is required !");
    }

    try {
      const url = "http://localhost:8080/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });
      const result = await response.json();

      const { success, message, jwtToken, name, error } = result;

      if (success) {
        handleSuccess(message);
        localStorage.setItem('jwtToken', jwtToken)
        localStorage.setItem('loggedInUser', name)
        
        setTimeout(() => {
          navigate("/home");
        }, 2000);
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      } else if (!success) {
        handleError(message);
      }

    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className="container">
      <h1>Login page</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            onChange={handleChange}
            type="email"
            name="email"
            placeholder="Enter your mail ..."
            value={loginInfo.email}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            onChange={handleChange}
            type="password"
            name="password"
            placeholder="Enter your password ..."
            value={loginInfo.password}
          />
        </div>
        <button type="submit">Login</button>
        <span>
          Don't have an account ?<Link to="/signup">Signup</Link>
        </span>
        <ToastContainer />
      </form>
    </div>
  );
}

export default Login;
