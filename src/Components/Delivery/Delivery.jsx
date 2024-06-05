import React from "react";
import style from "./Delivery.module.css";
import DeliveryDetails from "../DeliveryDetails/DeliveryDetails";
import CallBack from "../CallBack/CallBack";

export default function Delivery() {
  return (
    <>
      <div className="bg-light p-3 mb-5 shadow shadow-lg">
        <h4 className="text-center fw-bold mb-3">
          <DeliveryDetails />
        </h4>
        <div className="container text-white text-center p-2 small" style={{backgroundColor:"#956911"}}>
          © By Zaha 2024 – All Right reserved!
        </div>
      </div>
    </>
  );
}
