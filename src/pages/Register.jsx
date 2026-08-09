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

    setFormData({
      ...formData,
      [name]: value
    });

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
      else if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
      ) {

        error = "Enter valid email";

      }

    }

    if (name === "phone") {

      if (value === "") {

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

    setErrors({
      ...errors,
      [name]: error
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (Object.values(errors).some(err => err !== "")) {

      alert("Please fix errors");

      return;

    }

    try {

      // const check = await fetch(
      //   `http://localhost:3001/users?email=${formData.email}`
      // );

      // const users = await check.json();

      const check = await API.get(
        `/users?email=${formData.email}`
      );

      const users = check.data;

      if (users.length > 0) {

        alert("Email already registered");

        return;

      }

      // const user = {

      //   name: formData.name,

      //   email: formData.email,

      //   phone: formData.phone,

      //   password: formData.password

      // };
      const token =
        "token_" +
        Date.now() +
        "_" +
        Math.random().toString(36).substring(2, 12);

      const user = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        token
      };


      // const response = await fetch(
      //   "http://localhost:3001/users",
      //   {
      //     method:"POST",
      //     headers:{
      //       "Content-Type":"application/json"
      //     },
      //     body:JSON.stringify(user)
      //   }

      const response = await API.post(
        "/users",
        user
      );

      if (!response) {

        throw new Error("Registration Failed");

      }

      alert("Registration Successful");

      navigate("/login");


    }
    catch (error) {

      alert(error.message);

    }

  };

  return (

    <>

      <div className="register-container">

        <h1>Register</h1>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={formData.name}
            onChange={handleChange}
          />

          <p className="error">
            {errors.name}
          </p>

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
          />

          <p className="error">
            {errors.email}
          </p>

          <input
            type="text"
            name="phone"
            placeholder="Enter Phone"
            value={formData.phone}
            onChange={handleChange}
          />

          <p className="error">
            {errors.phone}
          </p>

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
          />

          <p className="error">
            {errors.password}
          </p>

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />

          <p className="error">
            {errors.confirmPassword}
          </p>

          <button>

            Register

          </button>

        </form>

      </div>

      <Footer />

    </>

  );

}
export default Register;