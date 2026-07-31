// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "../styles/AdminDashboard.css";

// function Dashboard() {

//     const navigate = useNavigate();

//     const [products, setProducts] = useState(0);
//     const [users, setUsers] = useState(0);
//     const [orders, setOrders] = useState(0);

//     useEffect(() => {

//         fetch("http://localhost:3001/products")
//             .then(res => res.json())
//             .then(data => setProducts(data.length));

//         fetch("http://localhost:3001/users")
//             .then(res => res.json())
//             .then(data => setUsers(data.length));

//         fetch("http://localhost:3001/orders")
//             .then(res => res.json())
//             .then(data => setOrders(data.length));

//     }, []);

//     const logout = () => {

//         localStorage.removeItem("isAdmin");

//         navigate("/admin");

//     };

//     return (

//         <div className="dashboard">

//             <h1>🛍 MegaMart Admin Dashboard</h1>

//             <div className="dashboard-cards">

//                 <div className="dashboard-card blue">

//                     <h2>{products}</h2>

//                     <p>Total Products</p>

//                 </div>

//                 <div className="dashboard-card green">

//                     <h2>{users}</h2>

//                     <p>Total Customers</p>

//                 </div>

//                 <div className="dashboard-card orange">

//                     <h2>{orders}</h2>

//                     <p>Total Orders</p>

//                 </div>

//             </div>

//             <div className="dashboard-buttons">

//                 <button
//                     className="add-btn"
//                     onClick={() => navigate("/admin/add-product")}
//                 >
//                     ➕ Add Product
//                 </button>

//             <button
//               className="view-btn"
//                 onClick={() => navigate("/admin/products")}
//             >
//                 📦 View Products
//             </button>
//                 <button
//                     className="orders-btn"
//                     onClick={() => navigate("/admin/orders")}
//                 >
//                     🛒 View Orders
//                 </button>

//                 <button
//                     className="logout-btn"
//                     onClick={logout}
//                 >
//                     🚪 Logout
//                 </button>


//                 <button

//             className="products-btn"

//             onClick={()=>
//             navigate("/products")
//             }

//             >

//             🌐 Go To Website

//             </button>

//             </div>

//         </div>

//     );

// }

// export default Dashboard;

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "../styles/AdminDashboard.css";

// function Dashboard() {

//     const navigate = useNavigate();

//     const [products, setProducts] = useState(0);
//     const [users, setUsers] = useState(0);
//     const [orders, setOrders] = useState(0);


//     useEffect(() => {

//         fetch("http://localhost:3001/products")
//             .then(res => res.json())
//             .then(data => setProducts(data.length))
//             .catch(err => console.log(err));


//         fetch("http://localhost:3001/users")
//             .then(res => res.json())
//             .then(data => setUsers(data.length))
//             .catch(err => console.log(err));


//         fetch("http://localhost:3001/orders")
//             .then(res => res.json())
//             .then(data => setOrders(data.length))
//             .catch(err => console.log(err));


//     }, []);



//     const logout = () => {

//         localStorage.removeItem("isAdmin");

//         navigate("/admin");

//     };



//     return (

//         <div className="dashboard">


//             <h1>
//                 🛍 MegaMart Admin Dashboard
//             </h1>



//             <div className="dashboard-cards">


//                 <div className="dashboard-card blue">

//                     <h2>{products}</h2>

//                     <p>Total Products</p>

//                 </div>



//                 <div className="dashboard-card green">

//                     <h2>{users}</h2>

//                     <p>Total Customers</p>

//                 </div>



//                 <div className="dashboard-card orange">

//                     <h2>{orders}</h2>

//                     <p>Total Orders</p>

//                 </div>


//             </div>





//             <div className="dashboard-buttons">



//                 <button
//                     className="add-btn"
//                     onClick={() => navigate("/admin/add-product")}
//                 >
//                     ➕ Add Product
//                 </button>




//                 <button
//                     className="view-btn"
//                     onClick={() => navigate("/admin/products")}
//                 >
//                     📦 View Products
//                 </button>




//                 <button
//                     className="orders-btn"
//                     onClick={() => navigate("/admin/orders")}
//                 >
//                     🛒 View Orders
//                 </button>





//                 <button
//                     className="logout-btn"
//                     onClick={logout}
//                 >
//                     🚪 Logout
//                 </button>





//                 <button
//                     className="products-btn"
//                     onClick={() => navigate("/products")}
//                 >
//                     🌐 Go To Website
//                 </button>



//             </div>



//         </div>

//     );

// }


// export default Dashboard;


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AdminDashboard.css";
import API from "../services/api";

function Dashboard() {

    const navigate = useNavigate();

    const [products, setProducts] = useState(0);
    const [users, setUsers] = useState(0);
    const [orders, setOrders] = useState(0);


    // useEffect(() => {

    //     fetch("http://localhost:3001/products")
    //         .then(res => res.json())
    //         .then(data => setProducts(data.length))
    //         .catch(err => console.log(err));


    //     fetch("http://localhost:3001/users")
    //         .then(res => res.json())
    //         .then(data => setUsers(data.length))
    //         .catch(err => console.log(err));


    //     fetch("http://localhost:3001/orders")
    //         .then(res => res.json())
    //         .then(data => setOrders(data.length))
    //         .catch(err => console.log(err));


    // }, []);

useEffect(() => {

  API.get("/products")
    .then(res => setProducts(res.data.length));

  API.get("/users")
    .then(res => setUsers(res.data.length));

  API.get("/orders")
    .then(res => setOrders(res.data.length));

}, []);

    const logout = () => {

        localStorage.removeItem("isAdmin");

        navigate("/admin");

    };



    return (

        <div className="dashboard">


            <h1>
                🛍 MegaMart Admin Dashboard
            </h1>



            <div className="dashboard-cards">


                <div className="dashboard-card blue">

                    <h2>{products}</h2>

                    <p>Total Products</p>

                </div>



                <div className="dashboard-card green">

                    <h2>{users}</h2>

                    <p>Total Customers</p>

                </div>



                <div className="dashboard-card orange">

                    <h2>{orders}</h2>

                    <p>Total Orders</p>

                </div>


            </div>




            <div className="dashboard-buttons">



                <button
                    className="add-btn"
                    onClick={() => navigate("/admin/add-product")}
                >

                    ➕ Add Product

                </button>




                <button
                    className="view-btn"
                    onClick={() => navigate("/admin/products")}
                >

                    📦 View Products

                </button>





                <button
                    className="orders-btn"
                    onClick={() => navigate("/admin/orders")}
                >

                    🛒 View Orders

                </button>





                <button
                    className="logout-btn"
                    onClick={logout}
                >

                    🚪 Logout

                </button>





                <button
                    className="products-btn"
                    onClick={() => navigate("/products")}
                >

                    🌐 Go To Website

                </button>



            </div>



        </div>

    );

}


export default Dashboard;