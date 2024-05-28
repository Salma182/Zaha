import React, { useEffect, useState } from "react";
import style from "./Cart.module.css";
import "animate.css";
import img from "../../Images/model.jpg";
import axios from "axios";

export default function Cart({ cartOpen, setCartOpen, response}) {

  const[cartData,setCartData] =useState([])

  function remove(e) {
    if (e.target.classList.contains("cart")) {
      setCartOpen(false);
    }
  }
  const userToken= localStorage.getItem("userToken");
  // const cart= response
  
  async function GetToCart(userToken){
try {
const {data} = await axios.get(`https://zahaback.com/api/cart/${userToken}`,
{  
  headers: {
    Authorization: `Bearer G7h22L1YUtE9wexBIepKfZ6dac1yIcgMNFLAsC9d73580a97`,
  },
}
)
setCartData(data.cart)
console.log(data.cart)
}catch(error) {
  console.error(error);
}
  }
  
  
  useEffect(() => {
    GetToCart();
  }, [userToken]);
  
  
  return (
    <>
      <div
        onClick={(e) => remove(e)}
        className={`${style.side} ${
          cartOpen ? "visible opacity-1" : "invisible opacity-0"
        } overflow-auto cart`}
      >
        <div
          className={`${style.links}`}
          // className={`${style.links} animate__animated ${
          //   clicked
          //     ? "animate__fadeInLeft delay-2s"
          //     : "animate__fadeOutLeft delay-2s"
          // }`}
        >
          <h4 className="text-center fw-bold my-4">My Cart</h4>
         

          <div className="cont text-center">
            <i className="fa-solid fa-bag-shopping text-secondary d-block  fs-1 my-5"></i>
            <p>No Product To Show </p>
            <div
              className={`text-white btn ${style.btn} d-flex justify-content-center my-3`} onClick={()=>setCartOpen(false)}
            >
              {" "}
              Return To Shop
            </div>
          </div>
        
        {cartOpen ? 

        <div>
          alll
          </div> : ""}
{/*         
          {cartData && cartOpen && (cartData?.map((item, index) => (
        <div key={index} className="response-item">
          <p><strong>Product ID:</strong> {item.product_id}</p>
          <p><strong>Quantity:</strong> {item.quantity}</p>
        </div>
      ))) }
           */}

          <div
            className={`${style.toggle} test`}
            onClick={() => {
              setCartOpen(false);
              // setClidcked((c) => !c);
            }}
          >
            <i className="fa-solid fa-angle-right test"></i>
          </div>
        </div>
      </div>
    </>
  );
}
