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
          <ul className="list-unstyled d-flex flex-column ">
            <Link className="text-decoration-none" to="/dashboard">
              <li className="p-2 bg-white text-dark text-center fw-bold text-capitalize pointer rounded w-75 m-auto">
                orders
              </li>
            </Link>
            
            <Link className="text-decoration-none" to="reviews">
              <li className="p-2 bg-white text-dark text-center fw-bold text-capitalize pointer my-4 rounded w-75 m-auto">
                reviews
              </li>
            </Link>
            <Link className="text-decoration-none" to="subcategory">
              <li className="p-2 bg-white text-dark text-center fw-bold text-capitalize pointer rounded w-75 m-auto">
                subcategory
              </li>
            </Link>
            <Link className="text-decoration-none" to="products">
              <li className="p-2 bg-white text-dark text-center fw-bold text-capitalize mt-4 pointer rounded w-75 m-auto">
                products
              </li>
            </Link>
            <Link className="text-decoration-none" to="categories">
              <li className="p-2 bg-white text-dark text-center fw-bold text-capitalize mt-4 pointer rounded w-75 m-auto">
                Categories
              </li>
            </Link> 

            <Link className="text-decoration-none" to="callbacks">
              <li className="p-2 bg-white text-dark text-center fw-bold text-capitalize mt-4 pointer rounded w-75 m-auto">
                callbacks
              </li>
            </Link>

            <Link className="text-decoration-none" to="questions">
              <li className="p-2 bg-white text-dark text-center fw-bold text-capitalize mt-4 pointer rounded w-75 m-auto">
                questions
              </li>
            </Link>

            <Link className="text-decoration-none" to="sociallinks">
              <li className="p-2 bg-white text-dark text-center fw-bold text-capitalize mt-4 pointer rounded w-75 m-auto">
                social links
              </li>
            </Link>

            <Link className="text-decoration-none" to="imageforinsta">
              <li className="p-2 bg-white text-dark text-center fw-bold text-capitalize mt-4 pointer rounded w-75 m-auto">
                image for insta
              </li>
            </Link>
            <Link className="text-decoration-none" to="slider">
              <li className="p-2 bg-white text-dark text-center fw-bold text-capitalize mt-4 pointer rounded w-75 m-auto">
                slider
              </li>
            </Link>
            <Link className="text-decoration-none" to="area">
              <li className="p-2 bg-white text-dark text-center fw-bold text-capitalize mt-4 pointer rounded w-75 m-auto">
                area
              </li>
            </Link>
            <Link className="text-decoration-none" to="Coupon">
              <li className="p-2 bg-white text-dark text-center fw-bold text-capitalize mt-4 pointer rounded w-75 m-auto">
                Coupon
              </li>
            </Link>
          </ul>
        </div>
        <div className="cont w-75  p-3">
          <Outlet />
        </div>
      </div>
    </>
  );
}
