// // import { useEffect, useState } from "react";
// // import { useNavigate } from "react-router-dom";

// // import Nav from "../components/Nav";
// // import Footer from "../components/Footer";

// // import "../styles/Wishlist.css";


// // function Wishlist() {


// //   const navigate = useNavigate();

// //   const [wishlist, setWishlist] = useState([]);



// //   useEffect(() => {

// //     fetchWishlist();

// //   }, []);



// //   const fetchWishlist = () => {

// //     const user =
// //       JSON.parse(localStorage.getItem("user"));


// //     if(!user){

// //       setWishlist([]);

// //       return;

// //     }


// //     const key = "wishlist_" + user.email;


// //     const data =
// //       JSON.parse(localStorage.getItem(key)) || [];


// //     setWishlist(data);

// //   };




// //   // Increase quantity
// //   const increaseQty = (id)=>{


// //     const updated =
// //       wishlist.map(item =>

// //         item.id === id

// //         ?

// //         {
// //           ...item,
// //           quantity:(item.quantity || 1) + 1
// //         }

// //         :

// //         item

// //       );


// //     saveWishlist(updated);

// //   };




// //   // Decrease quantity
// //   const decreaseQty = (id)=>{


// //     const updated =
// //       wishlist.map(item =>

// //         item.id === id && item.quantity > 1

// //         ?

// //         {
// //           ...item,
// //           quantity:item.quantity - 1
// //         }

// //         :

// //         item

// //       );


// //     saveWishlist(updated);

// //   };





// //   const saveWishlist = (data)=>{


// //     const user =
// //       JSON.parse(localStorage.getItem("user"));


// //     const key =
// //       "wishlist_" + user.email;



// //     localStorage.setItem(

// //       key,

// //       JSON.stringify(data)

// //     );


// //     setWishlist(data);


// //   };





// //   // Remove wishlist
// //   const removeFromWishlist = (id)=>{


// //     const updated =
// //       wishlist.filter(
// //         item=>item.id !== id
// //       );


// //     saveWishlist(updated);


// //     alert("Product Removed ❌");


// //   };





// //   // Add to cart
// //   const addToCart = (product)=>{


// //     const user =
// //       JSON.parse(localStorage.getItem("user"));


// //     if(!user){

// //       alert("Please Login First");

// //       navigate("/login");

// //       return;

// //     }



// //     const cartKey =
// //       "cart_" + user.email;



// //     let cart =
// //       JSON.parse(localStorage.getItem(cartKey)) || [];



// //     const existing =
// //       cart.find(
// //         item=>item.id === product.id
// //       );



// //     if(existing){

// //       existing.quantity += product.quantity || 1;

// //     }

// //     else{


// //       cart.push({

// //         ...product,

// //         quantity: product.quantity || 1

// //       });


// //     }



// //     localStorage.setItem(

// //       cartKey,

// //       JSON.stringify(cart)

// //     );


// //     localStorage.setItem(

// //       "cart",

// //       JSON.stringify(cart)

// //     );



// //     alert("Added To Cart 🛒");


// //     navigate("/cart");


// //   };






// //   return (

// //     <>


// //       <Nav />


// //       <div className="wishlist-container">


// //         <h1>
// //           ❤️ My Wishlist
// //         </h1>



// //         {

// //         wishlist.length === 0

// //         ?

// //         (

// //           <h2>
// //             No Wishlist Products
// //           </h2>

// //         )


// //         :

// //         (

// //         <div className="wishlist-grid">


// //         {

// //         wishlist.map(product=>(


// //           <div

// //           className="wishlist-card"

// //           key={product.id}

// //           >



// //           <img

// //           src={product.image}

// //           alt={product.name}

// //           />



// //           <h3>

// //           {product.name}

// //           </h3>



// //           <p>

// //           ₹{product.price}

// //           </p>





// //           <div className="quantity">


// //           <button

// //           onClick={()=>decreaseQty(product.id)}

