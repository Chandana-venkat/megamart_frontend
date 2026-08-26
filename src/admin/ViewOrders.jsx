import { useEffect, useState } from "react";
import "../styles/ViewOrders.css";
import API from "../services/api";

function ViewOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);

      const response = await API.get("/orders");

      setOrders(response.data || []);
    } catch (error) {
      console.error("Error loading orders:", error);

      
      const savedOrders =
        JSON.parse(localStorage.getItem("orders")) || [];

      setOrders(savedOrders);
    } finally {
      setLoading(false);
    }
  };


  const updateStatus = async (id, status) => {
    try {
      await API.put(`/ orders / ${id} `, {
        status: status,
      });

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === id
            ? { ...order, status: status }
            : order
        )
      );
    } catch (error) {
      console.error("Error updating order:", error);

    
      const savedOrders =
        JSON.parse(localStorage.getItem("orders")) || [];

      const updatedOrders = savedOrders.map((order) =>
        order.id === id
          ? { ...order, status: status }
          : order
      );

      localStorage.setItem(
        "orders",
        JSON.stringify(updatedOrders)
      );

      setOrders(updatedOrders);
    }
  };

 

  const deleteOrder = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this order?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await API.delete(`/ orders / ${id} `);

      setOrders((prevOrders) =>
        prevOrders.filter((order) => order.id !== id)
      );
    } catch (error) {
      console.error("Error deleting order:", error);

      
      const savedOrders =
        JSON.parse(localStorage.getItem("orders")) || [];

      const updatedOrders = savedOrders.filter(
        (order) => order.id !== id
      );

      localStorage.setItem(
        "orders",
        JSON.stringify(updatedOrders)
      );

      setOrders(updatedOrders);
    }
  };


  if (loading) {
    return (
      <div className="view-orders-container">
        <h2>View Orders</h2>

        <p className="loading-text">
          Loading orders...
        </p>
      </div>
    );
  }


  return (
    <div className="view-orders-container">

     
      <div className="orders-header">
        <h2>View Orders</h2>

        <span className="total-orders">
          Total Orders: {orders.length}
        </span>
      </div>

     
      {orders.length === 0 ? (
        <div className="no-orders">
          <h3>No Orders Found</h3>
          <p>
            There are currently no customer orders.
          </p>
        </div>
      ) : (
        <div className="orders-table-container">

          <table className="orders-table">

           
            <thead>
              <tr>
                <th>#</th>
                <th>Customer</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Shipping Address</th>
                <th>Products</th>
                <th>Total</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

           
            <tbody>

              {orders.map((order, index) => (

                <tr key={order.id || index}>

                 
                  <td>
                    {index + 1}
                  </td>

                
                  <td>
                    <strong>
                      {order.customer?.name ||
                        order.fullName ||
                        order.name ||
                        "N/A"}
                    </strong>
                  </td>

                 
                  <td>
                    {order.customer?.email ||
                      order.email ||
                      "N/A"}
                  </td>

                
                  <td>
                    {order.customer?.phone ||
                      order.phone ||
                      "N/A"}
                  </td>

                  <td>

                    {order.customer?.address ? (
                      <div className="shipping-address">

                        <span>
                          {order.customer.address}
                        </span>

                      </div>
                    ) : (
                      <div className="shipping-address">

                        {order.street && (
                          <span>
                            {order.street}
                          </span>
                        )}

                        {order.state && (
                          <span>
                            {order.state}
                          </span>
                        )}

                        {order.pincode && (
                          <span>
                            Pincode: {order.pincode}
                          </span>
                        )}

                        {!order.street &&
                          !order.state &&
                          !order.pincode && (
                            <span>
                              No Address
                            </span>
                          )}

                      </div>
                    )}

                  </td>

                

                  <td>

                    {order.items &&
                      order.items.length > 0 ? (

                      <div className="order-items">

                       
                        <strong className="items-count">
                          {order.items.length} item(s)
                        </strong>

                       
                        {order.items.map(
                          (item, itemIndex) => (

                            <div
                              className="order-item"
                              key={
                                item.id ||
                                item.productId ||
                                itemIndex
                              }
                            >

                           
                              <div className="order-product-image">

                                <img
                                  src={item.image}
                                  alt={
                                    item.productName ||
                                    item.name ||
                                    "Product"
                                  }
                                  onError={(e) => {
                                    e.target.style.display =
                                      "none";
                                  }}
                                />

                              </div>

                             
                              <div className="order-product-details">

                                <strong>
                                  {item.productName ||
                                    item.name ||
                                    "Unknown Product"}
                                </strong>

                                <span>
                                  Quantity:{" "}
                                  {item.quantity || 1}
                                </span>

                                {item.price !==
                                  undefined &&
                                  item.price !== null && (
                                    <span>
                                      ₹ {item.price}
                                    </span>
                                  )}

                              </div>

                            </div>

                          )
                        )}

                      </div>

                    ) : (

                      <span className="no-items">
                        No Items
                      </span>

                    )}

                  </td>

                
                  <td>

                    <strong className="order-total">

                      ₹{" "}
                      {order.total ||
                        order.totalAmount ||
                        0}

                    </strong>

                  </td>

                 
                  <td>

                    <select
                      className={`status - select ${order.status
                        ? order.status.toLowerCase()
                        : "pending"
                        } `}
                      value={
                        order.status || "Pending"
                      }
                      onChange={(e) =>
                        updateStatus(
                          order.id,
                          e.target.value
                        )
                      }
                    >

                      <option value="Pending">
                        Pending
                      </option>

                      <option value="Processing">
                        Processing
                      </option>

                      <option value="Shipped">
                        Shipped
                      </option>

                      <option value="Delivered">
                        Delivered
                      </option>

                      <option value="Cancelled">
                        Cancelled
                      </option>

                    </select>

                  </td>

                 
                  <td>

                    <button
                      className="delete-order-btn"
                      onClick={() =>
                        deleteOrder(order.id)
                      }
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>
      )}

    </div>
  );
}

export default ViewOrders;

