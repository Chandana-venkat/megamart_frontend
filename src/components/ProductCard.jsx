import { useNavigate } from "react-router-dom";
import API from "../services/api";

import "../styles/ProductCard.css";

function ProductCard({ product }) {

    const navigate = useNavigate();

   
    const checkLogin = () => {

        const user = JSON.parse(
            localStorage.getItem("currentUser")
        );

        if (!user || !user.email) {

            alert("Please Login First");

            navigate("/login");

            return false;
        }

        return true;
    };
    const handleAddToCart = async () => {

        if (!checkLogin()) return;

        const user = JSON.parse(
            localStorage.getItem("currentUser")
        );

        try {

            const existing = await API.get(
                `/cart?userEmail=${encodeURIComponent(user.email)}`
            );

            const alreadyExists = existing.data.some(
                item =>
                    String(item.productId) ===
                    String(product.id)
            );

            if (alreadyExists) {

                alert("Product already in cart 🛒");

                return;
            }

            await API.post("/cart", {

                userEmail: user.email,

                productId: product.id,

                name: product.name,

                brand: product.brand,

                category: product.category,

                image: product.image,

                price: product.price,

                rating: product.rating,

                quantity: 1

            });

            alert("Added To Cart 🛒");

        }
        catch (error) {

            console.log("Cart Error:", error);

            alert("Unable to add product to cart");

        }

    };


 

    const handleWishlist = async () => {

        if (!checkLogin()) return;

        const user = JSON.parse(
            localStorage.getItem("currentUser")
        );

        try {

            const existing = await API.get(
                `/wishlist?userEmail=${encodeURIComponent(user.email)}`
            );

            const alreadyExists = existing.data.some(
                item =>
                    String(item.productId) ===
                    String(product.id)
            );

            if (alreadyExists) {

                alert("Already in Wishlist ❤️");

                return;
            }

            await API.post("/wishlist", {

                userEmail: user.email,

                productId: product.id,

                name: product.name,

                brand: product.brand,

                category: product.category,

                image: product.image,

                price: product.price,

                rating: product.rating,

                quantity: 1

            });

            alert("Added To Wishlist ❤️");

        }
        catch (error) {

            console.log("Wishlist Error:", error);

            alert("Unable to add to wishlist");

        }

    };


   

    const buyNow = async () => {

        if (!checkLogin()) return;

        const user = JSON.parse(
            localStorage.getItem("currentUser")
        );

        try {

            const response = await API.get(
                `/cart?userEmail=${encodeURIComponent(user.email)}`
            );

            
            for (const item of response.data) {

                await API.delete(
                    `/cart/${item.id}`
                );

            }

           
            await API.post("/cart", {

                userEmail: user.email,

                productId: product.id,

                name: product.name,

                brand: product.brand,

                category: product.category,

                image: product.image,

                price: product.price,

                rating: product.rating,

                quantity: 1

            });

           
            navigate("/checkout");

        }
        catch (error) {

            console.log("Buy Now Error:", error);

            alert("Unable to continue to checkout");

        }

    };


    return (

        <div className="product-card">

            <img
                src={product.image}
                alt={product.name}
                className="product-image"
            />

            <h3>
                {product.name}
            </h3>

            <p className="brand">
                {product.brand}
            </p>

            <h2>
                ₹{product.price}
            </h2>

            <p>
                ⭐ {product.rating}
            </p>

            <div className="product-buttons">

                <button
                    className="cart-btn"
                    onClick={handleAddToCart}
                >
                    🛒 Add Cart
                </button>

                <button
                    className="wishlist-btn"
                    onClick={handleWishlist}
                >
                    ❤️ Wishlist
                </button>

                <button
                    className="buy-btn"
                    onClick={buyNow}
                >
                    ⚡ Buy Now
                </button>

            </div>

        </div>

    );

}

export default ProductCard;