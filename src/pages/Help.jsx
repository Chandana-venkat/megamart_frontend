
import Footer from "../components/Footer";
import "../styles/Help.css";

function Help() {

  return (
    <>
      

      <div className="help-container">

        <h1>🛟 Help Center</h1>

        <p className="help-text">
          Welcome to MegaMart Customer Support.
          We're here to help you with your orders,
          payments, returns and account issues.
        </p>

        <div className="help-card">

          <h2>📦 Orders</h2>

          <p><b>Q:</b> How can I place an order?</p>
          <p>
            <b>A:</b> Select a product, click
            <b> Buy Now</b> or
            <b> Add To Cart</b>, enter your delivery
            address, choose a payment method and
            click <b>Place Order</b>.
          </p>

        </div>

        <div className="help-card">

          <h2>💳 Payments</h2>

          <p><b>Q:</b> Which payment methods are available?</p>

          <ul>
            <li>Cash on Delivery (COD)</li>
            <li>UPI</li>
            <li>Credit Card</li>
            <li>Debit Card</li>
          </ul>

        </div>

        <div className="help-card">

          <h2>🚚 Delivery</h2>

          <p>
            Orders are usually delivered within
            <b> 3 - 7 business days.</b>
          </p>

          <p>
            You can track your order from the
            <b> My Orders </b> page.
          </p>

        </div>

        <div className="help-card">

          <h2>↩ Returns & Refunds</h2>

          <p>
            Products can be returned within
            <b> 7 days </b>
            if eligible.
          </p>

          <p>
            Refunds are processed within
            <b> 5-7 working days.</b>
          </p>

        </div>

        <div className="help-card">

          <h2>📞 Contact Us</h2>

          <p><b>Email:</b> support@megamart.com</p>

          <p><b>Phone:</b> +91 9876543210</p>

          <p><b>Working Hours:</b> 9:00 AM - 8:00 PM</p>

        </div>

      </div>

    
    </>
  );
}

export default Help;