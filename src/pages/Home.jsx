import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import products from "../products";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

function Home() {

    const navigate = useNavigate();

    const featuredProducts = products.slice(0, 4);
    const newArrivals = products.slice(4, 8);

    const addToCart = (product) => {

        const user = JSON.parse(localStorage.getItem("user"));

        if (!user) {
            alert("Please Login First");
            navigate("/login");
            return;
        }

        const cartKey = `cart_${user.email}`;

        let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

        const exists = cart.find(item => item.id === product.id);

        if (exists) {
            exists.quantity += 1;
        }
        else {
            cart.push({ ...product, quantity: 1 });
        }

        localStorage.setItem(cartKey, JSON.stringify(cart));
        localStorage.setItem("cart", JSON.stringify(cart));

        alert("Added To Cart 🛒");

    };


    const addToWishlist = (product) => {

        const user = JSON.parse(localStorage.getItem("user"));

        if (!user) {
            alert("Please Login First");
            navigate("/login");
            return;
        }

        const key = `wishlist_${user.email}`;

        let wishlist = JSON.parse(localStorage.getItem(key)) || [];

        const exists = wishlist.find(item => item.id === product.id);

        if (exists) {
            alert("Already In Wishlist ❤️");
            return;
        }

        wishlist.push(product);

        localStorage.setItem(key, JSON.stringify(wishlist));

        alert("Added To Wishlist ❤️");

    };


    const buyNow = (product) => {

        const user = JSON.parse(localStorage.getItem("user"));

        if (!user) {
            alert("Please Login First");
            navigate("/login");
            return;
        }

        localStorage.setItem(
            "buyProduct",
            JSON.stringify(product)
        );

        navigate("/checkout");

    };

    return (
        <>

            <section className="home-banner">
                <div className="banner-content">
                    <h1>Welcome To MegaMart 🛒</h1>
                    <p>Fashion • Beauty • Electronics • Lifestyle</p>

                    <button onClick={() => navigate("/products")}>
                        Shop Now
                    </button>

                </div>
            </section>



            <section className="category-section">

                <h2>Shop By Category</h2>

                <div className="category-container">

                    <div className="category-card" onClick={() => navigate("/mens")}>
                        👕
                        <span>Men</span>
                    </div>

                    <div className="category-card" onClick={() => navigate("/womens")}>
                        👗
                        <span>Women</span>
                    </div>

                    <div className="category-card" onClick={() => navigate("/kids")}>
                        🧒
                        <span>Kids</span>
                    </div>

                    <div className="category-card" onClick={() => navigate("/home-living")}>
                        🏠
                        <span>Home Living</span>
                    </div>

                    <div className="category-card" onClick={() => navigate("/beauty")}>
                        💄
                        <span>Beauty</span>
                    </div>

                    <div className="category-card" onClick={() => navigate("/genz")}>
                        👟
                        <span>GenZ</span>
                    </div>

                </div>

            </section>
            <section className="offer-banner">

                <h2>🔥 Mega Sale Up To 70% OFF</h2>

                <p>
                    Grab your favourite products before the offer ends
                </p>

                <button onClick={() => navigate("/products")}>
                    Explore Deals
                </button>

            </section>

            {/* BRANDS */}

            <section className="brand-section">

                <h2>Top Brands</h2>

                <div className="brand-container">

                    <div className="brand-card">
                        Adidas
                    </div>

                    <div className="brand-card">
                        Puma
                    </div>

                    <div className="brand-card">
                        Nike
                    </div>

                    <div className="brand-card">
                        Roadster
                    </div>

                    <div className="brand-card">
                        Levi's
                    </div>

                </div>


            </section>
            {/* FEATURED PRODUCTS */}

            <section className="product-section">

                <h2>Featured Products 🔥</h2>


                <div className="featured-section">

                    {
                        featuredProducts.map(product => (

                            <ProductCard

                                key={product.id}

                                product={product}

                                onAddToCart={addToCart}

                                onAddToWishlist={addToWishlist}

                                onBuyNow={buyNow}

                            />

                        ))
                    }

                </div>


            </section>

            {/* NEW ARRIVALS */}

            <section className="product-section">

                <h2>New Arrivals ✨</h2>


                <div className="featured-section">

                    {
                        newArrivals.map(product => (

                            <ProductCard

                                key={product.id}

                                product={product}

                                onAddToCart={addToCart}

                                onAddToWishlist={addToWishlist}

                                onBuyNow={buyNow}

                            />

                        ))
                    }

                </div>

            </section>

            <div className="view-all-container">

                <button
                    className="view-all-btn"
                    onClick={() => navigate("/products")}
                >

                    View All Products

                </button>

            </div>

            <Footer />

        </>

    );
}
export default Home;