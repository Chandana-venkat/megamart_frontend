import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/AdminLogin.css";

function AdminLogin() {

    const navigate = useNavigate();

    const [admin, setAdmin] = useState({
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        setAdmin({
            ...admin,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            const response = await API.post(
                `/admin/login?email=${encodeURIComponent(admin.email)}&password=${encodeURIComponent(admin.password)}`
            );

            console.log("Admin Login Response:", response.data);

            localStorage.setItem("isAdmin", "true");
            localStorage.setItem("admin", JSON.stringify(response.data));

            alert("Welcome Admin 👨‍💼");

            navigate("/admin/dashboard");

        } catch (error) {

            console.error("Admin Login Error:", error);

            if (error.response) {

                alert(
                    error.response.data?.message ||
                    "Invalid Admin Credentials"
                );

            } else {

                alert("Backend server is not running");

            }

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="admin-login-page">

            <div className="admin-login-wrapper">


                <div className="admin-login-info">

                    <div className="admin-brand">
                        🛍 <span>MegaMart</span>
                    </div>

                    <h1>
                        Welcome back,
                        <br />
                        <span>Admin 👋</span>
                    </h1>

                    <p>
                        Manage your products, customers and orders
                        from your powerful admin dashboard.
                    </p>

                    <div className="admin-features">

                        <div>
                            <span>📦</span>
                            <div>
                                <b>Manage Products</b>
                                <small>Add, update and delete products</small>
                            </div>
                        </div>

                        <div>
                            <span>👥</span>
                            <div>
                                <b>Manage Customers</b>
                                <small>View registered customers</small>
                            </div>
                        </div>

                        <div>
                            <span>🛒</span>
                            <div>
                                <b>Manage Orders</b>
                                <small>Track and update orders</small>
                            </div>
                        </div>

                    </div>

                </div>

                <div className="admin-login-card">

                    <div className="login-icon">
                        🔐
                    </div>

                    <h2>
                        Admin Login
                    </h2>

                    <p className="login-subtitle">
                        Sign in to access your dashboard
                    </p>


                    <form onSubmit={handleSubmit}>

                        <div className="input-group">

                            <label>
                                Email Address
                            </label>

                            <div className="input-wrapper">

                                <span>📧</span>

                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter admin email"
                                    value={admin.email}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                        </div>


                        <div className="input-group">

                            <label>
                                Password
                            </label>

                            <div className="input-wrapper">

                                <span>🔒</span>

                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Enter password"
                                    value={admin.password}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                        </div>


                        <button
                            type="submit"
                            className="admin-login-button"
                            disabled={loading}
                        >

                            {loading
                                ? "Signing in..."
                                : "Sign In →"
                            }

                        </button>

                    </form>


                    <div className="login-footer">

                        🔒 Secure Admin Access

                    </div>

                </div>

            </div>

        </div>

    );

}

export default AdminLogin;