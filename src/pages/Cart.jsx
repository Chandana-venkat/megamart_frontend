import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/Cart.css";

function Cart() {

    const navigate = useNavigate();

    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {

        const user = JSON.parse(localStorage.getItem("currentUser"));

        if (!user) {

            navigate("/login");

            return;

        }

        getCart();

    }, []);

    const getCart = () => {

        const user = JSON.parse(localStorage.getItem("currentUser"));

        API.get(`/cart?userEmail=${user.email}`)
            .then((res) => {

                setCartItems(res.data);

            })
            .catch((err) => {

                console.log(err);

            });

    };

    const total = cartItems.reduce(

        (sum, item) => sum + item.price * item.quantity,

        0

    );

    const increaseQuantity = async (id) => {

        const item = cartItems.find(cart => cart.id === id);

        try {

            await API.patch(`/cart/${id}`, {
                quantity: item.quantity + 1
            });

            getCart();

        } catch (err) {

            console.log(err);

        }

    };

    const decreaseQuantity = async (id) => {

        const item = cartItems.find(cart => cart.id === id);

        if (item.quantity <= 1) return;

        try {

            await API.patch(`/cart/${id}`, {
                quantity: item.quantity - 1
            });

            getCart();

        } catch (err) {

            console.log(err);

        }

    };

    const removeFromCart = async (id) => {

        try {

            await API.delete(`/cart/${id}`);

            alert("Product Removed");

            getCart();

        } catch (err) {

            console.log(err);

        }

    };
    return (

        <div className="cart-container">

            <h1>🛒 Shopping Cart</h1>

            {

                cartItems.length === 0 ?

                    <h2>Your Cart is Empty</h2>

                    :

                    <>

                        {

                            cartItems.map((item) => (

                                <div
                                    key={item.id}
                                    className="cart-card"
                                >

                                    <div className="cart-image">

                                        <img
                                            src={item.image}
                                            alt={item.name}
                                        />

                                    </div>

                                    <div className="cart-details">

                                        <h3>{item.name}</h3>

                                        <p>₹{item.price}</p>

                                        <p>⭐ {item.rating}</p>

                                        <p>

                                            Subtotal :

                                            <strong>

                                                ₹
                                                {item.price * item.quantity}

                                            </strong>

                                        </p>

                                        <div className="quantity">

                                            <button
                                                onClick={() =>
                                                    decreaseQuantity(item.id)
                                                }
                                            >
                                                -
                                            </button>

                                            <span>

                                                {item.quantity}

                                            </span>

                                            <button
                                                onClick={() =>
                                                    increaseQuantity(item.id)
                                                }
                                            >
                                                +
                                            </button>

                                        </div>

                                    </div>

                                    <div className="cart-actions">

                                        <button

                                            className="remove-btn"

                                            onClick={() =>
                                                removeFromCart(item.id)
                                            }

                                        >

                                            ❌ Remove

                                        </button>

                                    </div>

                                </div>

                            ))

                        }
                        <div className="cart-total">

                            <h2>

                                Total : ₹{total}

                            </h2>

                            <button

                                className="checkout-btn"

                                onClick={() =>
                                    navigate("/checkout")
                                }

                            >

                                Proceed To Checkout

                            </button>

                        </div>

                    </>

            }

        </div>

    );

}

export default Cart;

