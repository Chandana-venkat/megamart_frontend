// // // import { useNavigate } from "react-router-dom";
// // // import API from "../services/api";
// // // import "../styles/ProductCard.css";

// // // function ProductCard({ product }) {


// // //     const navigate = useNavigate();

// // //     const checkLogin = () => {

// // //         const user = JSON.parse(
// // //             localStorage.getItem("currentUser")
// // //         );

// // //         if (!user || !user.email) {
// // //             alert("Please Login First");
// // //             navigate("/login");
// // //             return false;
// // //         }

// // //         return true;
// // //     };

// // //     const handleAddToCart = async () => {

// // //         if (!checkLogin()) return;

// // //         const user = JSON.parse(
// // //             localStorage.getItem("currentUser")
// // //         );

// // //         try {

// // //             const existing = await API.get(
// // //                 `/ cart ? userEmail = ${encodeURIComponent(user.email)} `
// // //             );

// // //             const alreadyExists = existing.data.some(
// // //                 item =>
// // //                     String(item.productId) ===
// // //                     String(product.id)
// // //             );

// // //             if (alreadyExists) {
// // //                 alert("Product already in cart 🛒");
// // //                 return;
// // //             }

// // //             await API.post("/cart", {
// // //                 userEmail: user.email,
// // //                 productId: product.id,
// // //                 name: product.name,
// // //                 brand: product.brand,
// // //                 category: product.category,
// // //                 image: product.image,
// // //                 price: product.price,
// // //                 rating: product.rating,
// // //                 quantity: 1
// // //             });

// // //             alert("Added To Cart 🛒");

// // //         } catch (error) {

// // //             console.log("Cart Error:", error);
// // //             alert("Unable to add product to cart");

// // //         }
// // //     };

// // //     const handleWishlist = async () => {

// // //         if (!checkLogin()) return;

// // //         const user = JSON.parse(
// // //             localStorage.getItem("currentUser")
// // //         );

// // //         try {

// // //             const existing = await API.get(
// // //                 `/ wishlist ? userEmail = ${encodeURIComponent(user.email)} `
// // //             );

// // //             const alreadyExists = existing.data.some(
// // //                 item =>
// // //                     String(item.productId) ===
// // //                     String(product.id)
// // //             );

// // //             if (alreadyExists) {
// // //                 alert("Already in Wishlist ❤️");
// // //                 return;
// // //             }

// // //             await API.post("/wishlist", {
// // //                 userEmail: user.email,
// // //                 productId: product.id,
// // //                 name: product.name,
// // //                 brand: product.brand,
// // //                 category: product.category,
// // //                 image: product.image,
// // //                 price: product.price,
// // //                 rating: product.rating,
// // //                 quantity: 1
// // //             });

// // //             alert("Added To Wishlist ❤️");

// // //         } catch (error) {

// // //             console.log("Wishlist Error:", error);
// // //             alert("Unable to add to wishlist");

// // //         }
// // //     };

// // //     const buyNow = async () => {

// // //         if (!checkLogin()) return;

// // //         const user = JSON.parse(
// // //             localStorage.getItem("currentUser")
// // //         );

// // //         try {

// // //             const response = await API.get(
// // //                 `/ cart ? userEmail = ${encodeURIComponent(user.email)} `
// // //             );

// // //             for (const item of response.data) {

// // //                 await API.delete(
// // //                     `/ cart / ${item.id} `
// // //                 );

// // //             }

// // //             await API.post("/cart", {
// // //                 userEmail: user.email,
// // //                 productId: product.id,
// // //                 name: product.name,
// // //                 brand: product.brand,
// // //                 category: product.category,
// // //                 image: product.image,
// // //                 price: product.price,
// // //                 rating: product.rating,
// // //                 quantity: 1
// // //             });

// // //             navigate("/checkout");

// // //         } catch (error) {

// // //             console.log("Buy Now Error:", error);
// // //             alert("Unable to continue to checkout");

// // //         }
// // //     };

// // //     return (

// // //         <div className="product-card">

// // //             <div className="product-image-wrapper">

// // //                 <img
// // //                     src={product.image}
// // //                     alt={product.name}
// // //                     className="product-image"
// // //                 />

