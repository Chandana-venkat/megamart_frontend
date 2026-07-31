import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
    increaseQuantity,
    decreaseQuantity,
    removeFromCart
} from "../redux/slices/cartSlice";

import "../styles/Cart.css";

function Cart() {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const cartItems = useSelector(
        (state) => state.cart.cartItems
    );

    const total = cartItems.reduce(

        (sum, item) =>

            sum + item.price * item.quantity,

        0

    );

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

                                                {

                                                    item.price *

                                                    item.quantity

                                                }

                                            </strong>

                                        </p>

                                        <div className="quantity">

                                            <button
                                                onClick={() =>
                                                    dispatch(
                                                        decreaseQuantity(
                                                            item.id
                                                        )
                                                    )
                                                }
                                            >
                                                -
                                            </button>

                                            <span>

                                                {item.quantity}

                                            </span>

                                            <button
                                                onClick={() =>
                                                    dispatch(
                                                        increaseQuantity(
                                                            item.id
                                                        )
                                                    )
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
                                                dispatch(
                                                    removeFromCart(
                                                        item.id
                                                    )
                                                )
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