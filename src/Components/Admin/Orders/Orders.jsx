import React, { useEffect, useState } from "react";
import style from "./Orders.module.css";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { Pagination } from "react-bootstrap";
import Loading from "../../Loading/Loading";

export default function Orders() {
const [orders, setOrders]= useState([])
const [currentPage, setCurrentPage] = useState(1);
const [lastPage, setLastPage] = useState(1); 
const [loading, setLoading] = useState(false);

async function getOrders(page = 1) {
  setLoading(true)
  try{
    const {data}= await axios(`https://zahaback.com/api/orders/allOrders?page=${page}`,
    {
      headers: {
        Authorization: `Bearer tmTqMwqaJf0gGEQWE5kQAkfn37ITr46RpjVCfHWha266e4cc`,
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
      <h1 className="text-center bg-light text-dark rounded-3 fw-bold text-capitalize p-3 my-3">
        Orders
      </h1>

{loading ? <Loading /> : 
<Table striped bordered>
        <thead>
          <tr>
            <th>index</th>
            <th>Name</th>
            <th>Email</th>
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
              <td>{index} </td>
              <td>{order.first_name}</td>
              <td width={300}>
               {order.email}
              </td>
                <td>{order.product_id.map((p)=>p).join(",")}</td>
              <td>{order.quantity.map((q)=>q).join(",")}</td>
              <td>{order.city}</td>
              <td>{order.phone}</td>
              <td>{order.total_price}</td>
              <td>{order.status}</td>

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
