import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import "../styles/Wishlist.css";
import API from "../services/api";

function Wishlist() {

  const navigate = useNavigate();

  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {

    const user = JSON.parse(localStorage.getItem("currentUser"));

    if (!user) {
      navigate("/login");
      return;
    }


    API.get(`/wishlist?userEmail=${user.email}`)
      .then((res) => {
        setWishlist(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

  }, [navigate]);


  const getWishlist = () => {

    const user = JSON.parse(localStorage.getItem("currentUser"));

    API.get(`/wishlist?userEmail=${user.email}`)
      .then((res) => {
        setWishlist(res.data);
      });

  };
  const increaseQty = async (id) => {

    const product = wishlist.find(item => item.id === id);

    try {

      await API.patch(`/wishlist/${id}`, {
        quantity: (product.quantity || 1) + 1
      });

      getWishlist();

    } catch (err) {

      console.log(err);

    }

  };
  const decreaseQty = async (id) => {

    const product = wishlist.find(item => item.id === id);

    if ((product.quantity || 1) <= 1) return;

    try {

      await API.patch(`/wishlist/${id}`, {
        quantity: product.quantity - 1
      });

      getWishlist();

    } catch (err) {

      console.log(err);

    }

  };

  const removeFromWishlist = async (id) => {

    try {

      await API.delete(`/wishlist/${id}`);

      alert("Product Removed");

      getWishlist();

    } catch (err) {

      console.log(err);

    }

  };

  const addToCart = async (product) => {

    const user = JSON.parse(localStorage.getItem("currentUser"));

    try {

      const existing = await API.get(
        `/cart?userEmail=${user.email}&productId=${product.productId}`
      );

      if (existing.data.length > 0) {

        const item = existing.data[0];

        await API.patch(`/cart/${item.id}`, {
          quantity: item.quantity + (product.quantity || 1)
        });

      } else {

        await API.post("/cart", {

          productId: product.productId,
          userEmail: user.email,
          name: product.name,
          brand: product.brand,
          image: product.image,
          price: product.price,
          rating: product.rating,
          quantity: product.quantity || 1

        });

      }

      alert("Added To Cart 🛒");

      navigate("/cart");

    } catch (err) {

      console.log(err);

    }

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