// // //                 <button
// // //                     className="heart-button"
// // //                     onClick={handleWishlist}
// // //                     aria-label="Add to wishlist"
// // //                 >
// // //                     ♡
// // //                 </button>

// // //                 <span className="category-badge">
// // //                     {product.category}
// // //                 </span>

// // //             </div>

// // //             <div className="product-content">

// // //                 <p className="brand">
// // //                     {product.brand}
// // //                 </p>

// // //                 <h3 className="product-name">
// // //                     {product.name}
// // //                 </h3>

// // //                 <div className="product-rating">

// // //                     <span className="rating-box">
// // //                         ★ {product.rating}
// // //                     </span>

// // //                     <span className="rating-text">
// // //                         {product.reviews || 0} Reviews
// // //                     </span>

// // //                 </div>

// // //                 <div className="price-row">

// // //                     <h2 className="product-price">
// // //                         ₹{product.price}
// // //                     </h2>

// // //                     <span className="delivery-text">
// // //                         ⚡ Fast Delivery
// // //                     </span>

// // //                 </div>

// // //                 <div className="product-buttons">

// // //                     <button
// // //                         className="cart-btn"
// // //                         onClick={handleAddToCart}
// // //                     >
// // //                         🛒 Add Cart
// // //                     </button>

// // //                     <button
// // //                         className="buy-btn"
// // //                         onClick={buyNow}
// // //                     >
// // //                         Buy Now
// // //                     </button>

// // //                 </div>

// // //             </div>

// // //         </div>

// // //     );


// // // }

// // // export default ProductCard;
// // import { useNavigate } from "react-router-dom";
// // import API from "../services/api";
// // import "../styles/ProductCard.css";

// // function ProductCard({ product }) {
// //     const navigate = useNavigate();

// //     const checkLogin = () => {
// //         const user = JSON.parse(localStorage.getItem("currentUser"));

// //         if (!user || !user.email) {
// //             alert("Please Login First");
// //             navigate("/login");
// //             return false;
// //         }

// //         return true;
// //     };

// //     const handleAddToCart = async () => {
// //         if (!checkLogin()) return;

// //         const user = JSON.parse(localStorage.getItem("currentUser"));

// //         try {
// //             const existing = await API.get(
// //                 `/cart?userEmail=${encodeURIComponent(user.email)}`
// //             );

// //             const alreadyExists = existing.data.some(
// //                 item =>
// //                     String(item.productId) === String(product.id)
// //             );

// //             if (alreadyExists) {
// //                 alert("Product already in cart 🛒");
// //                 return;
// //             }

// //             await API.post("/cart", {
// //                 userEmail: user.email,
// //                 productId: product.id,
// //                 name: product.name,
// //                 brand: product.brand || "",
// //                 category: product.category || "",
// //                 image: product.image || "",
// //                 price: product.price,
// //                 rating: product.rating || 0,
// //                 quantity: 1
// //             });

// //             alert("Added To Cart 🛒");
// //             navigate("/cart");

// //         } catch (error) {
// //             console.log("Cart Error:", error.response?.data || error);
// //             alert("Unable to add product to cart");
// //         }
// //     };

// //     const handleWishlist = async () => {
// //         if (!checkLogin()) return;

// //         const user = JSON.parse(localStorage.getItem("currentUser"));

// //         try {
// //             const existing = await API.get(
// //                 `/wishlist?userEmail=${encodeURIComponent(user.email)}`
// //             );

// //             const alreadyExists = existing.data.some(
// //                 item =>
// //                     String(item.productId) === String(product.id)
// //             );

// //             if (alreadyExists) {
// //                 alert("Already in Wishlist ❤️");
// //                 return;
// //             }

// //             await API.post("/wishlist", {
// //                 userEmail: user.email,
// //                 productId: product.id,
// //                 name: product.name,
// //                 brand: product.brand || "",
// //                 category: product.category || "",
// //                 image: product.image || "",
// //                 price: product.price,
// //                 rating: product.rating || 0,
// //                 quantity: 1
// //             });

// //             alert("Added To Wishlist ❤️");

// //         } catch (error) {
// //             console.log(
// //                 "Wishlist Error:",
// //                 error.response?.data || error
// //             );

// //             alert("Unable to add to wishlist");
// //         }
// //     };

// //     const buyNow = async () => {
// //         if (!checkLogin()) return;

