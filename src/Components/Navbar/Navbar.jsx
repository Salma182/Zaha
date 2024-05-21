import React from "react";
import style from "./Navbar.module.css";
import SearchInput from "./../SearchInput/SearchInput";

export default function Navbar() {
  return (
    <>
      <SearchInput />
      <nav className={`bg-color p-2 text-capitalize fixed-bottom`}>
        <div className="container d-flex justify-content-around align-items-center">
          <div className="ico small d-flex align-items-center justify-content-center flex-column dark-color pointer">
            <i className="fa-solid small fa-cart-plus"></i>
            <span className="small">shop</span>
          </div>
          <div className="ico d-flex align-items-center justify-content-center small flex-column dark-color pointer">
            <i className="fa-solid small fa-layer-group"></i>
            <span className="small">categories</span>
          </div>
          <div className="ico d-flex align-items-center justify-content-center small flex-column dark-color pointer">
            <i className="fa-solid small fa-circle-user"></i>
            <span className="small">account</span>
          </div>
          <div className="ico small d-flex align-items-center justify-content-center small flex-column dark-color pointer">
            <i className="fa-solid small fa-heart"></i>
            <span className="small">wishlist</span>
          </div>
        </div>
      </nav>
    </>
  );
}
