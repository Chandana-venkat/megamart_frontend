import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Nav from "../components/Nav";
import Footer from "../components/Footer";

import "../styles/ProductDetails.css";
import API from "../services/api";

function ProductDetails() {

  const { id } = useParams();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("currentUser"));

  const [product, setProduct] = useState(null);

  useEffect(() => {

    API.get(`/products/${id}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

  }, [id]);

  // ADD TO CART
  const addToCart = async () => {

    if (!user) {
      alert("Please Login First");
      navigate("/login");
      return;
    }

    try {

      const existing = await API.get(
        `/cart?userEmail=${user.email}&productId=${product.id}`
      );

      if (existing.data.length > 0) {
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

    } catch (err) {
      console.log(err);
    }

  };

  // ADD TO WISHLIST
  const addToWishlist = async () => {

    if (!user) {
      alert("Please Login First");
      navigate("/login");
      return;
    }

    try {

      const existing = await API.get(
        `/wishlist?userEmail=${user.email}&productId=${product.id}`
      );

      if (existing.data.length > 0) {
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

    } catch (err) {
      console.log(err);
    }

  };

  // BUY NOW
  const buyNow = async () => {

    if (!user) {
      alert("Please Login First");
      navigate("/login");
      return;
    }

    try {

      // Clear old cart
      const cart = await API.get(`/cart?userEmail=${user.email}`);

      for (const item of cart.data) {
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

      navigate("/checkout");

    } catch (err) {
      console.log(err);
    }

  };

  if (!product) {
    return <h2 className="loading">Loading...</h2>;
  }

  return (
    <>
      <Nav />

      <div className="product-details">

        <div className="product-image">
          <img
            src={product.image}
            alt={product.name}
            className="details-image"
          />
        </div>

        <div className="product-info">

          <h1>{product.name}</h1>

          <h2>₹{product.price}</h2>

          {product.oldPrice && (
            <p>
              <del>₹{product.oldPrice}</del>
            </p>
          )}

          {product.discount && (
            <p>🔥 {product.discount}</p>
          )}

          <p>
            <strong>Category:</strong> {product.category}
          </p>

          <p>
            ⭐ {product.rating} ({product.reviews} reviews)
          </p>

          <p className="description">
            {product.description}
          </p>

          <p>
            <strong>Color:</strong> {product.color || "Available"}
          </p>

          <p>
            <strong>Size:</strong> {product.size || "Free Size"}
          </p>

          <p>
            <strong>Delivery:</strong> {product.delivery || "Free Delivery"}
          </p>

          <p>
            <strong>Warranty:</strong> {product.warranty || "No Warranty"}
          </p>

          <div className="buttons">

            <button onClick={addToCart}>
              🛒 Add Cart
            </button>

            <button onClick={addToWishlist}>
              ❤️ Wishlist
            </button>

            <button onClick={buyNow}>
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