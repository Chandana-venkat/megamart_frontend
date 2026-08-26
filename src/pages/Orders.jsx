import API from "../services/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import "../styles/Orders.css";

function Orders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

   
    const fetchOrders = async () => {
        try {
            const user = JSON.parse(
                localStorage.getItem("currentUser")
            );

            if (!user) {
                navigate("/login");
                return;
            }

            const response = await API.get(
                `/orders?email=${user.email}`
            );

            console.log("My Orders:", response.data);
            setOrders(response.data);

        } catch (error) {
            console.error("Orders Error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    
    const trackOrder = async (order) => {
        const statusList = [
            "Order Confirmed",
            "Packed",
            "Shipped",
            "Out for Delivery",
            "Delivered"
        ];

        const currentIndex = statusList.indexOf(order.status);

        if (order.status === "Cancelled") {
            alert("❌ This order is cancelled");
            return;
        }

        if (currentIndex === -1) {
            alert("Invalid order status");
            return;
        }

        if (order.status === "Delivered") {
            alert("✅ Order Already Delivered");
            return;
        }

        const updatedStatus = statusList[currentIndex + 1];

        try {
            const response = await API.patch(
                `/orders/${order.id}`,
                {
                    status: updatedStatus
                }
            );

            console.log("Updated Order:", response.data);

            setOrders(prev =>
                prev.map(o =>
                    o.id === order.id
                        ? {
                            ...o,
                            status: response.data.status
                        }
                        : o
                )
            );

            alert(`Order Status: ${updatedStatus}`);

        } catch (error) {
            console.error(
                "Track Order Error:",
                error
            );

            alert("Failed to update order status");
        }
    };
    const cancelOrder = async (id) => {
        const confirmCancel = window.confirm(
            "Are you sure you want to cancel this order?"
        );

        if (!confirmCancel) return;

        try {
            const response = await API.patch(
                `/orders/${id}`,
                {
                    status: "Cancelled"
                }
            );

            setOrders(prev =>
                prev.map(order =>
                    order.id === id
                        ? {
                            ...order,
                            status: response.data.status
                        }
                        : order
                )
            );

            alert("✅ Order Cancelled Successfully");

        } catch (error) {
            console.error(
                "Cancel Order Error:",
                error
            );

            alert("Failed to cancel order");
        }
    };

    if (loading) {
        return (
            <>
                <div className="orders-page">
                    <h2>Loading Orders...</h2>
                </div>

                <Footer />
            </>
        );
    }

    return (
        <>
            <div className="orders-page">

                <h1 className="orders-title">
                    🧾 My Orders
                </h1>

                {orders.length === 0 ? (
                    <h2>No Orders Found</h2>
                ) : (
                    orders.map((order) => (
                        <div
                            className="order-card"
                            key={order.id}
                        >

                            <div className="order-header">

                                <div>

                                    <h3 className="order-id">
                                        🧾 Order ID : {order.id}
                                    </h3>

                                    <p className="order-date">
                                        📅 Date : {
                                            order.orderDate ||
                                            order.date ||
                                            "N/A"
                                        }
                                    </p>

                                </div>

                                <span className="status">
                                    🚚 {
                                        order.status ||
                                        "Order Confirmed"
                                    }
                                </span>

                            </div>

                        
                            <div className="order-details">

                                <div className="section">

                                    <h3>
                                        👤 Customer Details
                                    </h3>

                                    <p>
                                        Name : {order.name}
                                    </p>

                                    <p>
                                        Email : {order.email}
                                    </p>

                                    <p>
                                        Mobile : {order.mobile}
                                    </p>

                                    <p>
                                        Payment : {order.payment}
                                    </p>

                                </div>

                                
                                <div className="section">

                                    <h3>
                                        📍 Delivery Address
                                    </h3>

                                    <p>
                                        {order.address}
                                    </p>

                                </div>

                            </div>

                           
                            <div className="section product-section">

                                <h3>
                                    🛒 Products
                                </h3>

                                {order.items &&
                                    order.items.length > 0 ? (

                                    order.items.map((item) => (

                                        <div
                                            className="product-item"
                                            key={item.id}
                                        >

                                            <span>
                                                {
                                                    item.productName ||
                                                    item.name ||
                                                    "Product"
                                                }
                                            </span>

                                            <span>
                                                ₹{item.price}
                                                <br />
                                                Qty : {item.quantity}
                                            </span>

                                        </div>

                                    ))

                                ) : (
                                    <p>
                                        No Items
                                    </p>
                                )}

                            </div>

                          
                            <h2 className="total">
                                💰 Total : ₹{order.total}
                            </h2>

                            
                            <div className="order-actions">

                               
                                <button
                                    type="button"
                                    className="track-btn"
                                    disabled={
                                        order.status === "Delivered" ||
                                        order.status === "Cancelled"
                                    }
                                    onClick={() =>
                                        trackOrder(order)
                                    }
                                >
                                    🚚 Track Order
                                </button>

                               
                                <button
                                    type="button"
                                    className="cancel-btn"
                                    disabled={
                                        order.status === "Delivered" ||
                                        order.status === "Cancelled"
                                    }
                                    onClick={() =>
                                        cancelOrder(order.id)
                                    }
                                >
                                    ❌ Cancel Order
                                </button>

                            </div>

                        </div>
                    ))
                )}

            </div>

            <Footer />
        </>
    );
}

export default Orders;