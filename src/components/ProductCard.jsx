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

                brand: product.brand || "",

                category: product.category || "",

                image: product.image || "",

                price: product.price,

                rating: product.rating || 0,

                quantity: 1

            });


            alert("Added To Cart 🛒");

            navigate("/cart");


        } catch (error) {

            console.log(
                "Cart Error:",
                error.response?.data || error
            );

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

                brand: product.brand || "",

                category: product.category || "",

                image: product.image || "",

                price: product.price,

                rating: product.rating || 0,

                quantity: 1

            });


            alert("Added To Wishlist ❤️");


        } catch (error) {

            console.log(
                "Wishlist Error:",
                error.response?.data || error
            );

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

                brand: product.brand || "",

                category: product.category || "",

                image: product.image || "",

                price: product.price,

                rating: product.rating || 0,

                quantity: 1

            });


        
            navigate("/checkout");


        } catch (error) {

            console.log(
                "Buy Now Error:",
                error.response?.data || error
            );

            alert("Unable to continue to checkout");
        }
    };


    return (

        <div className="product-card">

            <div className="product-image-wrapper">



                <img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                />


               

                <span className="category-badge">
                    {product.category}
                </span>


               

                <button
                    className="heart-button"
                    onClick={handleWishlist}
                    aria-label="Add to wishlist"
                >
                    ♡
                </button>


            </div>

            <div className="product-content">

                <p className="brand">
                    {product.brand}
                </p>

                <h3 className="product-name">
                    {product.name}
                </h3>

                <div className="product-rating">


                    <span className="rating-box">
                        ★ {product.rating}
                    </span>


                    <span className="rating-text">
                        {product.reviews || 0} Reviews
                    </span>


                </div>

                <div className="price-row">


                    <h2 className="product-price">
                        ₹{product.price}
                    </h2>


                    <span className="delivery-text">
                        ⚡ Fast Delivery
                    </span>


                </div>

                <div className="product-buttons">


                    <button
                        className="cart-btn"
                        onClick={handleAddToCart}
                    >
                        🛒 Add Cart
                    </button>

                    <button
                        className="buy-btn"
                        onClick={buyNow}
                    >
                        ⚡ Buy Now
                    </button>


                </div>


            </div>


        </div>
    );
}
export default ProductCard;