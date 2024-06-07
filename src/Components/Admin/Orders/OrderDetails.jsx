import React, { useEffect, useState } from "react";
import style from "./Orders.module.css";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { Form, Pagination } from "react-bootstrap";
import Loading from "../../Loading/Loading";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

export default function OrderDetails() {
const [order,setOrder]=useState([])
const token = localStorage.getItem('token');
const { orderId } = useParams(); 
const [loading, setLoading] = useState(false);
const [orderStatus, setOrderStatus] = useState({});
  const [orderMessages, setOrderMessages] = useState({});


async function getOrder(orderId){
    setLoading(true)
    try{
        const {data}= await axios.get(`https://zahaback.com/api/orders/getorder/${orderId}`,
        {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        setOrder(data.order)
    console.log(data);
    }catch(e)
    {console.error(e)

    }finally{setLoading(false)}
}

const handleStatusChange = (orderId, newStatus) => {
    setOrderStatus({ ...orderStatus, [orderId]: newStatus });
  };

  const handleMessageChange = (orderId, newMessage) => {
    setOrderMessages({ ...orderMessages, [orderId]: newMessage });
  };

async function updateStatus(orderId) {
  setLoading(true)
  try{
    const Data = {
      order_id: orderId,
      status: orderStatus[orderId] || '',
      message: orderMessages[orderId] || ''
    };
  
    const {data}= await axios.post(`https://zahaback.com/api/orders/update-status`,
    Data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    )
    Swal.fire({
      icon: "success",
      title: "Order status updated successfully",
    })
    // setOrders(data.allOrders.data)
    console.log(data)
    setLoading(false)
  }
  catch(error)
  {console.log(error)
  }
}

const item = order
console.log(item.email)

useEffect(() => {
getOrder(orderId)
}, [orderId]); 

    return(
        <>
        {loading ? <Loading /> : 
         item && 
         (
            <div className={style.orderdetails}>
      <h1 className="text-center">Order Details</h1>
      <p>Order ID: 
        <span className={style.orderdata}> {item.id} </span>
        </p>
      <p>First Name: 
        <span className={style.orderdata}> {item.first_name}</span>
        </p>
      <p>Last Name:  
        <span className={style.orderdata}> {item.last_name} </span>
        </p>
      <p>Phone:  
        <span className={style.orderdata}> {item.phone} </span>
        </p>
      <p>Email:  
        <span className={style.orderdata}> {item.email}</span>
        </p>
      <p>instagram: 
        <span className={style.orderdata}> {item.instagram_user}</span>
         </p>
      <p>Date: 
        <span className={style.orderdata}> {item.created_at ? item.created_at.slice(0, 10) : ""}</span> 
        </p>
      <p>Product IDs:
         <span className={style.orderdata}> {item.product_id?.map((product) => product.name)}</span> 
         </p>
      <p>Quantity:
         <span className={style.orderdata}>{item.quantity?.map((q)=>q)}</span>
         </p>
      <p>Size: 
        <span className={style.orderdata}> {item.size?.map((s)=>s)}</span> 
        </p>
      <p>State: 
        <span className={style.orderdata}> {item.state}</span> 
        </p>
      <p>City:
         <span className={style.orderdata}> {item.city} </span> 
         </p>
      <p>Address:  
        <span className={style.orderdata}> {item.address} </span>
        </p>

      <p>Additional Phone Number: 
        <span className={style.orderdata}> {item.additional_phone} </span>
        </p>

      <p>Total Price:
         <span className={style.orderdata}> {item.total_price} </span> 
         </p>
         
         <div className="d-flex flex-row align-items-start">
  <label className="mt-2">Status:</label>

  <div className="d-flex align-items-start justify-content-start w-75">
    <Form.Control
      as="select"
      value={orderStatus[order.id] || order.status}
      onChange={(e) => handleStatusChange(order.id, e.target.value)}
      className="full-width mr-2"
    >
      <option value="pending">Pending</option>
      <option value="shipped">Shipped</option>
      <option value="accept">Accepted</option>
      <option value="reject">Rejected</option>
    </Form.Control>

    <textarea
      value={orderMessages[order.id] || ''}
      placeholder="Message"
      onChange={(e) => handleMessageChange(order.id, e.target.value)}
      className="p-2 border-grey rounded flex-grow-2 mr-2 "
      style={{ height: "auto" }}
    />

    <button className="editBtn" style={{ width: "10%", marginLeft:"1%" }} onClick={() => updateStatus(order.id)}>Edit</button>
  </div>
</div>

         
              {/* <p>Status: {item.status}</p> */}
    </div>
         )        
        }

        </>
    )


}