// //           >

// //           -

// //           </button>



// //           <span>

// //           {product.quantity || 1}

// //           </span>




// //           <button

// //           onClick={()=>increaseQty(product.id)}

// //           >

// //           +

// //           </button>



// //           </div>





// //           <div className="wishlist-buttons">


// //           <button

// //           onClick={()=>addToCart(product)}

// //           >

// //           🛒 Add Cart

// //           </button>




// //           <button

// //           className="remove-btn"

// //           onClick={()=>removeFromWishlist(product.id)}

// //           >

// //           ❌ Remove

// //           </button>



// //           </div>



// //           </div>


// //         ))

// //         }


// //         </div>

// //         )

// //         }



// //       </div>



// //       <Footer />


// //     </>

// //   );

// // }


// // export default Wishlist;

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// // import Nav from "../components/Nav";
// import Footer from "../components/Footer";

// import "../styles/Wishlist.css";


// function Wishlist(){


// const navigate = useNavigate();


// const [wishlist,setWishlist] = useState([]);




// useEffect(()=>{

//  fetchWishlist();

// },[]);





// const fetchWishlist=()=>{


// const user =

// JSON.parse(localStorage.getItem("user"));



// if(!user){

// setWishlist([]);

// return;

// }



// const key="wishlist_"+user.email;



// const data =

// JSON.parse(localStorage.getItem(key)) || [];



// setWishlist(data);


// };








// // Increase Quantity

// const increaseQty=(id)=>{


// const user =

// JSON.parse(localStorage.getItem("user"));



// const updatedWishlist = wishlist.map(item=>


// item.id===id

// ?

// {

// ...item,

// quantity:(item.quantity || 1)+1

// }


// :

// item



// );



// setWishlist(updatedWishlist);



// localStorage.setItem(

// "wishlist_"+user.email,

// JSON.stringify(updatedWishlist)

// );



// };







// // Decrease Quantity

// const decreaseQty=(id)=>{


// const user =

// JSON.parse(localStorage.getItem("user"));



// const updatedWishlist = wishlist.map(item=>


// item.id===id && item.quantity>1


// ?

// {

// ...item,

// quantity:item.quantity-1

// }


// :

// item



// );



// setWishlist(updatedWishlist);



// localStorage.setItem(

// "wishlist_"+user.email,

// JSON.stringify(updatedWishlist)

// );



// };








// // Remove Wishlist

// const removeFromWishlist=(id)=>{


// const user =

// JSON.parse(localStorage.getItem("user"));



// const updatedWishlist =

// wishlist.filter(

// item=>item.id!==id

// );



// setWishlist(updatedWishlist);



// localStorage.setItem(

// "wishlist_"+user.email,

// JSON.stringify(updatedWishlist)

// );



// };








// // Add Cart

// const addToCart=(product)=>{


// const user =

// JSON.parse(localStorage.getItem("user"));



// if(!user){

// navigate("/login");

// return;

// }




// const cartKey="cart_"+user.email;



// let cart =

// JSON.parse(localStorage.getItem(cartKey)) || [];





// const existing =

// cart.find(

// item=>item.id===product.id

// );




// if(existing){


// existing.quantity += product.quantity || 1;


// }

// else{


// cart.push({

// ...product,

// quantity:product.quantity || 1


// });


// }





// localStorage.setItem(

// cartKey,

// JSON.stringify(cart)

// );



// localStorage.setItem(

// "cart",

// JSON.stringify(cart)

// );



// alert("Added To Cart 🛒");


// };







// return(


// <>






// <div className="wishlist-container">


// <h1>

// ❤️ My Wishlist

// </h1>





// {

// wishlist.length===0

// ?

// <h2>

// No Wishlist Products

// </h2>


// :


// <div className="wishlist-grid">



// {

// wishlist.map(product=>(


// <div

// className="wishlist-card"

// key={product.id}

// >



// <img

// src={product.image}

// alt={product.name}

