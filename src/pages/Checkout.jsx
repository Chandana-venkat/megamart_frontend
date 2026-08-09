import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// import Nav from "../components/Nav";
import Footer from "../components/Footer";
import API from "../services/api";
import "../styles/Checkout.css";

function Checkout() {

  const navigate = useNavigate();
  // const dispatch = useDispatch();

  // const cart = useSelector(
  //   (state) => state.cart.cartItems
  // );
  const [cart, setCart] = useState([]);
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    address: "",
    city: "",
    pincode: "",
    payment: "COD",
    upi: "",
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: ""
  });

  const [errors, setErrors] = useState({});
  useEffect(() => {

    const user = JSON.parse(localStorage.getItem("currentUser"));

    if (!user) {

      navigate("/login");
      return;

    }

    getCart();

  }, []);
  const getCart = () => {

    const user = JSON.parse(localStorage.getItem("currentUser"));

    API.get(`/cart?userEmail=${user.email}`)
      .then((res) => {

        setCart(res.data);

      })
      .catch((err) => {

        console.log(err);

      });

  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    let error = "";

    switch (name) {
      case "name":
        if (!value.trim()) {
          error = "Name is required";
        } else if (!/^[A-Za-z ]+$/.test(value)) {
          error = "Only alphabets allowed";
        }
        break;

      case "mobile":
        if (!value.trim()) {
          error = "Mobile number is required";
        } else if (!/^[6-9]\d{0,9}$/.test(value)) {
          error = "Enter valid mobile number";
        } else if (value.length < 10) {
          error = "Mobile number must be 10 digits";
        }
        break;

      case "address":
        if (!value.trim()) {
          error = "Address is required";
        }
        break;

      case "city":
        if (!value.trim()) {
          error = "City is required";
        } else if (!/^[A-Za-z ]+$/.test(value)) {
          error = "Only alphabets allowed";
        }
        break;

      case "pincode":
        if (!value.trim()) {
          error = "Pincode is required";
        } else if (!/^\d{0,6}$/.test(value)) {
          error = "Only numbers allowed";
        } else if (value.length < 6) {
          error = "Pincode must be 6 digits";
        }
        break;

      case "upi":
        if (form.payment === "UPI") {
          if (!value.trim()) {
            error = "UPI ID is required";
          } else if (!/^[\w.-]+@[\w]+$/.test(value)) {
            error = "Enter valid UPI ID";
          }
        }
        break;

      case "cardName":
        if (form.payment === "CARD") {
          if (!value.trim()) {
            error = "Card holder name is required";
          }
        }
        break;

      case "cardNumber":
        if (form.payment === "CARD") {
          if (!/^\d{0,16}$/.test(value)) {
            error = "Only numbers allowed";
          } else if (value.length < 16) {
            error = "Card number must be 16 digits";
          }
        }
        break;

      case "expiry":
        if (form.payment === "CARD" && !value) {
          error = "Expiry date is required";
        }
        break;

      case "cvv":
        if (form.payment === "CARD") {
          if (!/^\d{0,3}$/.test(value)) {
            error = "Only numbers allowed";
          } else if (value.length < 3) {
            error = "CVV must be 3 digits";
          }
        }
        break;

      default:
        break;
    }

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };
  const validate = () => {

    let newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    } else if (!/^[A-Za-z ]+$/.test(form.name)) {
      newErrors.name = "Only alphabets allowed";
    }

    if (!form.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^[6-9]\d{9}$/.test(form.mobile)) {
      newErrors.mobile = "Enter valid 10 digit mobile number";
    }

    if (!form.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!form.city.trim()) {
      newErrors.city = "City is required";
    } else if (!/^[A-Za-z ]+$/.test(form.city)) {
      newErrors.city = "Only alphabets allowed";
    }

    if (!form.pincode.trim()) {
      newErrors.pincode = "Pincode is required";
    } else if (!/^\d{6}$/.test(form.pincode)) {
      newErrors.pincode = "Enter valid 6 digit pincode";
    }

    if (form.payment === "UPI") {

      if (!form.upi.trim()) {
        newErrors.upi = "UPI ID is required";
      } else if (!/^[\w.-]+@[\w]+$/.test(form.upi)) {
        newErrors.upi = "Enter valid UPI ID";
      }

    }

    if (form.payment === "CARD") {

      if (!form.cardName.trim()) {
        newErrors.cardName = "Card holder name is required";
      }

      if (!/^\d{16}$/.test(form.cardNumber)) {
        newErrors.cardNumber = "Enter valid 16 digit card number";
      }

      if (!form.expiry) {
        newErrors.expiry = "Expiry date is required";
      }

      if (!/^\d{3}$/.test(form.cvv)) {
        newErrors.cvv = "Enter valid 3 digit CVV";
      }

    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;

  };

  const placeOrder = async (e) => {

    e.preventDefault();

    const isValid = validate();

    if (!isValid) return;

    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    const user = JSON.parse(localStorage.getItem("currentUser"));

    const order = {

      id: Date.now(),
      name: form.name,
      email: user?.email || "",
      mobile: form.mobile,
      address: `${form.address}, ${form.city} - ${form.pincode}`,
      payment: form.payment,
      items: cart,
      total: total,
      date: new Date().toLocaleString(),
      status: "Order Confirmed"

    };

    try {

      await API.post("/orders", order);

      const user = JSON.parse(localStorage.getItem("currentUser"));

      const cartItems = await API.get(
        `/cart?userEmail=${user.email}`
      );

      for (const item of cartItems.data) {

        await API.delete(`/cart/${item.id}`);

      }

      setCart([]);

      alert("Order Placed Successfully 🎉");

      navigate("/orders");

    } catch (err) {

      console.log(err);

      alert("Order Failed");

    }

  };

  return (

    <>

      {/* <Nav /> */}

      <div className="checkout-container">

        <h1>Shipping & Payment</h1>

        <form onSubmit={placeOrder}>

          {/* NAME */}

          <div className="form-group">

            <label>Name</label>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your full name"
            />

            <p className="error">{errors.name}</p>

          </div>


          {/* MOBILE */}

          <div className="form-group">

            <label>Mobile Number</label>

            <input
              type="text"
              name="mobile"
              maxLength="10"
              value={form.mobile}
              onChange={handleChange}
              placeholder="Enter mobile number"
            />

            <p className="error">{errors.mobile}</p>

          </div>


          {/* ADDRESS */}

          <div className="form-group">

            <label>Address</label>

            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Enter your address"
            />

            <p className="error">{errors.address}</p>

          </div>


          {/* CITY */}

          <div className="form-group">

            <label>City</label>

            <input
              type="text"
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder="Enter city"
            />

            <p className="error">{errors.city}</p>

          </div>


          {/* PINCODE */}

          <div className="form-group">

            <label>Pincode</label>

            <input
              type="text"
              name="pincode"
              maxLength="6"
              value={form.pincode}
              onChange={handleChange}
              placeholder="Enter pincode"
            />

            <p className="error">{errors.pincode}</p>

          </div>


          <h2>Payment Method</h2>

          <div className="payment-options">

            <label>
              <input
                type="radio"
                name="payment"
                value="COD"
                checked={form.payment === "COD"}
                onChange={handleChange}
              />
              Cash On Delivery
            </label>

            <label>
              <input
                type="radio"
                name="payment"
                value="UPI"
                checked={form.payment === "UPI"}
                onChange={handleChange}
              />
              UPI
            </label>

            <label>
              <input
                type="radio"
                name="payment"
                value="CARD"
                checked={form.payment === "CARD"}
                onChange={handleChange}
              />
              Debit / Credit Card
            </label>

          </div>

          {/* UPI Payment */}

          {form.payment === "UPI" && (
            <div className="form-group">
              <label>UPI ID</label>

              <input
                type="text"
                name="upi"
                value={form.upi}
                onChange={handleChange}
                placeholder="example@upi"
              />

              <p className="error">{errors.upi}</p>
            </div>
          )}

          {/* Card Payment */}

          {form.payment === "CARD" && (
            <>
              <div className="form-group">
                <label>Card Holder Name</label>

                <input
                  type="text"
                  name="cardName"
                  value={form.cardName}
                  onChange={handleChange}
                  placeholder="Card Holder Name"
                />

                <p className="error">{errors.cardName}</p>
              </div>

              <div className="form-group">
                <label>Card Number</label>

                <input
                  type="text"
                  name="cardNumber"
                  maxLength="16"
                  value={form.cardNumber}
                  onChange={handleChange}
                  placeholder="1234567812345678"
                />

                <p className="error">{errors.cardNumber}</p>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Expiry</label>

                  <input
                    type="month"
                    name="expiry"
                    value={form.expiry}
                    onChange={handleChange}
                  />

                  <p className="error">{errors.expiry}</p>
                </div>

                <div className="form-group">
                  <label>CVV</label>

                  <input
                    type="password"
                    name="cvv"
                    maxLength="3"
                    value={form.cvv}
                    onChange={handleChange}
                    placeholder="123"
                  />

                  <p className="error">{errors.cvv}</p>

                </div>
              </div>
            </>
          )}

          <h2>Total: ₹{total}</h2>

          <button
            type="submit"
            className="place-order-btn"
          >
            Place Order
          </button>

        </form>



      </div>

      <Footer />

    </>

  );

}

export default Checkout;
