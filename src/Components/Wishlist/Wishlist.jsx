import React, { useContext, useEffect, useState } from "react";
import style from "../Cart/Cart.module.css";
import axios from "axios";
import WishlistContext from "../../WishlistContext/WishlistContext";

export default function Wishlist({wishlistOpen, setWishlistOpen , addwishlist}) {

  const[wishlistProducts,setWishlistProducts] = useState([])

// const {selectedwishlist, setSelectedwishlist} = useContext(WishlistContext)

function remove(e) {
  if (e.target.classList.contains("cart")) {
    setWishlistOpen(false);
  }
}
const wtoken= localStorage.getItem("wtoken");

async function GetWishlist() {

  const{data}= await axios.get(`https://zahaback.com/api/wishlist/get/${wtoken}`
  )
  setWishlistProducts(data.wishlist)
  console.log("wishlistProducts",data)
}

useEffect(()=> {
  GetWishlist(wtoken)
},[wtoken])

  return (
    <>
{/* {wishlistOpen ? <p>No Product To Show </p> : ""} */}
  
  <div
        onClick={(e) => remove(e)}
        className={`${style.side} ${
          wishlistOpen ? "visible opacity-1" : "invisible opacity-0"
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
          <h4 className="text-center fw-bold my-4">My Wishlist</h4>
         
         {wishlistProducts && wishlistProducts.length > 0  ? (
  wishlistProducts?.map((item, index) => (
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
          {/* <i onClick={()=> handleDelete(item.product_id)} className="fa-solid fa-xmark pointer"></i> */}
        </div>
      </div>
    </div>


    </div>
  ))) : ( <div className="cont text-center">
            <i className="fa-solid fa-bag-shopping text-secondary d-block  fs-1 my-5"></i>
            <p>No Product To Show </p>
            <div
              className={`text-white btn ${style.btn} d-flex justify-content-center my-3`} onClick={()=>(false)}
            >
              {" "}
              Return To Shop
            </div>
          </div>) }
                      
          <div
            className={`${style.toggle} test`}
            onClick={() => {
              setWishlistOpen(false);
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
