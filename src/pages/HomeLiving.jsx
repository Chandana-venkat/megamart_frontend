// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import ProductCard from "../components/ProductCard";
// // import Nav from "../components/Nav";
// import Footer from "../components/Footer";
// import "../styles/Products.css";
// function HomeLiving() {

//   const [products, setProducts] = useState([]);

//   const navigate = useNavigate();

//   useEffect(() => {

//     fetch("http://localhost:3000/products")

//       .then((res) => res.json())

//       .then((data) => {

//         console.log(data);

//         const homeProducts = data.filter(
//           product => product.category === "Home"
//         );

//         setProducts(homeProducts);

//       })

//       .catch((err) => console.log(err));

//   }, []);

//   const addToCart = (product) => {

//     const user =
//       JSON.parse(localStorage.getItem("user"));

//     if (!user) {

//       alert("Please Login First");

//       navigate("/login");

//       return;

//     }

//     const cartKey = `cart_${user.email}`;

//     let cart =
//       JSON.parse(localStorage.getItem(cartKey)) || [];

//     const exist =
//       cart.find(item => item.id === product.id);

//     if (exist) {

//       exist.quantity += 1;

//     } else {

//       cart.push({

//         ...product,

//         quantity: 1

//       });

//     }

//     localStorage.setItem(

//       cartKey,

//       JSON.stringify(cart)

//     );

//     localStorage.setItem(

//       "cart",

//       JSON.stringify(cart)

//     );

//     alert("Added To Cart 🛒");

//   };
// }
// export default HomeLiving;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ProductCard from "../components/ProductCard";
// import Nav from "../components/Nav";
import Footer from "../components/Footer";

import "../styles/Products.css";
import API from "../services/api";

function HomeLiving() {

  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {

    API.get("/products?category=Home")

      .then((res) => {

        console.log(res.data);

        setProducts(res.data);

      })

      .catch((err) => console.log(err));

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

    const exist =
      cart.find(item => item.id === product.id);

    if (exist) {

      exist.quantity += 1;

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

          🏠 Home & Living Collection

        </h1>

        <div className="products-container">

          <div className="product-grid">

            {

              products.length === 0 ?

              (

                <h2>

                  No Home Living Products Found

                </h2>

              )

              :

              (

                products.map((product) => (

                  <ProductCard

                    key={product.id}

                    product={product}

                    onAddToCart={addToCart}

                    onAddToWishlist={addToWishlist}

                    onBuyNow={buyNow}

                  />

                ))

              )

            }

          </div>

        </div>

      </div>

      <Footer />

    </>

  );

}

export default HomeLiving;