import React from "react";
import style from "./Contacts.module.css";

export default function Contacts() {
  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-lg-3 col-md-4 mb-3">
            <h4 className="mb-4">
              Contact <span className={`${style.color} fw-bold`}>Zaha</span> On:
            </h4>
            <p className="small my-1">(+20) 521 - 249 - 976</p>
            <p className="small my-1">info@zahacarves.com</p>
            <span className="smal">Zaha.com</span>
          </div>
          <div className="col-lg-9 col-md-8 space-bottom bg-light p-3 shadow shadow-md">
            <i className="fa-brands fs-4 pointer text-primary me-2 fa-facebook"></i>
            <i className="fa-brands fs-4 pointer mx-2 text-secondary fa-twitter"></i>
            <i className="fa-brands fs-4 pointer mx-2 text-danger fa-instagram"></i>
            <i className="fa-brands fs-4 pointer mx-2 text-info fa-linkedin"></i>
            <i className="fa-brands fs-4 pointer mx-2 text-warning fa-tiktok"></i>
            <i className="fa-brands fs-4 pointer mx-2 text-success fa-whatsapp"></i>
            <p className="mt-3 ">
              {/* <span>Visa Payment is avilable</span> */}
              {/* <i className="fa-brands pointer mx-3 text-primary fa-cc-visa"></i> */}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
