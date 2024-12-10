import { Link, useNavigate } from "react-router-dom";
import "./RegisterCard.css";
import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../../config";
import { toastError, toastSuccess } from "../../Toast/Toast";

const RegisterCard = () => {

  const navigate = useNavigate()
  const [userData, setUserData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    cmfpassword: "",
  });


  const handleRegister = (value, field) => {
    setUserData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    const { username, firstName, lastName, email, password, cmfpassword } = userData;

    // Validate if password and confirm password match
    if (password !== cmfpassword) {
        toastError('Password and Confirm Password do not match.')
        return;
    }
    
    // Validate for empty fields
    if (!username || !firstName || !lastName || !email || !password) {
        toastError('All fields are required.')
      return;
    }

    try {
      // API call to register the user
      const response = await axios.post(`${BACKEND_URL}/users/register`, {
        username,
        firstName,
        lastName,
        email,
        password,
      });

      // If successful
      toastSuccess('Account created successfully!')
      setUserData({
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        cmfpassword: "",
      }); // Clear the form

        navigate('/account/login');
    } catch (error) {
      // Handle API errors
      const errorMessage = error.response?.data?.message || "Registration failed. Please try again.";
      toastError(errorMessage)
    }
  };

  return (
    <div className="register__card__container">
      <div className="register__card">
        <div className="register__header">
          <h1>Create Account</h1>
        </div>

        <div className="register__inputs">
          <div className="reg__input__container">
            <label className="input__label">Username</label>
            <input
              type="text"
              className="register__input"
              value={userData.username}
              onChange={(e) => handleRegister(e.target.value, "username")}
            />
          </div>
          <div className="reg__input__container">
            <label className="input__label">First Name</label>
            <input
              type="text"
              className="register__input"
              value={userData.firstName}
              onChange={(e) => handleRegister(e.target.value, "firstName")}
            />
          </div>
          <div className="reg__input__container">
            <label className="input__label">Last Name</label>
            <input
              type="text"
              className="register__input"
              value={userData.lastName}
              onChange={(e) => handleRegister(e.target.value, "lastName")}
            />
          </div>
          <div className="reg__input__container">
            <label className="input__label">Email</label>
            <input
              type="email"
              className="register__input"
              value={userData.email}
              onChange={(e) => handleRegister(e.target.value, "email")}
              placeholder="example@gmail.com"
            />
          </div>
          <div className="reg__input__container">
            <label className="input__label">Password</label>
            <input
              type="password"
              className="register__input"
              value={userData.password}
              onChange={(e) => handleRegister(e.target.value, "password")}
            />
          </div>
          <div className="reg__input__container">
            <label className="input__label">Confirm Password</label>
            <input
              type="password"
              className="register__input"
              value={userData.cmfpassword}
              onChange={(e) => handleRegister(e.target.value, "cmfpassword")}
            />
          </div>
        </div>
        <div className="register__button__container">
          <button className="primary-btn" onClick={handleSubmit}>
            Create Account
          </button>
          <div className="m-2">
            Already have an account? <Link to="/account/login">Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterCard;

