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


  useEffect(() => {

    API.get(`/products/${id}`)
      .then((res) => {

        setProduct(res.data);

      })
      .catch((err) => {

        console.log("Product Error:", err);

      });

  }, [id]);


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
        item =>
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

    }
    catch (error) {

      console.log("Cart Error:", error);

      alert("Unable to add to cart");

    }

  };

  const addToWishlist = async () => {

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

      // Get existing cart
      const response = await API.get(
        `/cart?userEmail=${encodeURIComponent(user.email)}`
      );

      // Clear old cart
      for (const item of response.data) {

        await API.delete(
          `/cart/${item.id}`
        );

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

    }
    catch (error) {

      console.log("Buy Now Error:", error);

      alert("Unable to continue to checkout");

    }

  };


  if (!product) {

    return (
      <h2 className="loading">
        Loading...
      </h2>
    );

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