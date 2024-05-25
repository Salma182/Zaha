import React from "react";
import style from "./Cart.module.css";
import "animate.css";
import img from "../../Images/model.jpg";

export default function Cart({ cartOpen, setCartOpen }) {
  function remove(e) {
    if (e.target.classList.contains("cart")) {
      setCartOpen(false);
    }
  }

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

          <div className="test">
            <div className="container">
              <div className="row g-2">
                <div className="col-12">
                  <div className="container single-prod">
                    <div className="row g-2">
                      <div className="col-md-3">
                        <div className="img">
                          <img className="w-100" src={img} alt="img" />
                        </div>
                      </div>
                      <div className="col-md-7">
                        <div className="desc">
                          <p className="mt-0 mb-1 fw-bold small">
                            Thouria satin set
                          </p>
                          <p className="my-1 small">1.150,00 EGP</p>
                          <p className="my-1 small">SELECT OPTIONS</p>
                        </div>
                      </div>
                      <div className="col-md-2">
                        <div className="close">
                          <i className="fa-solid fa-xmark pointer"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
          </div>

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
