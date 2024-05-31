import React from "react";
import style from "./Instgram.module.css";
import model from "../../Images/model.jpg";

export default function Instgram() {




  const options = {
    margin: 20,
    responsiveClass: true,
    loop: true,
    autoplay: true,
    smartSpeed: 500,
    responsive: {
      0: { items: 1 },
      400: { items: 1 },
      550: { items:1 },
      750: { items: 1 },
      1000: { items: 1 },
      1200: { items: 1 },
    },
  };
  return (
    <>

{/* 
<OwlCarousel {...options}>
          {products.map((product) => (
            <div
              key={product.id}
              className={`${style.item} mt-5 rounded rounded-3 overflow-hidden position-relative`}
            >
              <img
                className="object-fit-cover w-100"
                src={product.path}
                height={700}
                alt="img"
              />

            </div>
          ))}
        </OwlCarousel> */}
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
