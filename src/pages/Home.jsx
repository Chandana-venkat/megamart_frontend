import ProductCard from "../components/ProductCard";
// import Nav from "../components/Nav";
import Footer from "../components/Footer";
import products from "../products";

import { useNavigate } from "react-router-dom";

import "../styles/Home.css";


function Home() {


const navigate = useNavigate();



const featuredProducts =
products.slice(0,4);



const newArrivals =
products.slice(4,8);





const addToCart=(product)=>{


const user =
JSON.parse(localStorage.getItem("user"));



if(!user){

alert("Please Login First");

navigate("/login");

return;

}



const cartKey =
`cart_${user.email}`;



let cart =
JSON.parse(localStorage.getItem(cartKey)) || [];




const exists =
cart.find(
item=>item.id===product.id
);



if(exists){

exists.quantity +=1;

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









const addToWishlist=(product)=>{


const user =
JSON.parse(localStorage.getItem("user"));



if(!user){

alert("Please Login First");

navigate("/login");

return;

}



const key =
`wishlist_${user.email}`;



let wishlist =
JSON.parse(localStorage.getItem(key)) || [];



const exists =
wishlist.find(
item=>item.id===product.id
);



if(exists){

alert("Already In Wishlist ❤️");

return;

}



wishlist.push(product);



localStorage.setItem(
key,
JSON.stringify(wishlist)
);



alert("Added To Wishlist ❤️");


};








const buyNow=(product)=>{


const user =
JSON.parse(localStorage.getItem("user"));



if(!user){

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








return(


<>







{/* Hero */}

<div className="home-banner">


<h1>
Welcome To MegaMart 🛒
</h1>


<p>
Fashion | Beauty | Electronics | Lifestyle
</p>



<button

onClick={()=>
navigate("/products")
}

>

Shop Now

</button>



</div>









{/* Categories */}


<section>


<h2>
Shop By Category
</h2>


<div className="category-container">


<div>👕 Men</div>

<div>👗 Women</div>

<div>🧒 Kids</div>

<div>🏠 Home</div>

<div>💄 Beauty</div>

<div>👟 GenZ</div>


</div>


</section>








{/* Brands */}


<section>


<h2>
Trending Brands
</h2>


<div className="brand-container">


<h3>Nike</h3>

<h3>Adidas</h3>

<h3>Puma</h3>

<h3>H&M</h3>

<h3>Levis</h3>


</div>


</section>








{/* Featured */}


<section>


<h2>
Featured Products 🔥
</h2>



<div className="featured-section">


{

featuredProducts.map(product=>(


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


</section>








{/* New Arrivals */}


<section>


<h2>
New Arrivals ✨
</h2>



<div className="featured-section">


{

newArrivals.map(product=>(


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


</section>







<button

className="view-btn"

onClick={()=>
navigate("/products")
}

>

View All Products

</button>







<Footer />


</>


);


}


export default Home;


{/* Categories */}


{/* Categories */}

{/* Categories */}

<section className="category-section">

<h2>
Shop By Category
</h2>


<div className="category-container">


<div 
className="category-card"
onClick={()=>navigate("/mens")}
>

👕 Men

</div>



<div 
className="category-card"
onClick={()=>navigate("/women")}
>

👗 Women

</div>



<div 
className="category-card"
onClick={()=>navigate("/kids")}
>

🧒 Kids

</div>



<div 
className="category-card"
onClick={()=>navigate("/home-living")}
>

🏠 Home Living

</div>



<div 
className="category-card"
onClick={()=>navigate("/beauty")}
>

💄 Beauty

</div>



<div 
className="category-card"
onClick={()=>navigate("/genz")}
>

👟 GenZ

</div>



</div>

</section>