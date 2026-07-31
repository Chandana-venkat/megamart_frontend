import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { addToCart } from "../redux/slices/cartSlice";
import { addToWishlist } from "../redux/slices/wishlistSlice";

import "../styles/ProductCard.css";

function ProductCard({ product }) {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleAddToCart = () => {

        const user = JSON.parse(localStorage.getItem("user"));

        if (!user) {

            alert("Please Login First");

            navigate("/login");

            return;

        }

        dispatch(addToCart(product));

        alert("Added To Cart 🛒");

    };

    const handleWishlist = () => {

        const user = JSON.parse(localStorage.getItem("user"));

        if (!user) {

            alert("Please Login First");

            navigate("/login");

            return;

        }

        dispatch(addToWishlist(product));

        alert("Added To Wishlist ❤️");

    };

    const buyNow = () => {

        localStorage.setItem(
            "buyProduct",
            JSON.stringify(product)
        );

        navigate("/checkout");

    };

    return (

        <div className="product-card">

            <img
                src={product.image}
                alt={product.name}
                className="product-image"
            />

            <h3>{product.name}</h3>

            <p>{product.brand}</p>

            <h2>₹{product.price}</h2>

            <p>⭐ {product.rating}</p>

       <div className="product-buttons">

    <button
        className="cart-btn"
        onClick={handleAddToCart}
    >
        Add To Cart
    </button>


    <button
        className="wishlist-btn"
        onClick={handleWishlist}
    >
        Wishlist
    </button>


    <button
        className="buy-btn"
        onClick={buyNow}
    >
        Buy Now
    </button>

</div>

        </div>

    );

}

export default ProductCard;