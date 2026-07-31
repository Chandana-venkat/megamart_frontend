import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AdminLogin.css";

function AdminLogin() {

    const navigate = useNavigate();

    const [admin, setAdmin] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {

        setAdmin({
            ...admin,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        if (
            admin.email === "admin@gmail.com" &&
            admin.password === "admin123"
        ) {

            localStorage.setItem("isAdmin", "true");

            alert("Welcome Admin 👨‍💼");

            navigate("/admin/dashboard");

        }

        else {

            alert("Invalid Admin Credentials");

        }

    };

    return (

        <div className="admin-login-page">

            <form
                className="admin-login-card"
                onSubmit={handleSubmit}
            >

                <h1>Admin Login</h1>

                <input
                    type="email"
                    name="email"
                    placeholder="Admin Email"
                    onChange={handleChange}
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    required
                />

                <button>
                    Login
                </button>

            </form>

        </div>

    );

}

export default AdminLogin;