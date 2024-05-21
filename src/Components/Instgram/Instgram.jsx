import React from "react";
import style from "./Instgram.module.css";
import model from "../../Images/model.jpg";

export default function Instgram() {
  return (
    <>
      <h1
        className={`mt-5 ${style.color} mb-4 text-center text-capitalize fw-bold text-dark`}
      >
        follow us on Instgram
      </h1>
      <div className="container text-center pointer">
        <div className="row g-1">
          <div className="col-md-2 ">
            <img src={model} alt="model" className="w-100 rounded-3" />
          </div>
          <div className="col-md-2 ">
            <img src={model} alt="model" className="w-100 rounded-3" />
          </div>
          <div className="col-md-2 ">
            <img src={model} alt="model" className="w-100 rounded-3" />
          </div>
          <div className="col-md-2 ">
            <img src={model} alt="model" className="w-100 rounded-3" />
          </div>
          <div className="col-md-2 ">
            <img src={model} alt="model" className="w-100 rounded-3" />
          </div>
          <div className="col-md-2 ">
            <img src={model} alt="model" className="w-100 rounded-3" />
          </div>
        </div>
      </div>
    </>
  );
}
