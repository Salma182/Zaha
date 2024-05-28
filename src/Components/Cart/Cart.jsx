import React from "react";
import style from "./Cart.module.css";
import "animate.css";
import img from "../../Images/model.jpg";

export default function Cart({ cartOpen, setCartOpen, response }) {

  function remove(e) {
    if (e.target.classList.contains("cart")) {
      setCartOpen(false);
    }
  }
  const cart= response
  console.log("cart",cart)
  
  
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
        
          {response? (response?.map((item, index) => (
        <div key={index} className="response-item">
          <p><strong>Product ID:</strong> {item.product_id}</p>
          <p><strong>Quantity:</strong> {item.quantity}</p>
          {/* Add other fields if necessary */}
        </div>
      ))) : ""}
          
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