// />





// <h3>

// {product.name}

// </h3>





// <p>

// Price : ₹{product.price}

// </p>





// <div className="quantity">


// <button

// onClick={()=>decreaseQty(product.id)}

// >

// -

// </button>



// <span>

// {product.quantity || 1}

// </span>



// <button

// onClick={()=>increaseQty(product.id)}

// >

// +

// </button>



// </div>






// <h3>

// Total : ₹

// {

// product.price *

// (product.quantity || 1)

// }

// </h3>







// <button

// onClick={()=>addToCart(product)}

// >

// 🛒 Add Cart

// </button>







// <button

// className="remove-btn"

// onClick={()=>removeFromWishlist(product.id)}

// >

// ❌ Remove

// </button>





// </div>


// ))


// }



// </div>


// }



// </div>






// </>


// );


// }


// export default Wishlist;
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import "../styles/Wishlist.css";

function Wishlist() {

  const navigate = useNavigate();

  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      navigate("/login");
      return;
    }

    const key = `wishlist_${user.email}`;

    const data =
      JSON.parse(localStorage.getItem(key)) || [];

    setWishlist(data);

  }, [navigate]);

  const saveWishlist = (updatedWishlist) => {

    const user =
      JSON.parse(localStorage.getItem("user"));

    const key = `wishlist_${user.email}`;

    localStorage.setItem(
      key,
      JSON.stringify(updatedWishlist)
    );

    setWishlist(updatedWishlist);

  };

  const increaseQty = (id) => {

    const updatedWishlist = wishlist.map(item =>
      item.id === id
        ? {
            ...item,
            quantity: (item.quantity || 1) + 1
          }
        : item
    );

    saveWishlist(updatedWishlist);

  };

  const decreaseQty = (id) => {

    const updatedWishlist = wishlist.map(item =>
      item.id === id && item.quantity > 1
        ? {
            ...item,
            quantity: item.quantity - 1
          }
        : item
    );

    saveWishlist(updatedWishlist);

  };

  const removeFromWishlist = (id) => {

    const updatedWishlist =
      wishlist.filter(item => item.id !== id);

    saveWishlist(updatedWishlist);

  };

  const addToCart = (product) => {

    const user =
      JSON.parse(localStorage.getItem("user"));

    const cartKey = `cart_${user.email}`;

    let cart =
      JSON.parse(localStorage.getItem(cartKey)) || [];

    const existing =
      cart.find(item => item.id === product.id);

    if (existing) {

      existing.quantity += product.quantity || 1;

    } else {

      cart.push({
        ...product,
        quantity: product.quantity || 1
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

    navigate("/cart");

  };

  return (

    <>

      <div className="wishlist-container">

        <h1>❤️ My Wishlist</h1>

        {

          wishlist.length === 0 ?

            <h2>No Wishlist Products</h2>

            :

            <div className="wishlist-grid">

              {

                wishlist.map(product => (

                  <div
                    className="wishlist-card"
                    key={product.id}
                  >

                    <img
                      src={product.image}
                      alt={product.name}
                    />

                    <h3>{product.name}</h3>

                    <p>₹{product.price}</p>

                    <div className="quantity">

                      <button
                        onClick={() => decreaseQty(product.id)}
                      >
                        -
                      </button>

                      <span>
                        {product.quantity || 1}
                      </span>

                      <button
                        onClick={() => increaseQty(product.id)}
                      >
                        +
                      </button>

                    </div>

                    <h3>
                      Total : ₹
                      {product.price * (product.quantity || 1)}
                    </h3>

                    <button
                      onClick={() => addToCart(product)}
                    >
                      🛒 Add Cart
                    </button>

                    <button
                      className="remove-btn"
                      onClick={() => removeFromWishlist(product.id)}
                    >
                      ❌ Remove
                    </button>

                  </div>

                ))

              }

            </div>

        }

      </div>

      <Footer />

    </>

  );

}

export default Wishlist;