// //         const user = JSON.parse(localStorage.getItem("currentUser"));

// //         try {
// //             const response = await API.get(
// //                 `/cart?userEmail=${encodeURIComponent(user.email)}`
// //             );

// //             for (const item of response.data) {
// //                 await API.delete(`/cart/${item.id}`);
// //             }

// //             await API.post("/cart", {
// //                 userEmail: user.email,
// //                 productId: product.id,
// //                 name: product.name,
// //                 brand: product.brand || "",
// //                 category: product.category || "",
// //                 image: product.image || "",
// //                 price: product.price,
// //                 rating: product.rating || 0,
// //                 quantity: 1
// //             });

// //             navigate("/checkout");

// //         } catch (error) {
// //             console.log(
// //                 "Buy Now Error:",
// //                 error.response?.data || error
// //             );

// //             alert("Unable to continue to checkout");
// //         }
// //     };

// //     return (
// //         <div className="product-card">

// //             <div className="product-image-wrapper">

// //                 <img
// //                     src={product.image}
// //                     alt={product.name}
// //                     className="product-image"
// //                 />

// //                 <button
// //                     className="heart-button"
// //                     onClick={handleWishlist}
// //                     aria-label="Add to wishlist"
// //                 >
// //                     ♡
// //                 </button>

// //                 <span className="category-badge">
// //                     {product.category}
// //                 </span>

// //             </div>

// //             <div className="product-content">

// //                 <p className="brand">
// //                     {product.brand}
// //                 </p>

// //                 <h3 className="product-name">
// //                     {product.name}
// //                 </h3>

// //                 <div className="product-rating">

// //                     <span className="rating-box">
// //                         ★ {product.rating}
// //                     </span>

// //                     <span className="rating-text">
// //                         {product.reviews || 0} Reviews
// //                     </span>

// //                 </div>

// //                 <div className="price-row">

// //                     <h2 className="product-price">
// //                         ₹{product.price}
// //                     </h2>

// //                     <span className="delivery-text">
// //                         ⚡ Fast Delivery
// //                     </span>

// //                 </div>

// //                 <div className="product-buttons">

// //                     <button
// //                         className="cart-btn"
// //                         onClick={handleAddToCart}
// //                     >
// //                         🛒 Add Cart
// //                     </button>

// //                     <button
// //                         className="buy-btn"
// //                         onClick={buyNow}
// //                     >
// //                         ⚡ Buy Now
// //                     </button>

// //                 </div>

// //             </div>

// //         </div>
// //     );
// // }

// // export default ProductCard;

// // import { useNavigate } from "react-router-dom";
// // import API from "../services/api";
// // import "../styles/ProductCard.css";

// // function ProductCard({ product }) {

// //     const navigate = useNavigate();

// //     // ================================
// //     // LOGIN CHECK
// //     // ================================
// //     const checkLogin = () => {

// //         const user = JSON.parse(
// //             localStorage.getItem("currentUser")
// //         );

// //         if (!user || !user.email) {
// //             alert("Please Login First");
// //             navigate("/login");
// //             return false;
// //         }

// //         return true;
// //     };


// //     // ================================
// //     // ADD TO CART
// //     // ================================
// //     const handleAddToCart = async () => {

// //         if (!checkLogin()) return;

// //         const user = JSON.parse(
// //             localStorage.getItem("currentUser")
// //         );

// //         try {

// //             const existing = await API.get(
// //                 `/cart?userEmail=${encodeURIComponent(user.email)}`
// //             );

// //             const alreadyExists = existing.data.some(
// //                 item =>
// //                     String(item.productId) ===
// //                     String(product.id)
// //             );

// //             if (alreadyExists) {
// //                 alert("Product already in cart 🛒");
// //                 return;
// //             }

// //             await API.post("/cart", {
// //                 userEmail: user.email,
// //                 productId: product.id,
// //                 name: product.name,
// //                 brand: product.brand || "",
// //                 category: product.category || "",
// //                 image: product.image || "",
// //                 price: product.price,
// //                 rating: product.rating || 0,
// //                 quantity: 1
// //             });

// //             alert("Added To Cart 🛒");

// //             navigate("/cart");

// //         } catch (error) {

// //             console.log(
// //                 "Cart Error:",
// //                 error.response?.data || error
// //             );

