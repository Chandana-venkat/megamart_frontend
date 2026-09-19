import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Nav from "../components/Nav";
import Footer from "../components/Footer";

import "../styles/ProductDetails.css";
import API from "../services/api";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);

  // ==============================
  // GET PRODUCT
  // ==============================
  useEffect(() => {
    API.get(`/products/${id}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.log("Product Error:", err);
      });
  }, [id]);

  // ==============================
  // CHECK LOGIN
  // ==============================
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

  // ==============================
  // ADD TO CART
  // ==============================
  const addToCart = async () => {
    if (!checkLogin()) return;

    const user = JSON.parse(
      localStorage.getItem("currentUser")
    );

    try {
      const existing = await API.get(
        `/cart?userEmail=${encodeURIComponent(user.email)}`
      );

      const alreadyExists = existing.data.some(
        (item) =>
          String(item.productId) ===
          String(product.id)
      );

      if (alreadyExists) {
        alert("Already in Cart 🛒");
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

      navigate("/cart");
    } catch (error) {
      console.log("Cart Error:", error);
      console.log("Cart Status:", error.response?.status);
      console.log("Cart Backend Error:", error.response?.data);

      alert(
        `Unable to add to cart. Status: ${error.response?.status || "Unknown"
        }`
      );
    }
  };

  // ==============================
  // ADD TO WISHLIST
  // ==============================
  const addToWishlist = async () => {
    if (!checkLogin()) return;

    const user = JSON.parse(
      localStorage.getItem("currentUser")
    );

    try {
      // Get existing wishlist
      const existing = await API.get(
        `/wishlist?userEmail=${encodeURIComponent(user.email)}`
      );

      const alreadyExists = existing.data.some(
        (item) =>
          String(item.productId) ===
          String(product.id)
      );

      if (alreadyExists) {
        alert("Already in Wishlist ❤️");
        return;
      }

      // Add product to wishlist
      await API.post("/wishlist", {
        userEmail: user.email,
        productId: product.id,
        name: product.name,
        brand: product.brand,
        category: product.category,
        image: product.image,
        price: product.price,
        rating: product.rating
      });

      alert("Added To Wishlist ❤️");
    } catch (error) {
      console.log("Wishlist Error:", error);
      console.log(
        "Wishlist Status:",
        error.response?.status
      );
      console.log(
        "Wishlist Backend Error:",
        error.response?.data
      );

      alert(
        `Unable to add to wishlist. Status: ${error.response?.status || "Unknown"
        }`
      );
    }
  };

  // ==============================
  // BUY NOW
  // ==============================
  const buyNow = async () => {
    if (!checkLogin()) return;

    const user = JSON.parse(
      localStorage.getItem("currentUser")
    );

    try {
      // Get existing cart
      const response = await API.get(
        `/cart?userEmail=${encodeURIComponent(user.email)}`
      );

      // Clear old cart
      for (const item of response.data) {
        await API.delete(`/cart/${item.id}`);
      }

      // Add selected product
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

      // Go to checkout
      navigate("/checkout");
    } catch (error) {
      console.log("Buy Now Error:", error);
      console.log(
        "Buy Now Status:",
        error.response?.status
      );
      console.log(
        "Buy Now Backend Error:",
        error.response?.data
      );

      alert(
        `Unable to continue to checkout. Status: ${error.response?.status || "Unknown"
        }`
      );
    }
  };

  // ==============================
  // LOADING
  // ==============================
  if (!product) {
    return (
      <h2 className="loading">
        Loading...
      </h2>
    );
  }

  // ==============================
  // UI
  // ==============================
  return (
    <>
      <Nav />

      <div className="product-details">

        {/* PRODUCT IMAGE */}
        <div className="product-image">
          <img
            src={product.image}
            alt={product.name}
            className="details-image"
          />
        </div>

        {/* PRODUCT INFORMATION */}
        <div className="product-info">

          <h1>
            {product.name}
          </h1>

          <h2>
            ₹{product.price}
          </h2>

          {product.oldPrice && (
            <p>
              <del>
                ₹{product.oldPrice}
              </del>
            </p>
          )}

          {product.discount && (
            <p>
              🔥 {product.discount}
            </p>
          )}

          <p>
            <strong>
              Category:
            </strong>{" "}
            {product.category}
          </p>

          <p>
            ⭐ {product.rating} (
            {product.reviews} reviews)
          </p>

          <p className="description">
            {product.description}
          </p>

          <p>
            <strong>
              Color:
            </strong>{" "}
            {product.color || "Available"}
          </p>

          <p>
            <strong>
              Size:
            </strong>{" "}
            {product.size || "Free Size"}
          </p>

          <p>
            <strong>
              Delivery:
            </strong>{" "}
            {product.delivery ||
              "Free Delivery"}
          </p>

          <p>
            <strong>
              Warranty:
            </strong>{" "}
            {product.warranty ||
              "No Warranty"}
          </p>

          {/* BUTTONS */}
          <div className="buttons">

            <button
              onClick={addToCart}
            >
              🛒 Add Cart
            </button>

            <button
              onClick={addToWishlist}
            >
              ❤️ Wishlist
            </button>

            <button
              onClick={buyNow}
            >
              ⚡ Buy Now
            </button>

          </div>

        </div>
      </div>

      <Footer />
    </>
  );
}

export default ProductDetails;