import React, { useEffect, useState } from "react";
import style from "./Cart.module.css";
import "animate.css";
import img from "../../Images/model.jpg";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Cart({ cartOpen, setCartOpen, response}) {

  const[cartData,setCartData] =useState([])
  const navigate = useNavigate()
  function remove(e) {
    if (e.target.classList.contains("cart")) {
      setCartOpen(false);
    }
  }

  const guestToken= localStorage.getItem("guestToken");

  async function GetToCart(){
    const guestToken= localStorage.getItem("guestToken");

try {
const {data} = await axios.get(`https://zahaback.com/api/cart/${guestToken}`,
{  
  headers: {
    Authorization: `Bearer G7h22L1YUtE9wexBIepKfZ6dac1yIcgMNFLAsC9d73580a97`,
  },
}
)
setCartData(data.cart)
console.log("cart", data.cart)
}catch(error) {
  console.error(error);

}
  }
  
  function handlecheckout(){
    setCartOpen(false)
    navigate("/checkout")
  }
  useEffect(() => {
    console.log("Fetching cart data for guestToken:", guestToken);
    GetToCart();
  }, []);
  
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
         

          
                    
          {cartData.length > 0 ? (
        cartData.map((item, index) => (
          <div key={index}>
            <p>{item.product.name}</p>
            <p>{item.product.desc}</p>
            <p>{item.product.price}</p>
            <p>{item.product.size}</p>

            <button onClick={()=> handlecheckout()}>Checkout</button>

          </div>
        ))
      ) : (
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
      )}


        {/* {cartOpen && cartData ?
          cartData.map((cart)=>{
            <div className="row g-2">
            <div className="col-md-3">
              <div className="img">
                <img className="w-100" src={cart.images[0]} alt="img" />
              </div>
            </div>
            <div className="col-md-7">
              <div className="desc">
                <p className="mt-0 mb-1 fw-bold small">
                  {cart.name}
                </p>
                <p className="my-1 small">{cart.price} EGP</p>
                <p className="my-1 small">SELECT OPTIONS</p>
              </div>
            </div>
            <div className="col-md-2">
              <div className="close">
                <i className="fa-solid fa-xmark pointer"></i>
              </div>
            </div>
          </div>

          })
          
        
       :"" } */}

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
