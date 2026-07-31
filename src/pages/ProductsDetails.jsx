import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Nav from "../components/Nav";
import Footer from "../components/Footer";

import "../styles/ProductDetails.css";
import API from "../services/api";


function ProductDetails() {


  const { id } = useParams();

  const navigate = useNavigate();



  const user =
  JSON.parse(localStorage.getItem("user"));



  const cartKey =
  user ? "cart_" + user.email : "cart";



  const wishlistKey =
  user ? "wishlist_" + user.email : "wishlist";



  const [product,setProduct] = useState(null);



  // useEffect(()=>{


  //   fetch(`http://localhost:3001/products/${id}`)

  //   .then(res=>res.json())

  //   .then(data=>setProduct(data))

  //   .catch(err=>console.log(err));


  // },[id]);
useEffect(()=>{


    API.get(`/products/${id}`)

    .then((res)=>{

        setProduct(res.data);

    })

    .catch((err)=>{

        console.log(err);

    });


},[id]);






  // ADD TO CART

  const addToCart=()=>{


    if(!user){

      alert("Please Login First");

      navigate("/login");

      return;

    }



    let cart =
    JSON.parse(localStorage.getItem(cartKey)) || [];




    const existing =
    cart.find(
      item=>item.id===product.id
    );




    if(existing){

      existing.quantity += 1;

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



    // checkout support

    localStorage.setItem(

      "cart",

      JSON.stringify(cart)

    );



    alert("Product Added To Cart 🛒");


    navigate("/cart");


  };









  // ADD TO WISHLIST

  const addToWishlist=()=>{


    if(!user){

      alert("Please Login First");

      navigate("/login");

      return;

    }




    let wishlist =

    JSON.parse(localStorage.getItem(wishlistKey)) || [];





    const exists =

    wishlist.find(

      item=>item.id===product.id

    );





    if(exists){


      alert("Already in Wishlist ❤️");

      return;


    }





    wishlist.push({

      ...product,

      quantity:1

    });






    localStorage.setItem(

      wishlistKey,

      JSON.stringify(wishlist)

    );





    alert("Added To Wishlist ❤️");


  };











  // BUY NOW

  const buyNow=()=>{


    if(!user){

      alert("Please Login First");

      navigate("/login");

      return;

    }





    const buyProduct=[


      {

        ...product,

        quantity:1

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









  if(!product){


    return(

      <h2 className="loading">

        Loading...

      </h2>

    );

  }








  return(


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





        {
          product.oldPrice &&

          <p>

          <del>
          ₹{product.oldPrice}
          </del>

          </p>

        }







        {
          product.discount &&

          <p>

          🔥 {product.discount}

          </p>

        }







        <p>

        <strong>
        Category:
        </strong>

        {" "}

        {product.category}

        </p>







        <p>

        ⭐ {product.rating}

        {" "}

        ({product.reviews} reviews)

        </p>








        <p className="description">

        {product.description}

        </p>








        <p>

        <strong>
        Color:
        </strong>

        {" "}

        {product.color || "Available"}

        </p>







        <p>

        <strong>
        Size:
        </strong>

        {" "}

        {product.size || "Free Size"}

        </p>







        <p>

        <strong>
        Delivery:
        </strong>

        {" "}

        {product.delivery || "Free Delivery"}

        </p>







        <p>

        <strong>
        Warranty:
        </strong>

        {" "}

        {product.warranty || "No Warranty"}

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