// //             alert("Unable to add product to cart");
// //         }
// //     };


// //     // ================================
// //     // WISHLIST
// //     // ================================
// //     const handleWishlist = async () => {

// //         if (!checkLogin()) return;

// //         const user = JSON.parse(
// //             localStorage.getItem("currentUser")
// //         );

// //         try {

// //             const existing = await API.get(
// //                 `/wishlist?userEmail=${encodeURIComponent(user.email)}`
// //             );

// //             const alreadyExists = existing.data.some(
// //                 item =>
// //                     String(item.productId) ===
// //                     String(product.id)
// //             );

// //             if (alreadyExists) {
// //                 alert("Already in Wishlist ❤️");
// //                 return;
// //             }

// //             await API.post("/wishlist", {
// //                 userEmail: user.email,
// //                 productId: product.id,
// //                 name: product.name,
// //                 brand: product.brand || "",
// //                 category: product.category || "",
// //                 image: product.image || "",
// //                 price: product.price,
// //                 rating: product.rating || 0,
// //                 quantity: 1
// //             });

// //             alert("Added To Wishlist ❤️");

// //         } catch (error) {

// //             console.log(
// //                 "Wishlist Error:",
// //                 error.response?.data || error
// //             );

// //             alert("Unable to add to wishlist");
// //         }
// //     };


// //     // ================================
// //     // BUY NOW
// //     // ================================
// //     const buyNow = async () => {

// //         if (!checkLogin()) return;

// //         const user = JSON.parse(
// //             localStorage.getItem("currentUser")
// //         );

// //         try {

// //             const response = await API.get(
// //                 `/cart?userEmail=${encodeURIComponent(user.email)}`
// //             );

// //             // Remove existing cart items
// //             for (const item of response.data) {

// //                 await API.delete(
// //                     `/cart/${item.id}`
// //                 );
// //             }

// //             // Add selected product
// //             await API.post("/cart", {

// //                 userEmail: user.email,
// //                 productId: product.id,

// //                 name: product.name,
// //                 brand: product.brand || "",
// //                 category: product.category || "",

// //                 image: product.image || "",

// //                 price: product.price,
// //                 rating: product.rating || 0,

// //                 quantity: 1
// //             });

// //             navigate("/checkout");

// //         } catch (error) {

// //             console.log(
// //                 "Buy Now Error:",
// //                 error.response?.data || error
// //             );

// //             alert("Unable to continue to checkout");
// //         }
// //     };


// //     // ================================
// //     // UI
// //     // ================================
// //     return (

// //         <div className="product-card">

// //             {/* IMAGE + CATEGORY + WISHLIST */}
// //             <div className="product-image-wrapper">

// //                 {/* Category */}
// //                 <span className="category-badge">
// //                     {product.category}
// //                 </span>


// //                 {/* Wishlist */}
// //                 <button
// //                     className="heart-button"
// //                     onClick={handleWishlist}
// //                     aria-label="Add to wishlist"
// //                 >
// //                     ♡
// //                 </button>


// //                 {/* Product Image */}
// //                 <img
// //                     src={product.image}
// //                     alt={product.name}
// //                     className="product-image"
// //                 />

// //             </div>


// //             {/* PRODUCT CONTENT */}
// //             <div className="product-content">

// //                 {/* Brand */}
// //                 <p className="brand">
// //                     {product.brand}
// //                 </p>


// //                 {/* Product Name */}
// //                 <h3 className="product-name">
// //                     {product.name}
// //                 </h3>


// //                 {/* Rating */}
// //                 <div className="product-rating">

// //                     <span className="rating-box">
// //                         ★ {product.rating}
// //                     </span>

// //                     <span className="rating-text">
// //                         {product.reviews || 0} Reviews
// //                     </span>

// //                 </div>


// //                 {/* Price + Delivery */}
// //                 <div className="price-row">

// //                     <h2 className="product-price">
// //                         ₹{product.price}
// //                     </h2>

// //                     <span className="delivery-text">
// //                         ⚡ Fast Delivery
// //                     </span>

// //                 </div>


// //                 {/* Buttons */}
// //                 <div className="product-buttons">

// //                     <button
// //                         className="cart-btn"
// //                         onClick={handleAddToCart}
// //                     >
// //                         🛒 Add Cart
// //                     </button>


