import React, { useContext, useEffect, useState } from "react";
import style from "./Cart.module.css";
import "animate.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import CartContext from "../../CartContext/CartContext";
import Swal from "sweetalert2";

export default function Cart({ cartOpen, setCartOpen, response}) {

  const { cart, setCart } = useContext(CartContext);
  const[id, setId]=useState('')
  const navigate = useNavigate()
  
  function remove(e) {
    if (e.target.classList.contains("cart")) {
      setCartOpen(false);
    }
  }
  const guestToken= localStorage.getItem("guestToken");

function handleDelete(id){
setId(id)
deleteProduct(guestToken, id)
}

  async function deleteProduct() {
    const{data}= await axios.post(`https://zahaback.com/api/cart/deleteItem/${guestToken}/item/${id}`,
    {  
      headers: {
        Authorization: `Bearer G7h22L1YUtE9wexBIepKfZ6dac1yIcgMNFLAsC9d73580a97`,
      },
    }
    );
    setCartOpen(false)
    Swal.fire({
      position: "center",
      icon: "success",
      title: data.message,
      showConfirmButton: false,
      timer: 2000,
    });
    console.log(data)
  }


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
setCart(data.cart)
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
  

  useEffect(()=> {
    handleDelete(id, guestToken)
  },[id, guestToken])

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
         
                    
          {cart && cart.length > 0 ? (
        cart?.map((item, index) => (
          <div key={index}>
           <div className="row g-2 my-3">
            <div className="col-md-3">
              <div className="img">
                <img className="w-100" src={item.product?.images[0]} alt="img" />
              </div>
            </div>
            <div className="col-md-7">
              <div className="desc">
                <p className="mt-0 mb-1 fw-bold small">
                  {item.product?.name}
                </p>
                <p className="my-1 small">{item.product?.price} EGP</p>
                <p className="my-1 small">{item.product?.size} </p>

              </div>
            </div>
            <div className="col-md-2">
              <div className="close">
                <i onClick={()=> handleDelete(item.product_id)} className="fa-solid fa-xmark pointer"></i>
              </div>
            </div>
          </div>


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

      {cart.length > 0 && (
      <div className="w-100" style={{ position: 'relative', height: '150px' }}>
        <button className={style.checkoutBtn} onClick={()=> handlecheckout()}>
          Checkout
        </button>
      </div>
    )}
  
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
