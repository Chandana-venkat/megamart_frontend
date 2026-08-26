import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AdminDashboard.css";
import API from "../services/api";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function Dashboard() {

    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState([]);
    const [orders, setOrders] = useState([]);

    useEffect(() => {

        const isAdmin = localStorage.getItem("isAdmin");

        if (isAdmin !== "true") {
            navigate("/admin");
            return;
        }

        API.get("/products")
            .then(res => setProducts(res.data))
            .catch(error => console.error("Products Error:", error));

        API.get("/users")
            .then(res => setUsers(res.data))
            .catch(error => console.error("Users Error:", error));

        API.get("/orders")
            .then(res => setOrders(res.data))
            .catch(error => console.error("Orders Error:", error));

    }, [navigate]);

    const revenue = orders.reduce(
        (total, order) => total + Number(order.total || 0),
        0
    );


    const logout = () => {

        const confirmLogout = window.confirm(
            "Are you sure you want to logout?"
        );

        if (confirmLogout) {

            localStorage.removeItem("isAdmin");
            localStorage.removeItem("admin");

            navigate("/admin");
        }
    };


    const chartData = {

        labels: [
            "Products",
            "Customers",
            "Orders"
        ],

        datasets: [
            {
                label: "MegaMart Statistics",

                data: [
                    products.length,
                    users.length,
                    orders.length
                ],

                backgroundColor: [
                    "#6366f1",
                    "#10b981",
                    "#f59e0b"
                ],

                borderRadius: 8,

                barThickness: 60
            }
        ]
    };


    const options = {

        responsive: true,

        maintainAspectRatio: false,

        plugins: {

            legend: {
                display: false
            },

            tooltip: {
                backgroundColor: "#0f172a",

                padding: 12,

                cornerRadius: 8
            }
        },

        scales: {

            x: {
                grid: {
                    display: false
                }
            },

            y: {

                beginAtZero: true,

                ticks: {
                    stepSize: 1
                },

                grid: {
                    color: "#e2e8f0"
                }
            }
        }
    };


    return (

        <div className="admin-dashboard">


            <aside className="sidebar">

                <div className="sidebar-header">

                    <div className="brand-icon">
                        🛍
                    </div>

                    <div>
                        <h2>MegaMart</h2>
                        <span>Admin Panel</span>
                    </div>

                </div>


                <div className="menu-title">
                    MAIN MENU
                </div>


                <ul className="sidebar-menu">

                    <li
                        className="active"
                        onClick={() =>
                            navigate("/admin/dashboard")
                        }
                    >
                        <span>📊</span>
                        Dashboard
                    </li>


                    <li
                        onClick={() =>
                            navigate("/admin/products")
                        }
                    >
                        <span>📦</span>
                        Products
                    </li>


                    <li
                        onClick={() =>
                            navigate("/admin/add-product")
                        }
                    >
                        <span>➕</span>
                        Add Product
                    </li>


                    <li
                        onClick={() =>
                            navigate("/admin/orders")
                        }
                    >
                        <span>🛒</span>
                        Orders
                    </li>


                    <li
                        onClick={() =>
                            navigate("/products")
                        }
                    >
                        <span>🌐</span>
                        Visit Website
                    </li>

                </ul>


                <div className="sidebar-bottom">

                    <div className="admin-profile">

                        <div className="profile-icon">
                            👨‍💼
                        </div>

                        <div>
                            <strong>Administrator</strong>
                            <small>Super Admin</small>
                        </div>

                    </div>


                    <button
                        className="logout-btn"
                        onClick={logout}
                    >
                        🚪 Logout
                    </button>

                </div>

            </aside>

            <main className="main-content">


                <header className="dashboard-header">

                    <div>

                        <p className="welcome-text">
                            Welcome back 👋
                        </p>

                        <h1>
                            Admin Dashboard
                        </h1>

                        <p className="subtitle">
                            Here's what's happening with your store today.
                        </p>

                    </div>


                    <div className="header-actions">

                        <button
                            className="website-btn"
                            onClick={() =>
                                navigate("/products")
                            }
                        >
                            🌐 View Store
                        </button>

                    </div>

                </header>

                <section className="stats-grid">


                    <div className="stat-card">

                        <div className="stat-top">

                            <div className="stat-icon blue-icon">
                                📦
                            </div>

                            <span className="growth">
                                +12%
                            </span>

                        </div>

                        <h2>
                            {products.length}
                        </h2>

                        <p>
                            Total Products
                        </p>

                    </div>


                    <div className="stat-card">

                        <div className="stat-top">

                            <div className="stat-icon green-icon">
                                👥
                            </div>

                            <span className="growth">
                                +8%
                            </span>

                        </div>

                        <h2>
                            {users.length}
                        </h2>

                        <p>
                            Total Customers
                        </p>

                    </div>


                    <div className="stat-card">

                        <div className="stat-top">

                            <div className="stat-icon orange-icon">
                                🛒
                            </div>

                            <span className="growth">
                                +15%
                            </span>

                        </div>

                        <h2>
                            {orders.length}
                        </h2>

                        <p>
                            Total Orders
                        </p>

                    </div>


                    <div className="stat-card">

                        <div className="stat-top">

                            <div className="stat-icon purple-icon">
                                💰
                            </div>

                            <span className="growth">
                                +10%
                            </span>

                        </div>

                        <h2>
                            ₹{revenue.toLocaleString("en-IN")}
                        </h2>

                        <p>
                            Total Revenue
                        </p>

                    </div>


                </section>


                <section className="dashboard-grid">


                    <div className="chart-card">

                        <div className="card-heading">

                            <div>
                                <h2>
                                    Store Overview
                                </h2>

                                <p>
                                    Current store statistics
                                </p>
                            </div>

                            <span className="chart-label">
                                Live Data
                            </span>

                        </div>


                        <div className="chart-container">

                            <Bar
                                data={chartData}
                                options={options}
                            />

                        </div>

                    </div>


                    <div className="quick-card">

                        <h2>
                            Quick Actions
                        </h2>

                        <p className="quick-subtitle">
                            Manage your store
                        </p>


                        <button
                            onClick={() =>
                                navigate("/admin/add-product")
                            }
                        >
                            <span>➕</span>

                            <div>
                                <strong>Add Product</strong>
                                <small>Create a new product</small>
                            </div>

                            <b>›</b>
                        </button>


                        <button
                            onClick={() =>
                                navigate("/admin/products")
                            }
                        >
                            <span>📦</span>

                            <div>
                                <strong>Manage Products</strong>
                                <small>Edit or delete products</small>
                            </div>

                            <b>›</b>
                        </button>


                        <button
                            onClick={() =>
                                navigate("/admin/orders")
                            }
                        >
                            <span>🛒</span>

                            <div>
                                <strong>View Orders</strong>
                                <small>Manage customer orders</small>
                            </div>

                            <b>›</b>
                        </button>

                    </div>

                </section>


                <div className="dashboard-footer">

                    <span>
                        © 2026 MegaMart Admin Panel
                    </span>

                    <span>
                        System Status: <b>● Online</b>
                    </span>

                </div>

            </main>

        </div>
    );
}

export default Dashboard;