import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ProductCard from "../components/ProductCard";
// import Nav from "../components/Nav";
import Footer from "../components/Footer";

import "../styles/products.css";


function HomeLiving() {


  const [products, setProducts] = useState([]);

  const navigate = useNavigate();



  useEffect(() => {


    fetch("http://localhost:3000/products")

      .then((res) => res.json())

      .then((data) => {


        const homeProducts = data.filter(
          product => product.category === "Home"
        );


        setProducts(homeProducts);


      })

      .catch((err) => console.log(err));


  }, []);






  const addToCart = (product) => {


    const user =
      JSON.parse(localStorage.getItem("user"));



    if(!user){

      alert("Please Login First");

      navigate("/login");

      return;

    }



    const cartKey = `cart_${user.email}`;



    let cart =
      JSON.parse(localStorage.getItem(cartKey)) || [];



    const exist =
      cart.find(item => item.id === product.id);



    if(exist){

      exist.quantity += 1;

    }
    else{

      cart.push({

        ...product,

        quantity:1

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



    if(!user){

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



    if(exist){

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







  return (

    <>


     


      <div className="products-page">


        <h1>
          🏠 Home & Living Collection
        </h1>



        <div className="products-container">


          {


            products.length === 0 ?


            (

              <h2>
                No Home Living Products Found
              </h2>

            )


            :


            (

              products.map((product)=>(


                <ProductCard


                  key={product.id}


                  product={product}


                  onAddToCart={addToCart}


                  onAddToWishlist={addToWishlist}


                />


              ))

            )


          }



        </div>


      </div>



      <Footer />


    </>


  );

}


export default HomeLiving;