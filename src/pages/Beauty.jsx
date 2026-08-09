import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import API from "../services/api";

import "../styles/Products.css";

function Beauty() {

  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {

    API.get("/products?category=Beauty")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.log(err));

  }, []);

  // Add To Cart

  const addToCart = (product) => {

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {

      alert("Please Login First");

      navigate("/login");

      return;

    }

    const cartKey = `cart_${user.email}`;

    let cart =
      JSON.parse(localStorage.getItem(cartKey)) || [];

    const exist =
      cart.find(item => item.id === product.id);

    if (exist) {

      exist.quantity += 1;

    } else {

      cart.push({
        ...product,
        quantity: 1
      });

    }

    localStorage.setItem(
      cartKey,
      JSON.stringify(cart)
    );

    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );

    alert("Added To Cart 🛒");

  };

  // Add To Wishlist

  const addToWishlist = (product) => {

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {

      alert("Please Login First");

      navigate("/login");

      return;

    }

    const wishlistKey = `wishlist_${user.email}`;

    let wishlist =
      JSON.parse(localStorage.getItem(wishlistKey)) || [];

    const exist =
      wishlist.find(item => item.id === product.id);

    if (exist) {

      alert("Already In Wishlist ❤️");

      return;

    }

    wishlist.push(product);

    localStorage.setItem(
      wishlistKey,
      JSON.stringify(wishlist)
    );

    alert("Added To Wishlist ❤️");

  };

  // Buy Now

  const buyNow = (product) => {

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {

      alert("Please Login First");

      navigate("/login");

      return;

    }

    const cartKey = `cart_${user.email}`;

    const buyProduct = [

      {
        ...product,
        quantity: 1
      }

    ];

    localStorage.setItem(
      cartKey,
      JSON.stringify(buyProduct)
    );

    localStorage.setItem(
      "cart",
      JSON.stringify(buyProduct)
    );

    navigate("/checkout");

  };

  return (

    <>

      <div className="products-page">

        <h1>💄 Beauty Products</h1>

        <div className="products-container">
          
    <div className="product-grid">

          {

            products.length === 0 ?

              <h2>No Beauty Products Found</h2>

              :

              products.map((product) => (

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
        </div>

      </div>

      <Footer />

    </>

  );

}

export default Beauty;