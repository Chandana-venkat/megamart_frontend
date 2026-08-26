import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Footer from "../components/Footer";
import "../styles/Register.css";
import API from "../services/api";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    let error = "";

    if (name === "name") {

      if (value.trim() === "") {
        error = "Name is required";
      }
      else if (!/^[A-Za-z ]+$/.test(value)) {
        error = "Only alphabets allowed";
      }

    }

    if (name === "email") {

      if (value.trim() === "") {
        error = "Email is required";
      }
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        error = "Enter valid email";
      }

    }

    if (name === "phone") {

      if (value.trim() === "") {
        error = "Phone number required";
      }
      else if (!/^[6-9][0-9]{9}$/.test(value)) {
        error = "Enter valid 10 digit number";
      }

    }

    if (name === "password") {

      if (value === "") {
        error = "Password required";
      }
      else if (value.length < 6) {
        error = "Minimum 6 characters required";
      }

    }

    if (name === "confirmPassword") {

      if (value === "") {
        error = "Confirm password required";
      }
      else if (value !== formData.password) {
        error = "Password not matching";
      }

    }

    setErrors((prev) => ({
      ...prev,
      [name]: error
    }));

  };


  const validateForm = () => {

    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    else if (!/^[A-Za-z ]+$/.test(formData.name)) {
      newErrors.name = "Only alphabets allowed";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter valid email";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number required";
    }
    else if (!/^[6-9][0-9]{9}$/.test(formData.phone)) {
      newErrors.phone = "Enter valid 10 digit number";
    }

    if (!formData.password) {
      newErrors.password = "Password required";
    }
    else if (formData.password.length < 6) {
      newErrors.password = "Minimum 6 characters required";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm password required";
    }
    else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Password not matching";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {

      const response = await API.get("/users");

      const users = response.data;

      const emailExists = users.some(
        (user) =>
          user.email?.toLowerCase() ===
          formData.email.trim().toLowerCase()
      );

      if (emailExists) {

        setErrors((prev) => ({
          ...prev,
          email: "Email already registered"
        }));

        return;
      }

      const user = {

        id:
          Date.now().toString() +
          Math.random().toString(36).substring(2, 8),

        name: formData.name.trim(),

        email: formData.email.trim(),

        phone: formData.phone.trim(),

        password: formData.password

      };

      await API.post("/users", user);

      alert("Registration Successful 🎉");

      navigate("/login");

    }
    catch (error) {

      console.log("Registration Error:", error);

      if (error.response) {

        alert(
          "Registration Failed: " +
          (error.response.data?.message ||
            error.response.data)
        );

      }
      else {

        alert("Server Error / Network Error");

      }

    }

  };


  return (

    <>

      <div className="register-page">

        <div className="register-wrapper">



          <div className="register-banner">

            <div className="banner-content">

              <div className="brand-icon">
                🛍️
              </div>

              <h1>
                Welcome to <span>MegaMart</span>
              </h1>

              <p>
                Create your account and discover
                amazing products at great prices.
              </p>

              <div className="benefits">

                <div>
                  <span>✓</span>
                  Easy & Secure Shopping
                </div>

                <div>
                  <span>✓</span>
                  Exclusive Deals
                </div>

                <div>
                  <span>✓</span>
                  Fast Delivery
                </div>

              </div>

            </div>

          </div>




          <div className="register-card">

            <div className="register-header">

              <h2>
                Create Account
              </h2>

              <p>
                Join MegaMart today
              </p>

            </div>


            <form onSubmit={handleSubmit}>



              <div className="input-group">

                <label>
                  Full Name
                </label>

                <div className="input-box">

                  <span>👤</span>

                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                  />

                </div>

                {errors.name && (
                  <small className="error">
                    {errors.name}
                  </small>
                )}

              </div>




              <div className="input-group">

                <label>
                  Email Address
                </label>

                <div className="input-box">

                  <span>✉️</span>

                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                  />

                </div>

                {errors.email && (
                  <small className="error">
                    {errors.email}
                  </small>
                )}

              </div>




              <div className="input-group">

                <label>
                  Mobile Number
                </label>

                <div className="input-box">

                  <span>📱</span>

                  <input
                    type="text"
                    name="phone"
                    placeholder="Enter 10 digit number"
                    maxLength="10"
                    value={formData.phone}
                    onChange={handleChange}
                  />

                </div>

                {errors.phone && (
                  <small className="error">
                    {errors.phone}
                  </small>
                )}

              </div>




              <div className="input-group">

                <label>
                  Password
                </label>

                <div className="input-box">

                  <span>🔒</span>

                  <input
                    type="password"
                    name="password"
                    placeholder="Create password"
                    value={formData.password}
                    onChange={handleChange}
                  />

                </div>

                {errors.password && (
                  <small className="error">
                    {errors.password}
                  </small>
                )}

              </div>




              <div className="input-group">

                <label>
                  Confirm Password
                </label>

                <div className="input-box">

                  <span>🔐</span>

                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />

                </div>

                {errors.confirmPassword && (
                  <small className="error">
                    {errors.confirmPassword}
                  </small>
                )}

              </div>


              <button
                type="submit"
                className="register-btn"
              >
                Create Account
                <span>→</span>
              </button>

            </form>


            <div className="login-link">

              Already have an account?

              <button
                type="button"
                onClick={() => navigate("/login")}
              >
                Login
              </button>

            </div>

          </div>

        </div>

      </div>

      <Footer />

    </>

  );

}

export default Register;