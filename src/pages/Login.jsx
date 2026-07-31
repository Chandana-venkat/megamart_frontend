// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Nav from "../components/Nav";
// import Footer from "../components/Footer";
// import "../styles/Login.css";

// function Login() {

//   const navigate = useNavigate();

//   const [data, setData] = useState({
//     email: "",
//     password: "",
//   });

//   const [errors, setErrors] = useState({});

//   const handleChange = (e) => {

//     const { name, value } = e.target;

//     setData({
//       ...data,
//       [name]: value,
//     });

//     let error = "";

//     if (name === "email") {

//       if (value.trim() === "") {

//         error = "Email is required";

//       } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {

//         error = "Enter valid email";

//       }

//     }

//     if (name === "password") {

//       if (value.trim() === "") {

//         error = "Password is required";

//       } else if (value.length < 6) {

//         error = "Password must be at least 6 characters";

//       }

//     }

//     setErrors({
//       ...errors,
//       [name]: error,
//     });

//   };

//   const login = async (e) => {

//     e.preventDefault();

//     let newErrors = {};

//     if (data.email.trim() === "") {

//       newErrors.email = "Email is required";

//     }

//     if (data.password.trim() === "") {

//       newErrors.password = "Password is required";

//     }

//     setErrors(newErrors);

//     if (Object.keys(newErrors).length > 0) return;

//     try {

//       const response = await fetch(
//         `http://localhost:3001/users?email=${data.email}&password=${data.password}`
//       );

//       if (!response.ok) {

//         throw new Error("Server Error");

//       }

//       const users = await response.json();

//       if (users.length > 0) {

//         const loggedUser = users[0];

//         localStorage.setItem(
//           "user",
//           JSON.stringify(loggedUser)
//         );

//         alert("Login Successful");

//         setData({
//           email: "",
//           password: "",
//         });

//         navigate("/");

//       } else {

//         alert("Invalid Email or Password");

//       }

//     } catch (error) {

//       alert(error.message);

//     }

//   };

//   return (
//     <>
//       <Nav />

//       <div className="register-container">

//         <h1>Login</h1>

//         <form onSubmit={login}>

//           <input
//             type="email"
//             name="email"
//             placeholder="Enter Email"
//             value={data.email}
//             onChange={handleChange}
//           />

//           <p className="error">
//             {errors.email}
//           </p>

//           <input
//             type="password"
//             name="password"
//             placeholder="Enter Password"
//             value={data.password}
//             onChange={handleChange}
//           />

//           <p className="error">
//             {errors.password}
//           </p>

//           <button type="submit">
//             Login
//           </button>

//         </form>

//       </div>

//       <Footer />
//     </>
//   );
// }

// export default Login;

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Footer from "../components/Footer";
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

      if(value===""){

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
const handleLogin = async (e) => {

  e.preventDefault();

  let newErrors = {};

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

    // const response = await fetch(
    //   `http://localhost:3001/users?email=${data.email}&password=${data.password}`
    // );

    // const users = await response.json();
    const response = await API.get(
  `/users?email=${data.email}&password=${data.password}`
   );

const users = response.data;

    if(users.length > 0){

        // localStorage.setItem(
        //     "user",
        //     JSON.stringify(users[0])
        // );

        localStorage.setItem(
      "currentUser",
         JSON.stringify(users[0])
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

    <>

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




        <button>

        Login

        </button>



      </form>


    </div>


   


    </>

  );

}


export default Login;