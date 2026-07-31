// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "../styles/products.css";

// function Genz() {

//   const [products, setProducts] = useState([]);
//   const navigate = useNavigate();


//   useEffect(() => {

//     fetch("http://localhost:3001/products?category=Genz")
//       .then((res) => res.json())
//       .then((data) => setProducts(data))
//       .catch((err) => console.log(err));

//   }, []);



//   const addToCart = (product) => {

//     let cart =
//       JSON.parse(localStorage.getItem("cart")) || [];


//     const exist = cart.find(
//       (item) => item.id === product.id
//     );


//     if (!exist) {

//       cart.push({
//         ...product,
//         quantity: 1
//       });

//     }


//     localStorage.setItem(
//       "cart",
//       JSON.stringify(cart)
//     );


//     alert("Added to Cart");

//   };



//   const addWishlist = (product) => {

//     let wishlist =
//       JSON.parse(localStorage.getItem("wishlist")) || [];


//     const exist = wishlist.find(
//       (item) => item.id === product.id
//     );


//     if (!exist) {

//       wishlist.push(product);

//     }


//     localStorage.setItem(
//       "wishlist",
//       JSON.stringify(wishlist)
//     );


//     alert("Added to Wishlist");

//   };



//   return (

//     <div className="products-container">


//       <h2>Gen Z Collection</h2>


//       <div className="product-grid">


//         {
//           products.map((product)=>(


//             <div
//               className="product-card"
//               key={product.id}
//             >


//               <img
//                 src={product.image}
//                 alt={product.name}
//               />


//               <h3>
//                 {product.name}
//               </h3>


//               <p className="brand">
//                 {product.brand}
//               </p>


//               <h4>
//                 ₹{product.price}
//               </h4>


//               <p>
//                 ⭐ {product.rating}
//               </p>



//               <button
//                 onClick={() =>
//                   addToCart(product)
//                 }
//               >
//                 Add Cart
//               </button>



//               <button
//                 onClick={() =>
//                   addWishlist(product)
//                 }
//               >
//                 Wishlist
//               </button>



//               <button
//                 onClick={() =>
//                   navigate(`/product/${product.id}`)
//                 }
//               >
//                 View Details
//               </button>


//             </div>


//           ))
//         }


//       </div>


//     </div>

//   );
// }


// export default Genz;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ProductCard from "../components/ProductCard";
// import Nav from "../components/Nav";
import Footer from "../components/Footer";

import "../styles/products.css";


function Genz() {


  const [products, setProducts] = useState([]);

  const navigate = useNavigate();



  useEffect(() => {


    fetch("http://localhost:3000/products?category=GenZ&")

      .then((res) => res.json())

      .then((data) => {

        setProducts(data);

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



    const cartKey = `cart_${user.email}`;



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
return (

    <>


    


      <div className="products-page">


        <h1>
          🔥 Gen Z Collection
        </h1>



        <div className="products-container">


          {

            products.length === 0 ?


              (

                <h2>
                  No Gen Z Products Found
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


                  />


                ))

              )


          }



        </div>


      </div>



     


    </>


  );

}


export default Genz;