import React from "react";
import style from "./Dashboard.module.css";
import { Link, Outlet } from "react-router-dom";

export default function Dashboard() {
  return (


    <>
      <div className="page d-flex">
        <div className={`side bg-color px-2 overflow-auto `}>
          <h1 className="bg-light h4 text-dark text-center fw-bold mb-5 p-3 rounded-bottom-5">
            choose what you want to do{" "}
          </h1>
          <div className={style.DashboardList}>
          <Link className={` ${style.dashboardBtn}`}  to="area">
            <button className={`border-0 bg-transparent fw-bold text-capitalize`}>
                Area Estimate
              </button>
            </Link>

            <Link className={` ${style.dashboardBtn}`}  to="categories">
            <button className={`border-0 bg-transparent fw-bold text-capitalize`}>
                Categories
              </button>
            </Link> 

            <Link className={` ${style.dashboardBtn}`}  to="callbacks">
            <button className={`border-0 bg-transparent fw-bold text-capitalize`}>
                callbacks
              </button>
            </Link>

            <Link className={` ${style.dashboardBtn}`}  to="Coupon">
            <button className={`border-0 bg-transparent fw-bold text-capitalize`}>
                Coupon
              </button>
            </Link>

           <Link className={` ${style.dashboardBtn}`}  to="imageforinsta">
            <button className={`border-0 bg-transparent fw-bold text-capitalize`}>
             Instagram Images
              </button>
            </Link>

            <Link className={` ${style.dashboardBtn}`} to="/dashboard">
            <button className={`border-0 bg-transparent fw-bold text-capitalize`}>
                orders
              </button>
            </Link>


            <Link className={` ${style.dashboardBtn}`}  to="products">
            <button className={`border-0 bg-transparent fw-bold text-capitalize`}>
                products
              </button>
            </Link>

            <Link className={` ${style.dashboardBtn}`}  to="questions">
            <button className={`border-0 bg-transparent fw-bold text-capitalize`}>
                questions
              </button>
            </Link>


            <Link className={` ${style.dashboardBtn}`}  to="reviews">
            <button className={`border-0 bg-transparent fw-bold text-capitalize`}>
                reviews
              </button>
            </Link>
      
            <Link className={` ${style.dashboardBtn}`}  to="sociallinks">
            <button className={`border-0 bg-transparent fw-bold text-capitalize`}>
                social links
              </button>
            </Link>


            <Link className={` ${style.dashboardBtn}`}  to="subcategory">
            <button className={`border-0 bg-transparent fw-bold text-capitalize`}>
                sub-category
              </button>
            </Link>
            
            <Link className={` ${style.dashboardBtn}`}  to="slider">
            <button className={`border-0 bg-transparent fw-bold text-capitalize`}>
                slider
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
