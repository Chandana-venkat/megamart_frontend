// import { useEffect, useState } from "react";
// import { useSearchParams, useParams } from "react-router-dom";

// import Nav from "../components/Nav";
// import Footer from "../components/Footer";
// import ProductCard from "../components/ProductCard";

// import "../styles/Products.css";


// function Products({search = ""}){

// const [products,setProducts]=useState([]);


// const { category } = useParams();





// useEffect(()=>{


// fetch("http://localhost:3001/products")

// .then(res=>res.json())

// .then(data=>{

// setProducts(data);

// })

// .catch(err=>console.log(err));


// },[]);






// // Search + Category Filter

// const filteredProducts = products.filter((product) => {

// const filteredProducts = products.filter((product)=>{

//  const searchMatch =
//  (
//    (product.name || "") +
//    (product.brand || "") +
//    (product.category || "")
//  )
//  .toLowerCase()
//  .includes(search.toLowerCase());


//  return searchMatch;

// });

//       case "men":
//       case "women":
//         categoryMatch = product.category === "Fashion";
//         break;

//       case "beauty":
//         categoryMatch =
//           product.category === "Beauty" ||
//           product.category === "Perfumes";
//         break;

//       case "genz":
//         categoryMatch =
//           product.category === "Fashion" ||
//           product.category === "Footwear" ||
//           product.category === "Watches";
//         break;

//       case "home":
//         categoryMatch = product.category === "Home";
//         break;

//       default:
//         categoryMatch =
//           product.category.toLowerCase() ===
//           category.toLowerCase();
//     }

//   }

//   return searchMatch && categoryMatch;

// });





// const addToCart=(product)=>{


// let cart =
// JSON.parse(localStorage.getItem("cart")) || [];



// const existing =
// cart.find(
// (item)=>item.id===product.id
// );



// if(existing){

// existing.quantity +=1;

// }

// else{


// cart.push({

// ...product,

// quantity:1

// });


// }



// localStorage.setItem(

// "cart",

// JSON.stringify(cart)

// );



// alert(
// `${product.name} added to cart 🛒`
// );



// };









// const addToWishlist=(product)=>{


// let wishlist =
// JSON.parse(localStorage.getItem("wishlist")) || [];



// const exists =
// wishlist.find(
// (item)=>item.id===product.id
// );



// if(!exists){


// wishlist.push(product);



// localStorage.setItem(

// "wishlist",

// JSON.stringify(wishlist)

// );



// alert("Added to Wishlist ❤️");


// }

// else{


// alert("Already in Wishlist");


// }


// };









// return(


// <>


// <Nav />




// <div className="products-page">


// <h1>

// {
// category 
// ?
// category + " Products 🛒"
// :
// "All Products 🛒"
// }

// </h1>





// <div className="products-container">



// {

// filteredProducts.length===0

// ?

// <h2>
// No Products Found
// </h2>



// :


// filteredProducts.map(product=>(



// <ProductCard


// key={product.id}


// product={product}


// onAddToCart={addToCart}


// onAddToWishlist={addToWishlist}


// />



// ))


// }



// </div>



// </div>






// <Footer />



// </>


// );


// }


// export default Products;


import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// import Nav from "../components/Nav";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";

import "../styles/Products.css";
import API from "../services/api";


function Products({ search = "" }) {


  const [products, setProducts] = useState([]);

  const { category } = useParams();



  useEffect(() => {

    // fetch("http://localhost:3001/products")

    //   .then((res) => res.json())

    //   .then((data) => {

    //     setProducts(data);

    //   })
    API.get("/products")
      .then((res)=>{

      setProducts(res.data);

      })
      .catch(err=>console.log(err));

    


  }, []);





  // Search + Category Filter

  const filteredProducts = products.filter((product) => {


    const searchMatch =

      (
        (product.name || "") +
        (product.brand || "") +
        (product.category || "")
      )

      .toLowerCase()

      .includes(search.toLowerCase());




    let categoryMatch = true;



    if (category) {


      switch (category.toLowerCase()) {


        case "men":

        case "women":

          categoryMatch =
            product.category === "Fashion";

          break;



        case "beauty":

          categoryMatch =

            product.category === "Beauty" ||

            product.category === "Perfumes";

          break;




        case "genz":

          categoryMatch =

            product.category === "Fashion" ||

            product.category === "Footwear" ||

            product.category === "Watches";

          break;




        case "home":

          categoryMatch =
            product.category === "Home";

          break;



        default:

          categoryMatch =

            (product.category || "")
            .toLowerCase()

            ===

            category.toLowerCase();


      }


    }




    return searchMatch && categoryMatch;


  });







  const addToCart = (product) => {


    let cart =
      JSON.parse(localStorage.getItem("cart")) || [];



    const existing =
      cart.find(
        (item) => item.id === product.id
      );



    if (existing) {


      existing.quantity += 1;


    }

    else {


      cart.push({

        ...product,

        quantity: 1

      });


    }



    localStorage.setItem(

      "cart",

      JSON.stringify(cart)

    );



    alert(`${product.name} added to cart 🛒`);


  };








  const addToWishlist = (product) => {


    let wishlist =

      JSON.parse(localStorage.getItem("wishlist")) || [];




    const exists =

      wishlist.find(

        (item) => item.id === product.id

      );




    if (!exists) {


      wishlist.push(product);



      localStorage.setItem(

        "wishlist",

        JSON.stringify(wishlist)

      );



      alert("Added to Wishlist ❤️");


    }

    else {


      alert("Already in Wishlist");


    }


  };









  return (

    <>


      


      <div className="products-page">


        <h1>

          {

            category

              ?

              category + " Products 🛒"

              :

              "All Products 🛒"

          }

        </h1>




        <div className="products-container">



          {

            filteredProducts.length === 0

              ?

              <h2>
                No Products Found
              </h2>


              :


              filteredProducts.map((product) => (


                <ProductCard


                  key={product.id}


                  product={product}


                  onAddToCart={addToCart}


                  onAddToWishlist={addToWishlist}


                />


              ))


          }



        </div>


      </div>




      


    </>

  );


}


export default Products;