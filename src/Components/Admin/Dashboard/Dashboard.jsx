import React from "react";
import style from "./Dashboard.module.css";
import { Link, Outlet } from "react-router-dom";

export default function Dashboard() {
  return (


    
    <>
      <div className="page d-flex">
        <div className="side w-25 bg-color vh-100 px-2 overflow-auto">
          <h1 className="bg-light h4 text-dark text-center fw-bold mb-5 p-3 rounded-bottom-5">
            choose what you want to do{" "}
          </h1>
          <div className=" d-flex flex-column ">
            <Link className="text-decoration-none" to="/dashboard">
              <button className="p-2 bg-white border-0 text-dark text-center fw-bold text-capitalize pointer rounded  m-auto">
                orders
              </button>
            </Link>
            
            <Link className="text-decoration-none" to="reviews">
              <button className="p-2 bg-white border-0 text-dark text-center fw-bold text-capitalize pointer my-4 rounded w-75 m-auto">
                reviews
              </button>
            </Link>
            <Link className="text-decoration-none" to="subcategory">
              <button className="p-2 bg-white border-0 text-dark text-center fw-bold text-capitalize pointer rounded w-75 m-auto">
                subcategory
              </button>
            </Link>
            <Link className="text-decoration-none" to="products">
              <button className="p-2 bg-white border-0 text-dark text-center fw-bold text-capitalize mt-4 pointer rounded w-75 m-auto">
                products
              </button>
            </Link>
            <Link className="text-decoration-none" to="categories">
              <button className="p-2 bg-white border-0 text-dark text-center fw-bold text-capitalize mt-4 pointer rounded w-75 m-auto">
                Categories
              </button>
            </Link> 

            <Link className="text-decoration-none" to="callbacks">
              <button className="p-2 bg-white border-0 text-dark text-center fw-bold text-capitalize mt-4 pointer rounded w-75 m-auto">
                callbacks
              </button>
            </Link>

            <Link className="text-decoration-none" to="questions">
              <button className="p-2 bg-white border-0 text-dark text-center fw-bold text-capitalize mt-4 pointer rounded w-75 m-auto">
                questions
              </button>
            </Link>

            <Link className="text-decoration-none" to="sociallinks">
              <button className="p-2 bg-white border-0 text-dark text-center fw-bold text-capitalize mt-4 pointer rounded w-75 m-auto">
                social links
              </button>
            </Link>

            <Link className="text-decoration-none" to="imageforinsta">
              <button className="p-2 bg-white border-0 text-dark text-center fw-bold text-capitalize mt-4 pointer rounded w-75 m-auto">
                image for insta
              </button>
            </Link>
            <Link className="text-decoration-none" to="slider">
              <button className="p-2 bg-white border-0 text-dark text-center fw-bold text-capitalize mt-4 pointer rounded w-75 m-auto">
                slider
              </button>
            </Link>
            <Link className="text-decoration-none" to="area">
              <button className="p-2 bg-white border-0 text-dark text-center fw-bold text-capitalize mt-4 pointer rounded w-75 m-auto">
                area
              </button>
            </Link>
            <Link className="text-decoration-none" to="Coupon">
              <button className="p-2 bg-white border-0 text-dark text-center fw-bold text-capitalize mt-4 pointer rounded w-75 m-auto">
                Coupon
              </button>
            </Link>
          </div>
        </div>
        <div className="cont w-75  p-3">
          <Outlet />
        </div>
      </div>
    </>
  );
}
