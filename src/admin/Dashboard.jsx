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

        API.get("/products")
            .then(res => {
                setProducts(res.data);
            });

        API.get("/users")
            .then(res => {
                setUsers(res.data);
            });

        API.get("/orders")
            .then(res => {
                setOrders(res.data);
            });

    }, []);
    const logout = () => {

        const confirmLogout = window.confirm("Are you sure you want to logout?");

        if (confirmLogout) {
            localStorage.removeItem("isAdmin");
            navigate("/admin");
        }

    };
    const chartData = {

        labels: ["Products", "Customers", "Orders"],

        datasets: [

            {

                label: "MegaMart Statistics",

                data: [

                    products.length,

                    users.length,

                    orders.length

                ],

                backgroundColor: [

                    "#3b82f6",

                    "#10b981",

                    "#f59e0b"

                ],

                borderRadius: 10

            }

        ]

    };
    const options = {
        responsive: true,
        maintainAspectRatio: false,

        plugins: {
            legend: {
                display: false,
            },
        },

        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1
                }
            }
        }
    };
    return (

        <div className="admin-dashboard">

            {/* Sidebar */}

            <aside className="sidebar">

                <h2 className="logo">
                    🛍 MegaMart
                </h2>

                <ul>

                    <li onClick={() => navigate("/admin/dashboard")}>
                        🏠 Dashboard
                    </li>

                    <li onClick={() => navigate("/admin/products")}>
                        📦 Products
                    </li>

                    <li onClick={() => navigate("/admin/add-product")}>
                        ➕ Add Product
                    </li>

                    <li onClick={() => navigate("/admin/orders")}>
                        🛒 Orders
                    </li>

                    <li onClick={() => navigate("/products")}>
                        🌐 Website
                    </li>

                    <li onClick={logout}>
                        🚪 Logout
                    </li>

                </ul>

            </aside>


            {/* Main Content */}

            <div className="main-content">

                <div className="top-bar">

                    <h1>
                        📊 Admin Dashboard
                    </h1>

                    <h3>
                        Welcome Admin 👋
                    </h3>

                </div>


                {/* Cards */}

                <div className="cards">

                    <div className="card blue">

                        <h2>{products.length}</h2>

                        <p>Total Products</p>

                    </div>


                    <div className="card green">

                        <h2>{users.length}</h2>

                        <p>Customers</p>

                    </div>


                    <div className="card orange">

                        <h2>{orders.length}</h2>

                        <p>Orders</p>

                    </div>


                    <div className="card purple">

                        <h2>₹75K</h2>

                        <p>Revenue</p>

                    </div>

                </div>


                {/* Graph */}

                <div className="graph-box">

                    <h2>📊 Monthly Statistics</h2>

                    <div className="chart-container">

                        <Bar
                            data={chartData}
                            options={options}
                        />

                    </div>

                </div>

            </div>

        </div>

    );
}

export default Dashboard;