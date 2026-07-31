import { useEffect, useState } from "react";

import "../styles/ViewOrders.css";

import API from "../services/api";



function ViewOrders() {



  const [orders,setOrders] = useState([]);

  const [loading,setLoading] = useState(true);





  useEffect(()=>{


    loadOrders();


  },[]);







  // ==========================
  // GET ALL ORDERS
  // ==========================


  const loadOrders = async()=>{


    try{


      const response = await API.get("/orders");


      setOrders(response.data);



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








  // ==========================
  // UPDATE STATUS
  // ==========================


  const updateStatus = async(id,status)=>{


    try{


      await API.patch(

        `/orders/${id}`,

        {

          status:status

        }

      );



      alert(
        "Order Status Updated"
      );



      loadOrders();



    }


    catch(error){


      console.log(error);


      alert(
        "Status update failed"
      );


    }


  };










  // ==========================
  // DELETE ORDER
  // ==========================


  const deleteOrder = async(id)=>{


    const confirmDelete = window.confirm(

      "Are you sure you want to delete this order?"

    );



    if(!confirmDelete)

      return;





    try{


      await API.delete(

        `/orders/${id}`

      );



      alert(

        "Order Deleted Successfully"

      );



      loadOrders();



    }


    catch(error){


      console.log(error);


      alert(
        "Delete failed"
      );


    }



  };









  return (



    <div className="orders-page">



      <h1>
        🛒 Customer Orders
      </h1>



      <h3>

      Total Orders : {orders.length}

      </h3>






      {

      loading ?


      (

        <h2>
          Loading Orders...
        </h2>

      )


      :



      <table className="orders-table">


        <thead>


          <tr>


            <th>
              Customer
            </th>


            <th>
              Email
            </th>


            <th>
              Address
            </th>


            <th>
              Total
            </th>


            <th>
              Items
            </th>


            <th>
              Status
            </th>


            <th>
              Delete
            </th>


          </tr>


        </thead>







        <tbody>



        {


        orders.length===0 ?



        (

          <tr>

            <td colSpan="7">

              No Orders Found

            </td>

          </tr>


        )



        :



        orders.map((order)=>(




          <tr key={order.id}>


            <td>

              {order.name}

            </td>





            <td>

              {order.email}

            </td>





            <td>

              {order.address}

            </td>





            <td>

              ₹ {order.total}

            </td>





            <td>

              {order.items?.length || 0}

            </td>







            <td>


              <select


              value={

                order.status || 
                "Order Confirmed"

              }


              onChange={(e)=>

                updateStatus(

                  order.id,

                  e.target.value

                )

              }



              >



                <option value="Order Confirmed">

                  Order Confirmed

                </option>




                <option value="Packed">

                  Packed

                </option>




                <option value="Shipped">

                  Shipped

                </option>




                <option value="Out for Delivery">

                  Out for Delivery

                </option>




                <option value="Delivered">

                  Delivered

                </option>




                <option value="Cancelled">

                  Cancelled

                </option>



              </select>


            </td>








            <td>


              <button


              className="delete-btn"


              onClick={()=>deleteOrder(order.id)}


              >

                🗑 Delete


              </button>


            </td>





          </tr>



        ))



        }



        </tbody>



      </table>



      }



    </div>


  );



}



export default ViewOrders;