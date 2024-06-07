import React, { useEffect, useState } from "react";
import style from "./Orders.module.css";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { Form, Pagination } from "react-bootstrap";
import Loading from "../../Loading/Loading";
import { Link } from "react-router-dom";

export default function Orders() {
const [orders, setOrders]= useState([])
const [currentPage, setCurrentPage] = useState(1);
const [lastPage, setLastPage] = useState(1); 
const [loading, setLoading] = useState(false);
const token = localStorage.getItem('token');


async function getOrders(page = 1) {
  setLoading(true)
  try{
    const {data}= await axios.get(`https://zahaback.com/api/orders/allOrders?page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    )
    setOrders(data.allOrders.data)
    setCurrentPage(data.allOrders.current_page);
    setLastPage(data.allOrders.last_page);
    console.log(data.allOrders)
    setLoading(false)
  }
  catch(error)
  {console.log(error)
  }
}

useEffect(() => {
  getOrders();
}, []); 




let items = [];
for (let number = 1; number <= lastPage; number++) {
  items.push(
    <Pagination.Item
      key={number}
      active={number === currentPage}
      onClick={() => getOrders(number)}
    >
      {number}
    </Pagination.Item>
  );
}
const paginationBasic = (
  <div>
    <Pagination size="sm">{items}</Pagination>
  </div>
);

  return (
    <>
      <h1 className="text-center bg-color text-dark rounded-3 fw-bold text-capitalize p-3 my-3">
        Orders
      </h1>

{loading ? <Loading /> : 
<Table striped bordered>
        <thead>
          <tr>
            <th>index</th>
            <th>Name</th>
            {/* <th>Email</th> */}
            <th>product-id</th>
            <th>quantity</th>
            <th>city</th>
            <th>phone</th>
            <th>price</th>
            <th>status</th>


          </tr>
        </thead>
        <tbody>
     
          {orders && orders.length > 0 && 
            orders.map((order,index) => 
              <tr>
              <td>
              <Link className="orderLink" to={`orderDetails/${order.id}`}>
                  {index + 1}
                </Link>
                </td>
              <td>
              <Link className="orderLink" to={`orderDetails/${order.id}`}>
                  {order.first_name}
                </Link>
                </td>
        
                <td>
                <Link className="orderLink" to={`orderDetails/${order.id}`}>
                  {order.product_id.join(",")}
                </Link>
                  </td>
              <td>
              <Link className="orderLink" to={`orderDetails/${order.id}`}>
                  {order.quantity.join(",")}
                </Link>
                </td>
              <td>
              <Link className="orderLink"  to={`orderDetails/${order.id}`}>
                  {order.city}
                </Link>
                </td>
              <td>
              <Link className="orderLink" to={`orderDetails/${order.id}`}>
                  {order.phone}
                </Link>
                </td>
              <td>
              <Link className="orderLink" to={`orderDetails/${order.id}`}>
                  {order.total_price}
                </Link>
                </td>
          
                <td>
              <Link className="orderLink" to={`orderDetails/${order.id}`}>
                  {order.status}
                </Link>
                </td>
            </tr>
            
          ) }
        

        </tbody>
      </Table>}
      

      <div className="my-2 d-flex justify-content-center">
        {paginationBasic}
      </div>

    </>
  );
}
