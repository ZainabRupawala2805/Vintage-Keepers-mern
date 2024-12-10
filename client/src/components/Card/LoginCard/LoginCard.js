import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./LoginCard.css"; // Add your custom CSS
import { BACKEND_URL } from "../../../config";
import { toastError, toastSuccess } from "../../Toast/Toast";
import { useUser } from "../../../Context/UserContext";

const LoginCard = () => {
  const navigate = useNavigate();

  const { fetchUserData } = useUser();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleLoginChange = (value, field) => {
    setLoginData((prev) => ({ ...prev, [field]: value }));
  };

  const handleLoginSubmit = async () => {
    const { email, password } = loginData;

    // Validate input fields
    if (!email || !password) {
      toastError("Email and Password are required.");
      return;
    }

    try {
      setIsLoading(true);

      // API call
      const response = await axios.post(`${BACKEND_URL}/users/login`, {
        email,
        password,
      });

      // On success
      toastSuccess("Login successful!");
      // console.log("Login Response:", response.data);

      // You can store the token or user info if provided
      localStorage.setItem("token", response.data.token); // Assuming the API provides a JWT token
      // localStorage.setItem("user", JSON.stringify(response.data.data)); // Save user details if needed
      fetchUserData(); // fatch latest user Data
      // Redirect or navigate to another page after login
      navigate("/");
    } catch (error) {
      // Handle API errors
      const errorMessage =
        error.response?.data?.message || "Login failed. Please try again.";
      toastError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login__card__container">
      <div className="login__card">
        <div className="login__header">
          <h1>Login</h1>
        </div>
        <div className="login__inputs">
          <div className="login__input__container">
            <label className="input__label">Email</label>
            <input
              type="email"
              className="login__input"
              value={loginData.email}
              onChange={(e) => handleLoginChange(e.target.value, "email")}
              placeholder="example@gmail.com"
            />
          </div>
          <div className="login__input__container">
            <label className="input__label">Password</label>
            <input
              type="password"
              className="login__input"
              value={loginData.password}
              onChange={(e) => handleLoginChange(e.target.value, "password")}
              placeholder="Enter your password"
            />
          </div>
        </div>

        <div className="login__button__container">
          <button
            className="primary-btn"
            onClick={handleLoginSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
          <div className="m-2">
            Don't have an account? <Link to="/account/register">Register</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginCard;
