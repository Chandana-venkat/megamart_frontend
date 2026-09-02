import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// import Nav from "../components/Nav";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import API from "../services/api";

import "../styles/Products.css";

function Women() {

  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  // useEffect(() => {

  //   fetch("http://localhost:3001/products")
  //     .then(res => res.json())
  //     .then(data => {

  //       const womenProducts = data.filter(product =>

  //         product.category === "Women"

  //       );

  //       setProducts(womenProducts);

  //     })
  //     .catch(err => console.log(err));

  // }, []);

  // useEffect(() => {

  //   // API.get("/products?category=Women")

  //   API.get("/products/category/Women")
  //     .then((res) => {

  //       setProducts(res.data);

  //     })
  //     .catch((err) => console.log(err));

  // }, []);

  useEffect(() => {
    API.get("/products/category/Women")
      .then((res) => {
        console.log("WOMEN PRODUCTS:", res.data);
        setProducts(res.data);
      })
      .catch((err) => {
        console.log("WOMEN ERROR:", err);
      });
  }, []);

  const addToCart = (product) => {

    const user =
      JSON.parse(localStorage.getItem("user"));

    if (!user) {

      alert("Please Login First");

      navigate("/login");

      return;

    }

    const cartKey =
      `cart_${user.email}`;

    let cart =
      JSON.parse(localStorage.getItem(cartKey)) || [];

    const exists =
      cart.find(item => item.id === product.id);

    if (exists) {

      exists.quantity += 1;

    }
    else {

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

  const addToWishlist = (product) => {

    const user =
      JSON.parse(localStorage.getItem("user"));

    if (!user) {

      alert("Please Login First");

      navigate("/login");

      return;

    }

    const wishlistKey =
      `wishlist_${user.email}`;

    let wishlist =
      JSON.parse(localStorage.getItem(wishlistKey)) || [];

    const exists =
      wishlist.find(item => item.id === product.id);

    if (exists) {

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

  const buyNow = (product) => {

    const user =
      JSON.parse(localStorage.getItem("user"));

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

      {/* <Nav /> */}

      <div className="products-page">

        <h1>

          👗 Women's Collection

        </h1>

        <div className="products-container">

          <div className="product-grid">

            {

              products.length === 0

                ?

                <h2>

                  No Women's Products Found

                </h2>

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

export default Women;