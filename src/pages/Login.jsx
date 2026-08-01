import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/Login.css";
import API from "../services/api";


function Login(){

  const navigate = useNavigate();


  const [data,setData]=useState({
    email:"",
    password:""
  });


  const [errors,setErrors]=useState({});



  const handleChange=(e)=>{

    const {name,value}=e.target;


    setData({
      ...data,
      [name]:value
    });



    let error="";


    if(name==="email"){

      if(value.trim()===""){

        error="Email is required";

      }
      else if(
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
      ){

        error="Enter valid email";

      }

    }



    if(name==="password"){

      if(value.trim()===""){

        error="Password is required";

      }
      else if(value.length<6){

        error="Minimum 6 characters required";

      }

    }



    setErrors({
      ...errors,
      [name]:error
    });


  };




  const handleLogin = async(e)=>{


    e.preventDefault();



    let newErrors={};



    if(data.email.trim()===""){

      newErrors.email="Email is required";

    }



    if(data.password.trim()===""){

      newErrors.password="Password is required";

    }



    setErrors(newErrors);



    if(Object.keys(newErrors).length>0){

      return;

    }




    try{


      // Get all users from backend

      const response = await API.get("/users");


      const users = response.data;



      console.log("Users:",users);



      const loggedUser = users.find(

        (user)=>

          user.email === data.email.trim()
          &&
          user.password === data.password.trim()

      );



      if(loggedUser){



        localStorage.setItem(

          "currentUser",

          JSON.stringify(loggedUser)

        );



        alert("Login Successful 🎉");



        navigate("/");


      }
      else{


        alert("Invalid Email Or Password");


      }



    }
    catch(error){


      console.log(error);

      alert("Server Error");


    }


  };




  return(

    <div className="login-container">


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




        <button type="submit">

          Login

        </button>



      </form>



    </div>

  );

}


export default Login;