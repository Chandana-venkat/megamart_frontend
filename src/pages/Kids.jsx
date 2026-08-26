import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import API from "../services/api";

import "../styles/Products.css";

function Kids() {

  const navigate = useNavigate();

  const [products, setProducts] = useState([]);


  // Get Kids Products
  useEffect(() => {

    // API.get("/products?category=Kids")

    API.get("/products/category/Kids")
      .then((res) => {

        setProducts(res.data);

      })
      .catch((err) => {

        console.log(err);

      });

  }, []);


  // Add To Cart
  const addToCart = (product) => {

    const user = JSON.parse(
      localStorage.getItem("user")
    );

    if (!user) {

      alert("Please Login First");

      navigate("/login");

      return;
    }


    const cartKey = `cart_${user.email}`;

    let cart =
      JSON.parse(
        localStorage.getItem(cartKey)
      ) || [];


    const exists = cart.find(
      item => item.id === product.id
    );


    if (exists) {

      exists.quantity += 1;

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

    const user = JSON.parse(
      localStorage.getItem("user")
    );


    if (!user) {

      alert("Please Login First");

      navigate("/login");

      return;
    }


    const wishlistKey =
      `wishlist_${user.email}`;


    let wishlist =
      JSON.parse(
        localStorage.getItem(wishlistKey)
      ) || [];


    const exists = wishlist.find(
      item => item.id === product.id
    );


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


  // Buy Now
  const buyNow = (product) => {

    const user = JSON.parse(
      localStorage.getItem("user")
    );


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

      <div className="products-page">

        <h1>🧒 Kids Collection</h1>


        <div className="products-container">

          {/* Product Grid */}
          <div className="product-grid">

            {

              products.length === 0

                ?

                <h2>
                  No Kids Products Found
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


export default Kids;