// //                     <button
// //                         className="buy-btn"
// //                         onClick={buyNow}
// //                     >
// //                         ⚡ Buy Now
// //                     </button>

// //                 </div>

// //             </div>

// //         </div>
// //     );
// // }

// // export default ProductCard;

// // import { useNavigate } from "react-router-dom";
// // import API from "../services/api";
// // import "../styles/ProductCard.css";

// // function ProductCard({ product }) {

// //     const navigate = useNavigate();


// //     const checkLogin = () => {

// //         const user = JSON.parse(
// //             localStorage.getItem("currentUser")
// //         );

// //         if (!user || !user.email) {
// //             alert("Please Login First");
// //             navigate("/login");
// //             return false;
// //         }

// //         return true;
// //     };


// //     // =========================================
// //     // ADD TO CART
// //     // =========================================
// //     const handleAddToCart = async () => {

// //         if (!checkLogin()) return;

// //         const user = JSON.parse(
// //             localStorage.getItem("currentUser")
// //         );

// //         try {

// //             const existing = await API.get(
// //                 `/cart?userEmail=${encodeURIComponent(user.email)}`
// //             );

// //             const alreadyExists = existing.data.some(
// //                 item =>
// //                     String(item.productId) ===
// //                     String(product.id)
// //             );

// //             if (alreadyExists) {

// //                 alert("Product already in cart 🛒");
// //                 return;
// //             }

// //             await API.post("/cart", {

// //                 userEmail: user.email,

// //                 productId: product.id,

// //                 name: product.name,

// //                 brand: product.brand || "",

// //                 category: product.category || "",

// //                 image: product.image || "",

// //                 price: product.price,

// //                 rating: product.rating || 0,

// //                 quantity: 1
// //             });

// //             alert("Added To Cart 🛒");

// //             navigate("/cart");

// //         } catch (error) {

// //             console.log(
// //                 "Cart Error:",
// //                 error.response?.data || error
// //             );

// //             alert("Unable to add product to cart");
// //         }
// //     };


// //     // =========================================
// //     // WISHLIST
// //     // =========================================
// //     const handleWishlist = async () => {

// //         if (!checkLogin()) return;

// //         const user = JSON.parse(
// //             localStorage.getItem("currentUser")
// //         );

// //         try {

// //             const existing = await API.get(
// //                 `/wishlist?userEmail=${encodeURIComponent(user.email)}`
// //             );

// //             const alreadyExists = existing.data.some(
// //                 item =>
// //                     String(item.productId) ===
// //                     String(product.id)
// //             );

// //             if (alreadyExists) {

// //                 alert("Already in Wishlist ❤️");
// //                 return;
// //             }

// //             await API.post("/wishlist", {

// //                 userEmail: user.email,

// //                 productId: product.id,

// //                 name: product.name,

// //                 brand: product.brand || "",

// //                 category: product.category || "",

// //                 image: product.image || "",

// //                 price: product.price,

// //                 rating: product.rating || 0,

// //                 quantity: 1
// //             });

// //             alert("Added To Wishlist ❤️");

// //         } catch (error) {

// //             console.log(
// //                 "Wishlist Error:",
// //                 error.response?.data || error
// //             );

// //             alert("Unable to add to wishlist");
// //         }
// //     };


// //     // =========================================
// //     // BUY NOW
// //     // =========================================
// //     const buyNow = async () => {

// //         if (!checkLogin()) return;

// //         const user = JSON.parse(
// //             localStorage.getItem("currentUser")
// //         );

// //         try {

// //             const response = await API.get(
// //                 `/cart?userEmail=${encodeURIComponent(user.email)}`
// //             );

// //             // Remove existing cart products
// //             for (const item of response.data) {

// //                 await API.delete(
// //                     `/cart/${item.id}`
// //                 );
// //             }

// //             // Add selected product
// //             await API.post("/cart", {

// //                 userEmail: user.email,

// //                 productId: product.id,

// //                 name: product.name,

// //                 brand: product.brand || "",

// //                 category: product.category || "",

// //                 image: product.image || "",

// //                 price: product.price,

// //                 rating: product.rating || 0,

// //                 quantity: 1
// //             });

// //             navigate("/checkout");

// //         } catch (error) {

