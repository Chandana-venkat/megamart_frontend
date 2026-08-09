import API from "../services/api";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import "../styles/Orders.css";
function Orders() {

    const [orders, setOrders] = useState([]);
    const trackOrder = async (order) => {

        const statusList = [
            "Order Confirmed",
            "Packed",
            "Shipped",
            "Out for Delivery",
            "Delivered"
        ];

        const currentIndex = statusList.indexOf(order.status);

        if (currentIndex === statusList.length - 1) {

            alert("✅ Order Already Delivered");

            return;
        }

        const updatedStatus = statusList[currentIndex + 1];

        try {

            await API.patch(`/orders/${order.id}`, {
                status: updatedStatus
            });

            setOrders(prev =>
                prev.map(o =>
                    o.id === order.id
                        ? { ...o, status: updatedStatus }
                        : o
                )
            );

        }

        catch (error) {

            console.log(error);

        }

    };
    const cancelOrder = async (id) => {

        const confirmCancel = window.confirm(
            "Are you sure you want to cancel this order?"
        );

        if (!confirmCancel) return;

        try {

            await API.delete(`/orders/${id}`);

            setOrders(prev =>
                prev.filter(order => order.id !== id)
            );

            alert("✅ Order Cancelled Successfully");

        }

        catch (error) {

            console.log(error);

            alert("Failed to cancel order");

        }

    };
    useEffect(() => {

        const fetchOrders = async () => {

            try {

                const user = JSON.parse(
                    localStorage.getItem("currentUser")
                );

                const response = await API.get("/orders");

                const myOrders = response.data.filter(
                    order => order.email === user?.email
                );

                setOrders(myOrders);

            }

            catch (error) {

                console.log(error);

            }

        };

        fetchOrders();

    }, []);
    return (

        <>

            <div className="orders-page">

                <h1 className="orders-title">
                    🧾 My Orders
                </h1>

                {
                    orders.length === 0 ?

                        (

                            <h2>No Orders Found</h2>

                        )

                        :

                        (

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
                                                📅 Date : {order.date}
                                            </p>

                                        </div>

                                        <span className="status">
                                            🚚 {order.status || "Order Confirmed"}
                                        </span>

                                    </div>

                                    <div className="order-details">

                                        <div className="section">

                                            <h3>👤 Customer Details</h3>

                                            <p>Name : {order.name}</p>

                                            <p>Email : {order.email}</p>

                                            <p>Mobile : {order.mobile}</p>

                                        </div>

                                        <div className="section">

                                            <h3>📍 Delivery Address</h3>

                                            <p>{order.address}</p>

                                        </div>

                                    </div>

                                    <div className="section product-section">

                                        <h3>🛒 Products</h3>

                                        {
                                            order.items?.map((item) => (

                                                <div
                                                    className="product-item"
                                                    key={item.id}
                                                >

                                                    <span>{item.name}</span>

                                                    <span>
                                                        ₹{item.price}
                                                        <br />
                                                        Qty : {item.quantity}
                                                    </span>

                                                </div>

                                            ))
                                        }

                                    </div>

                                    <h2 className="total">
                                        💰 Total : ₹{order.total}
                                    </h2>
                                    <div className="order-actions">

                                        <button
                                            type="button"
                                            className="track-btn"
                                            onClick={() => trackOrder(order)}
                                        >
                                            🚚 Track Order
                                        </button>

                                        <button
                                            type="button"
                                            className="cancel-btn"
                                            onClick={() => cancelOrder(order.id)}
                                        >
                                            ❌ Cancel Order
                                        </button>

                                    </div>

                                </div>

                            ))

                        )

                }

            </div>

            <Footer />

        </>

    );

}

export default Orders;