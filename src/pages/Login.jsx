import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import API from "../services/api";

function Login() {

  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {

    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value
    }));

    let error = "";

    if (name === "email") {

      if (value.trim() === "") {
        error = "Email is required";
      }
      else if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
      ) {
        error = "Enter valid email";
      }

    }

    if (name === "password") {

      if (value.trim() === "") {
        error = "Password is required";
      }
      else if (value.length < 6) {
        error = "Minimum 6 characters required";
      }

    }

    setErrors((prev) => ({
      ...prev,
      [name]: error
    }));

  };


  const handleLogin = async (e) => {

    e.preventDefault();

    const newErrors = {};

    if (data.email.trim() === "") {
      newErrors.email = "Email is required";
    }

    if (data.password.trim() === "") {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {

      const response = await API.post(
        `/users/login?email=${encodeURIComponent(
          data.email.trim()
        )}&password=${encodeURIComponent(
          data.password.trim()
        )}`
      );

      const loggedUser = response.data;

      console.log("Logged User:", loggedUser);

      localStorage.setItem(
        "currentUser",
        JSON.stringify(loggedUser)
      );

      alert("Login Successful 🎉");

      navigate("/");

    }
    catch (error) {

      console.log("Login Error:", error);

      if (
        error.response &&
        error.response.status === 401
      ) {
        alert("Invalid Email Or Password");
      }
      else {
        alert("Server Error");
      }

    }

  };


  return (
    <div className="login-page">

      <div className="login-box">

        {/* LEFT - SHOPPING BAG */}
        <div className="bag-section">

          <div className="shopping-bag">
            🛍️
          </div>

        </div>


        {/* RIGHT - LOGIN FORM */}
        <div className="form-section">

          <h1>Login</h1>

          <form onSubmit={handleLogin}>

            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={data.email}
              onChange={handleChange}
            />

            <p className="error">
              {errors.email}
            </p>


            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={data.password}
              onChange={handleChange}
            />

            <p className="error">
              {errors.password}
            </p>


            <div className="forgot-password-link">
              <button
                type="button"
                onClick={() => navigate("/forgot-password")}
              >
                Forgot Password?
              </button>
            </div>


            <button type="submit">
              Login
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default Login;