// //             console.log(
// //                 "Buy Now Error:",
// //                 error.response?.data || error
// //             );

// //             alert("Unable to continue to checkout");
// //         }
// //     };


// //     // =========================================
// //     // PRODUCT CARD UI
// //     // =========================================
// //     return (

// //         <div className="product-card">

// //             {/* =================================
// //                 TOP SECTION
// //             ================================= */}

// //             <div className="product-top">

// //                 <span className="category-badge">
// //                     {product.category}
// //                 </span>

// //                 <button
// //                     className="heart-button"
// //                     onClick={handleWishlist}
// //                     aria-label="Add to wishlist"
// //                 >
// //                     ♡
// //                 </button>

// //             </div>


// //             {/* =================================
// //                 PRODUCT IMAGE
// //             ================================= */}

// //             <div className="product-image-wrapper">

// //                 <img
// //                     src={product.image}
// //                     alt={product.name}
// //                     className="product-image"
// //                 />

// //             </div>


// //             {/* =================================
// //                 PRODUCT INFORMATION
// //             ================================= */}

// //             <div className="product-content">

// //                 {/* BRAND */}

// //                 <p className="brand">
// //                     {product.brand}
// //                 </p>


// //                 {/* PRODUCT NAME */}

// //                 <h3 className="product-name">
// //                     {product.name}
// //                 </h3>


// //                 {/* RATING */}

// //                 <div className="product-rating">

// //                     <span className="rating-box">
// //                         ★ {product.rating}
// //                     </span>

// //                     <span className="rating-text">
// //                         {product.reviews || 0} Reviews
// //                     </span>

// //                 </div>


// //                 {/* PRICE + DELIVERY */}

// //                 <div className="price-row">

// //                     <h2 className="product-price">
// //                         ₹{product.price}
// //                     </h2>

// //                     <span className="delivery-text">
// //                         ⚡ Fast Delivery
// //                     </span>

// //                 </div>


// //                 {/* =================================
// //                     BUTTONS
// //                 ================================= */}

// //                 <div className="product-buttons">

// //                     <button
// //                         className="cart-btn"
// //                         onClick={handleAddToCart}
// //                     >
// //                         🛒 Add Cart
// //                     </button>

// //                     <button
// //                         className="buy-btn"
// //                         onClick={buyNow}
// //                     >
// //                         ⚡ Buy Now
// //                     </button>

// //                 </div>

// //             </div>

// //         </div>
// //     );
// // }

// // export default ProductCard;

// import { useNavigate } from "react-router-dom";
// import API from "../services/api";
// import "../styles/ProductCard.css";

// function ProductCard({ product }) {

//     const navigate = useNavigate();

//     const checkLogin = () => {
//         const user = JSON.parse(
//             localStorage.getItem("currentUser")
//         );

//         if (!user || !user.email) {
//             alert("Please Login First");
//             navigate("/login");
//             return false;
//         }

//         return true;
//     };

//     const handleAddToCart = async () => {

//         if (!checkLogin()) return;

//         const user = JSON.parse(
//             localStorage.getItem("currentUser")
//         );

//         try {

//             const existing = await API.get(
//                 `/cart?userEmail=${encodeURIComponent(user.email)}`
//             );

//             const alreadyExists = existing.data.some(
//                 item =>
//                     String(item.productId) === String(product.id)
//             );

//             if (alreadyExists) {
//                 alert("Product already in cart 🛒");
//                 return;
//             }

//             await API.post("/cart", {
//                 userEmail: user.email,
//                 productId: product.id,
//                 name: product.name,
//                 brand: product.brand || "",
//                 category: product.category || "",
//                 image: product.image || "",
//                 price: product.price,
//                 rating: product.rating || 0,
//                 quantity: 1
//             });

//             alert("Added To Cart 🛒");
//             navigate("/cart");

//         } catch (error) {

//             console.log(
//                 "Cart Error:",
//                 error.response?.data || error
//             );

//             alert("Unable to add product to cart");
//         }
//     };

//     const handleWishlist = async () => {

//         if (!checkLogin()) return;

//         const user = JSON.parse(
//             localStorage.getItem("currentUser")
//         );

//         try {

//             const existing = await API.get(
//                 `/wishlist?userEmail=${encodeURIComponent(user.email)}`
//             );

