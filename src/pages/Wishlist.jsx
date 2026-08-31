
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import "../styles/Wishlist.css";
import API from "../services/api";

function Wishlist() {
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));

    if (!user) {
      navigate("/login");
      return;
    }

    getWishlist();
  }, [navigate]);

  const getWishlist = async () => {
    const user = JSON.parse(localStorage.getItem("currentUser"));

    if (!user) {
      navigate("/login");
      return;
    }

    try {
      const res = await API.get(
        `/ wishlist ? userEmail = ${encodeURIComponent(user.email)} `
      );

      setWishlist(res.data || []);
    } catch (err) {
      console.log("Wishlist Error:", err);
    }
  };

  const removeFromWishlist = async (id) => {
    try {
      await API.delete(`/ wishlist / ${id} `);

      alert("Product Removed ❌");

      getWishlist();
    } catch (err) {
      console.log("Remove Wishlist Error:", err);
    }
  };

  const addToCart = async (product) => {
    const user = JSON.parse(localStorage.getItem("currentUser"));

    if (!user) {
      navigate("/login");
      return;
    }

    const productId = product.productId;

    try {
      const response = await API.get(
        `/ cart ? userEmail = ${encodeURIComponent(user.email)} `
      );

      const cartItem = response.data.find(
        item => String(item.productId) === String(productId)
      );

      if (cartItem) {
        await API.patch(`/ cart / ${cartItem.id} `, {
          quantity:
            (cartItem.quantity || 1) +
            (product.quantity || 1)
        });
      } else {
        await API.post("/cart", {
          productId: productId,
          userEmail: user.email,
          name: product.name,
          brand: product.brand || "",
          image: product.image,
          price: product.price,
          rating: product.rating || 0,
          quantity: product.quantity || 1
        });
      }

      alert("Added To Cart 🛒");

      navigate("/cart");
    } catch (err) {
      console.log("Add To Cart Error:", err);
      console.log("Backend Error:", err.response?.data);

      alert("Unable to add product to cart");
    }
  };

  const buyNow = (product) => {
    const user = JSON.parse(localStorage.getItem("currentUser"));

    if (!user) {
      navigate("/login");
      return;
    }

    const buyProduct = {
      productId: product.productId,
      name: product.name,
      brand: product.brand || "",
      image: product.image,
      price: product.price,
      rating: product.rating || 0,
      quantity: product.quantity || 1
    };

    localStorage.setItem(
      "buyProduct",
      JSON.stringify(buyProduct)
    );

    navigate("/checkout");
  };

  return (
    <>
      <div className="wishlist-container">
        <h1>❤️ My Wishlist</h1>

        {wishlist.length === 0 ? (
          <h2>No Wishlist Products</h2>
        ) : (
          <div className="wishlist-grid">
            {wishlist.map(product => (
              <div
                className="wishlist-card"
                key={product.id}
              >
                <img
                  src={product.image}
                  alt={product.name}
                />

                <h3>{product.name}</h3>

                <p>₹{product.price}</p>

                <h3>
                  Total: ₹{product.price}
                </h3>

                <button
                  className="cart-btn"
                  onClick={() => addToCart(product)}
                >
                  🛒 Add To Cart
                </button>

                <button
                  className="buy-btn"
                  onClick={() => buyNow(product)}
                >
                  ⚡ Buy Now
                </button>

                <button
                  className="remove-btn"
                  onClick={() =>
                    removeFromWishlist(product.id)
                  }
                >
                  ❌ Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

export default Wishlist;

