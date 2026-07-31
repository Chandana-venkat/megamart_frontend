import { Link } from "react-router-dom";


import Footer from "../components/Footer";

import "../styles/OrderSuccess.css";

function OrderSuccess() {

  return (

    <>

      

      <div className="success-container">

        <h1>✅ Order Placed Successfully!</h1>

        <p>
          Thank you for shopping with MegaMart.
        </p>

        <p>
          Your order has been confirmed.
        </p>

        <Link to="/products">
          <button>
            Continue Shopping
          </button>
        </Link>

      </div>

     

    </>

  );

}

export default OrderSuccess;