//             const alreadyExists = existing.data.some(
//                 item =>
//                     String(item.productId) === String(product.id)
//             );

//             if (alreadyExists) {
//                 alert("Already in Wishlist ❤️");
//                 return;
//             }

//             await API.post("/wishlist", {
//                 userEmail: user.email,
//                 productId: product.id,
//                 name: product.name,
//                 brand: product.brand || "",
//                 category: product.category || "",
//                 image: product.image || "",
//                 price: product.price,
//                 rating: product.rating || 0,
//                 quantity: 1
//             });

//             alert("Added To Wishlist ❤️");

//         } catch (error) {

//             console.log(
//                 "Wishlist Error:",
//                 error.response?.data || error
//             );

//             alert("Unable to add to wishlist");
//         }
//     };

//     const buyNow = async () => {

//         if (!checkLogin()) return;

//         const user = JSON.parse(
//             localStorage.getItem("currentUser")
//         );

//         try {

//             const response = await API.get(
//                 `/cart?userEmail=${encodeURIComponent(user.email)}`
//             );

//             for (const item of response.data) {
//                 await API.delete(`/cart/${item.id}`);
//             }

//             await API.post("/cart", {
//                 userEmail: user.email,
//                 productId: product.id,
//                 name: product.name,
//                 brand: product.brand || "",
//                 category: product.category || "",
//                 image: product.image || "",
//                 price: product.price,
//                 rating: product.rating || 0,
//                 quantity: 1
//             });

//             navigate("/checkout");

//         } catch (error) {

//             console.log(
//                 "Buy Now Error:",
//                 error.response?.data || error
//             );

//             alert("Unable to continue to checkout");
//         }
//     };

//     return (
//         <div className="product-card">

//             {/* TOP */}
//             <div className="product-top">

//                 <span className="category-badge">
//                     {product.category}
//                 </span>

//                 <button
//                     className="heart-button"
//                     onClick={handleWishlist}
//                 >
//                     ♡
//                 </button>

//             </div>


//             {/* IMAGE */}
//             <div className="product-image-wrapper">

//                 <img
//                     src={product.image}
//                     alt={product.name}
//                     className="product-image"
//                 />

//             </div>


//             {/* CONTENT */}
//             <div className="product-content">

//                 <p className="brand">
//                     {product.brand}
//                 </p>

//                 <h3 className="product-name">
//                     {product.name}
//                 </h3>


//                 {/* RATING */}
//                 <div className="product-rating">

//                     <span className="rating-box">
//                         ★ {product.rating}
//                     </span>

//                     <span className="rating-text">
//                         {product.reviews || 0} Reviews
//                     </span>

//                 </div>


//                 {/* PRICE */}
//                 <div className="price-row">

//                     <h2 className="product-price">
//                         ₹{product.price}
//                     </h2>

//                     <span className="delivery-text">
//                         ⚡ Fast Delivery
//                     </span>

//                 </div>


//                 {/* BUTTONS */}
//                 <div className="product-buttons">

//                     <button
//                         className="cart-btn"
//                         onClick={handleAddToCart}
//                     >
//                         🛒 Add Cart
//                     </button>

//                     <button
//                         className="buy-btn"
//                         onClick={buyNow}
//                     >
//                         ⚡ Buy Now
//                     </button>

//                 </div>

//             </div>

//         </div>
//     );
// }

// export default ProductCard;

import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/ProductCard.css";

