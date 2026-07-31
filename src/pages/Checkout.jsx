import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import Nav from "../components/Nav";
import Footer from "../components/Footer";

import API from "../services/api";

import { clearCart } from "../redux/slices/cartSlice";

import "../styles/Checkout.css";


function Checkout() {


  const navigate = useNavigate();

  const dispatch = useDispatch();



  // Redux Cart

  const cart = useSelector(
    (state) => state.cart.cartItems
  );



  // Total Calculation

  const total = cart.reduce(

    (sum, item) =>

      sum + item.price * item.quantity,

    0

  );



  const [form,setForm] = useState({

    name:"",
    mobile:"",
    address:"",
    city:"",
    pincode:"",

    payment:"COD",

    upi:"",

    cardName:"",
    cardNumber:"",
    expiry:"",
    cvv:""

  });



  const [errors,setErrors] = useState({});





  // ==========================
  // HANDLE INPUT CHANGE
  // ==========================


  const handleChange = (e)=>{


    const {name,value} = e.target;


    setForm({

      ...form,

      [name]:value

    });



    setErrors({

      ...errors,

      [name]:""

    });


  };






  // ==========================
  // VALIDATION
  // ==========================


  const validate = ()=>{


    let newErrors={};



    if(!form.name.trim())

    {

      newErrors.name="Name is required";

    }



    else if(!/^[A-Za-z ]+$/.test(form.name))

    {

      newErrors.name="Only alphabets allowed";

    }





    if(!form.mobile)

    {

      newErrors.mobile="Mobile number required";

    }


    else if(!/^[6-9]\d{9}$/.test(form.mobile))

    {

      newErrors.mobile="Enter valid 10 digit mobile number";

    }





    if(!form.address.trim())

    {

      newErrors.address="Address required";

    }





    if(!form.city.trim())

    {

      newErrors.city="City required";

    }





    if(!form.pincode)

    {

      newErrors.pincode="Pincode required";

    }


    else if(!/^\d{6}$/.test(form.pincode))

    {

      newErrors.pincode="Enter valid 6 digit pincode";

    }





    if(form.payment==="UPI")

    {

      if(!form.upi)

      {

        newErrors.upi="UPI ID required";

      }

    }





    if(form.payment==="CARD")

    {


      if(!form.cardName)

      {

        newErrors.cardName="Card holder name required";

      }



      if(!form.cardNumber)

      {

        newErrors.cardNumber="Card number required";

      }


      else if(!/^\d{16}$/.test(form.cardNumber))

      {

        newErrors.cardNumber="Enter valid 16 digit card number";

      }



      if(!form.expiry)

      {

        newErrors.expiry="Expiry required";

      }



      if(!form.cvv)

      {

        newErrors.cvv="CVV required";

      }


      else if(!/^\d{3}$/.test(form.cvv))

      {

        newErrors.cvv="Enter valid CVV";

      }


    }



    setErrors(newErrors);



    return Object.keys(newErrors).length===0;


  };
// ==========================
// PLACE ORDER
// ==========================


const placeOrder = async (e)=>{


  e.preventDefault();



  // Validation check

  const isValid = validate();



  if(!isValid)

  {

    return;

  }





  if(cart.length===0)

  {

    alert("Cart is empty");

    return;

  }





  const user = JSON.parse(

    localStorage.getItem("user")

  );






  const order = {


    id: Date.now(),


    name: form.name,


    email: user?.email || "",


    mobile: form.mobile,



    address:

    `${form.address}, ${form.city} - ${form.pincode}`,



    payment: form.payment,



    items: cart,



    total: total,



    date: new Date().toLocaleString(),



    status:"Order Confirmed"


  };






  try{


    await API.post(

      "/orders",

      order

    );





    // Clear Redux Cart

    dispatch(clearCart());





    alert(

      "Order Placed Successfully 🎉"

    );





    navigate("/orders");



  }



  catch(err){


    console.log(err);



    alert(

      "Order Failed"

    );


  }



};
return (

<>

<Nav />


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

/>

<p className="error">

{errors.name}

</p>

</div>





{/* MOBILE */}

<div className="form-group">

<label>Mobile Number</label>

<input

type="text"

name="mobile"

value={form.mobile}

onChange={handleChange}

/>

<p className="error">

{errors.mobile}

</p>

</div>





{/* ADDRESS */}

<div className="form-group">


<label>Address</label>


<textarea

name="address"

value={form.address}

onChange={handleChange}

/>


<p className="error">

{errors.address}

</p>


</div>





{/* CITY */}

<div className="form-group">


<label>City</label>


<input

type="text"

name="city"

value={form.city}

onChange={handleChange}

/>


<p className="error">

{errors.city}

</p>


</div>





{/* PINCODE */}

<div className="form-group">


<label>Pincode</label>


<input

type="text"

name="pincode"

value={form.pincode}

onChange={handleChange}

/>


<p className="error">

{errors.pincode}

</p>


</div>






{/* PAYMENT */}

<h2>Payment Method</h2>



<div>


<label>

<input

type="radio"

name="payment"

value="COD"

checked={form.payment==="COD"}

onChange={handleChange}

/>

COD

</label>



<label>

<input

type="radio"

name="payment"

value="UPI"

checked={form.payment==="UPI"}

onChange={handleChange}

/>

UPI

</label>



<label>

<input

type="radio"

name="payment"

value="CARD"

checked={form.payment==="CARD"}

onChange={handleChange}

/>

CARD

</label>


</div>






{/* UPI */}

{

form.payment==="UPI" &&


<div className="form-group">


<label>UPI ID</label>


<input

type="text"

name="upi"

value={form.upi}

onChange={handleChange}

/>



<p className="error">

{errors.upi}

</p>


</div>

}






{/* CARD */}

{

form.payment==="CARD" &&


<>


<div className="form-group">


<label>Card Holder Name</label>


<input

type="text"

name="cardName"

value={form.cardName}

onChange={handleChange}

/>


<p className="error">

{errors.cardName}

</p>


</div>






<div className="form-group">


<label>Card Number</label>


<input

type="text"

name="cardNumber"

value={form.cardNumber}

onChange={handleChange}

/>


<p className="error">

{errors.cardNumber}

</p>


</div>







<div className="form-group">


<label>Expiry Date</label>


<input

type="month"

name="expiry"

value={form.expiry}

onChange={handleChange}

/>


<p className="error">

{errors.expiry}

</p>


</div>







<div className="form-group">


<label>CVV</label>


<input

type="password"

name="cvv"

value={form.cvv}

onChange={handleChange}

/>


<p className="error">

{errors.cvv}

</p>


</div>


</>


}





<hr />



<h2>

Total Amount : ₹{total}

</h2>





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
