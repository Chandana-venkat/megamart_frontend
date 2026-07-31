import { useEffect, useState } from "react";

import Footer from "../components/Footer";

import "../styles/Orders.css";

import API from "../services/api";


function Orders() {


  const [orders,setOrders] = useState([]);

  const [loading,setLoading] = useState(true);




  useEffect(()=>{

    fetchOrders();

  },[]);





  const fetchOrders = async()=>{


    try{


      const user = JSON.parse(
        localStorage.getItem("user")
      );



      const response = await API.get("/orders");



      // Logged in user orders only

      const userOrders = response.data.filter(

        (order)=>

        order.email === user?.email

      );



      setOrders(userOrders);



    }


    catch(error){


      console.log(error);

      alert(
        "Failed to load orders"
      );


    }


    finally{


      setLoading(false);


    }


  };







  return(


    <>


    <div className="orders-container">



      <h1>
        📦 My Orders
      </h1>





      {
        loading ?


        (

          <h2>
            Loading Orders...
          </h2>

        )


        :


        orders.length===0 ?


        (

          <h2 className="empty">

            No Orders Found

          </h2>

        )


        :


        orders.map((order)=>(



          <div

          className="order-card"

          key={order.id}

          >





            <h2>

            🧾 Order ID : {order.id}

            </h2>





            <p>

            <b>📅 Date :</b>

            {order.date}

            </p>






            <p>


            <b>🚚 Status :</b>


            <span className="status">

            {order.status || "Order Confirmed"}

            </span>


            </p>







            <p>

            <b>💰 Total :</b>

            ₹{order.total}

            </p>









            <div className="customer-box">


            <h3>

            👤 Customer Details

            </h3>





            <p>

            <b>Name :</b>

            {order.name}

            </p>






            <p>

            <b>Email :</b>

            {order.email}

            </p>






            <p>

            <b>Mobile :</b>

            {order.mobile}

            </p>








            <h3>

            📍 Delivery Address

            </h3>





            <p>

            {order.address}

            </p>








            <h3>

            🛒 Products

            </h3>







            <div className="order-products">


            {


            order.items && order.items.length > 0 ?



            order.items.map((item,index)=>(



              <div

              className="order-product"

              key={index}

              >





                <img

                src={item.image}

                alt={item.name}

                />






                <div>



                <h4>

                {item.name}

                </h4>





                <p>

                Price : ₹{item.price}

                </p>





                <p>

                Quantity :

                {item.quantity}

                </p>





                <p>

                <b>Status :</b>


                <span className="status">

                {order.status}

                </span>


                </p>





                </div>





              </div>



            ))



            :



            (

              <p>

              No Products Found

              </p>

            )



            }



            </div>





            </div>





          </div>



        ))



      }





    </div>




    <Footer />



    </>


  );


}



export default Orders;