function ProductCard({ product }) {

    const navigate = useNavigate();


    // =========================================
    // CHECK LOGIN
    // =========================================

    const checkLogin = () => {

        const user = JSON.parse(
            localStorage.getItem("currentUser")
        );

        if (!user || !user.email) {

            alert("Please Login First");

            navigate("/login");

            return false;
        }

        return true;
    };


    // =========================================
    // ADD TO CART
    // =========================================

    const handleAddToCart = async () => {

        if (!checkLogin()) return;

        const user = JSON.parse(
            localStorage.getItem("currentUser")
        );

        try {

            const existing = await API.get(
                `/cart?userEmail=${encodeURIComponent(user.email)}`
            );


            const alreadyExists = existing.data.some(
                item =>
                    String(item.productId) ===
                    String(product.id)
            );


            if (alreadyExists) {

                alert("Product already in cart 🛒");

                return;
            }


            await API.post("/cart", {

                userEmail: user.email,

                productId: product.id,

                name: product.name,

                brand: product.brand || "",

                category: product.category || "",

                image: product.image || "",

                price: product.price,

                rating: product.rating || 0,

                quantity: 1

            });


            alert("Added To Cart 🛒");

            navigate("/cart");


        } catch (error) {

            console.log(
                "Cart Error:",
                error.response?.data || error
            );

            alert("Unable to add product to cart");
        }
    };


    // =========================================
    // WISHLIST
    // =========================================

    const handleWishlist = async () => {

        if (!checkLogin()) return;

        const user = JSON.parse(
            localStorage.getItem("currentUser")
        );

        try {

            const existing = await API.get(
                `/wishlist?userEmail=${encodeURIComponent(user.email)}`
            );


            const alreadyExists = existing.data.some(
                item =>
                    String(item.productId) ===
                    String(product.id)
            );


            if (alreadyExists) {

                alert("Already in Wishlist ❤️");

                return;
            }


            await API.post("/wishlist", {

                userEmail: user.email,

                productId: product.id,

                name: product.name,

                brand: product.brand || "",

                category: product.category || "",

                image: product.image || "",

                price: product.price,

                rating: product.rating || 0,

                quantity: 1

            });


            alert("Added To Wishlist ❤️");


        } catch (error) {

            console.log(
                "Wishlist Error:",
                error.response?.data || error
            );

            alert("Unable to add to wishlist");
        }
    };


    // =========================================
    // BUY NOW
    // =========================================

    const buyNow = async () => {

        if (!checkLogin()) return;

        const user = JSON.parse(
            localStorage.getItem("currentUser")
        );

        try {

            const response = await API.get(
                `/cart?userEmail=${encodeURIComponent(user.email)}`
            );


            // Remove existing cart items
            for (const item of response.data) {

                await API.delete(
                    `/cart/${item.id}`
                );
            }


            // Add selected product
            await API.post("/cart", {

                userEmail: user.email,

                productId: product.id,

                name: product.name,

                brand: product.brand || "",

                category: product.category || "",

                image: product.image || "",

                price: product.price,

                rating: product.rating || 0,

                quantity: 1

            });


            // Go to checkout
            navigate("/checkout");


        } catch (error) {

            console.log(
                "Buy Now Error:",
                error.response?.data || error
            );

            alert("Unable to continue to checkout");
        }
    };


    // =========================================
    // PRODUCT CARD UI
    // =========================================

    return (

        <div className="product-card">


            {/* =================================
                IMAGE SECTION
            ================================= */}

            <div className="product-image-wrapper">


                {/* FULL PRODUCT IMAGE */}

                <img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                />


                {/* CATEGORY */}

                <span className="category-badge">
                    {product.category}
                </span>


                {/* WISHLIST */}

                <button
                    className="heart-button"
                    onClick={handleWishlist}
                    aria-label="Add to wishlist"
                >
                    ♡
                </button>


            </div>


            {/* =================================
                PRODUCT DETAILS
            ================================= */}

            <div className="product-content">


                {/* BRAND */}

                <p className="brand">
                    {product.brand}
                </p>


                {/* PRODUCT NAME */}

                <h3 className="product-name">
                    {product.name}
                </h3>


                {/* RATING */}

                <div className="product-rating">


                    <span className="rating-box">
                        ★ {product.rating}
                    </span>


                    <span className="rating-text">
                        {product.reviews || 0} Reviews
                    </span>


                </div>


                {/* =================================
                    PRICE + FAST DELIVERY
                ================================= */}

                <div className="price-row">


                    <h2 className="product-price">
                        ₹{product.price}
                    </h2>


                    <span className="delivery-text">
                        ⚡ Fast Delivery
                    </span>


                </div>


                {/* =================================
                    BUTTONS
                ================================= */}

                <div className="product-buttons">


                    {/* ADD CART */}

                    <button
                        className="cart-btn"
                        onClick={handleAddToCart}
                    >
                        🛒 Add Cart
                    </button>


                    {/* BUY NOW */}

                    <button
                        className="buy-btn"
                        onClick={buyNow}
                    >
                        ⚡ Buy Now
                    </button>


                </div>


            </div>


        </div>
    );
}


export default ProductCard;