import { useNavigate } from "react-router-dom";
import API from "../services/api";

import "../styles/ProductCard.css";


function ProductCard({ product }) {

    const navigate = useNavigate();


    // Check user login
    const checkLogin = () => {

        const user = JSON.parse(localStorage.getItem("currentUser"));

        if (!user) {

            alert("Please Login First");

            navigate("/login");

            return false;
        }

        return true;
    };



    // Add To Cart
    const handleAddToCart = async () => {

    const user = JSON.parse(localStorage.getItem("currentUser"));

    if (!user) {
        alert("Please Login First");
        navigate("/login");
        return;
    }


    try {

        const existing = await API.get(
            `/cart?userEmail=${user.email}&productId=${product.id}`
        );


        if (existing.data.length > 0) {

            alert("Product already in cart 🛒");
            return;

        }


        await API.post("/cart", {

            userEmail: user.email,
            productId: product.id,

            name: product.name,
            brand: product.brand,
            image: product.image,
            price: product.price,
            rating: product.rating,

            quantity: 1

        });


        alert("Added To Cart 🛒");


    }
    catch(error){

        console.log("Cart Error:",error);

    }

};

    // Add To Wishlist
    const handleWishlist = async () => {


        console.log("Wishlist clicked");


        if (!checkLogin()) return;



        const user = JSON.parse(localStorage.getItem("currentUser"));



        try {


            const existing = await API.get(
                `/wishlist?userEmail=${user.email}&productId=${product.id}`
            );



            if (existing.data.length > 0) {


                alert("Already in Wishlist ❤️");

                return;

            }




            await API.post("/wishlist", {


                userEmail: user.email,

                productId: product.id,

                name: product.name,

                brand: product.brand,

                image: product.image,

                price: product.price,

                rating: product.rating,

                quantity: 1


            });




            alert("Added To Wishlist ❤️");



        }
        catch (error) {


            console.log("Wishlist Error:", error);


        }


    };





    // Buy Now
    const buyNow = () => {


        if (!checkLogin()) return;



        localStorage.setItem(

            "buyProduct",

            JSON.stringify(product)

        );



        navigate("/checkout");


    };





    return (

        <div className="product-card">


            <img

                src={product.image}

                alt={product.name}

                className="product-image"

            />



            <h3>

                {product.name}

            </h3>



            <p className="brand">

                {product.brand}

            </p>



            <h2>

                ₹{product.price}

            </h2>



            <p>

                ⭐ {product.rating}

            </p>





            <div className="product-buttons">



                <button

                    className="cart-btn"

                    onClick={handleAddToCart}

                >

                    🛒 Add Cart

                </button>





                <button

                    className="wishlist-btn"

                    onClick={handleWishlist}

                >

                    ❤️ Wishlist

                </button>





                <button

                    className="buy-btn"

                    onClick={buyNow}

                >

                    ⚡ Buy Now

                </button>



            </div>



        </div>

    );

}


export default ProductCard;