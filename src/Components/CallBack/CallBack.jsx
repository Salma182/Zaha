import React from "react";
import style from "./CallBack.module.css";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import Swal from "sweetalert2";

export default function CallBack() {
  const token = localStorage.getItem('token');

  const phoneRegex = /^01[0125][0-9]{8}$/gm;

  const validationSchema = yup.object({
    name: yup.string("name must be charachters"),
    email: yup.string().email().required("email is required"),
    phone: yup
      .string()
      .matches(phoneRegex, "Invalid phone number")
      .required("phone is required"),
      country: yup.string().required("Country is required"),
      type: yup.string().oneOf(['call', 'sms', 'whatsapp']).required("Type is required"),

  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      country: "",
      type: "sms",
    },
    validationSchema,
    onSubmit: callbackSubmit,
  });

  async function callbackSubmit(values) {
    try {
      const { data } = await axios.post(
        `https://zahaback.com/api/callback/create`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.message === "callBack created successfully") {
        Swal.fire({
          position: "center",
          icon: "success",
          title: data.message,
          showConfirmButton: false,
          timer: 2000,
        });
      console.log("values");
      console.log(data);
   }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }
  


  return (
    <>
      <>
        <button
          type="button"
          className="btn text-dark fs-5 w-100 text-start"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
        >
          <i className="fa-solid fa-headset me-2"></i>
          CallBack
        </button>

        <div
          className="modal fade"
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          // tabindex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered w-75 text-start">
            <div className="modal-content">
              <div className="modal-header">
                <h5
                  className="modal-title text-color text-center fw-bold fs-3 w-100 rounded px-2 py-1 "
                  id="staticBackdropLabel"
                >
                  Callback
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>

           <div className="modal-body">
  <div className="container">
    <form onSubmit={formik.handleSubmit}>
      <div className="my-2">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          name="name"
          className="form-control"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
        {formik.errors.name && formik.touched.name && (
          <div className="alert alert-danger p-1">
            {formik.errors.name}
          </div>
        )}
      </div>

      <div className="my-2">
        <label htmlFor="country">Country</label>
        <input
          id="country"
          type="text"
          name="country"
          className="form-control"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.country}
        />
        {formik.errors.country && formik.touched.country ?(
          <div className="alert alert-danger p-1">
            {formik.errors.country}
          </div>
        ) : ""}
      </div>

      <div className="my-2">
        <label htmlFor="email" >
          Email *
        </label>
        <input
          id="email"
          type="text"
          name="email"
          className="form-control"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.errors.email && formik.touched.email ? 
          <div className="alert alert-danger p-1 mt-2">
            {formik.errors.email}
          </div>
         : ""}

      </div>

      <div className="my-2">
        <label  htmlFor="phone">
          Phone Number *
        </label>
        <input
          id="phone"
          type="text"
          name="phone"
          className="form-control"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.phone}
        />
        {formik.errors.phone && formik.touched.phone && (
          <div className="alert alert-danger p-1 mt-2">
            {formik.errors.phone}
          </div>
        )}
      </div>

      <div className="my-2">
        <div className="rad d-flex align-items-center">
          <label htmlFor="call">Call</label>
          <input
            className="ms-2"
            id="call"
            type="radio"
            name="type"
            value="call"
            onChange={formik.handleChange}
            checked={formik.values.type === 'call'}
          />
        </div>

        <div className="rad d-flex align-items-center">
          <label htmlFor="sms">SMS</label>
          <input
            className="ms-2"
            id="sms"
            type="radio"
            name="type"
            value="sms"
            onChange={formik.handleChange}
            checked={formik.values.type === 'sms'}
          />
        </div>

        <div className="rad d-flex align-items-center">
          <label htmlFor="wats">whatsapp</label>
          <input
            className="ms-2"
            id="wats"
            type="radio"
            name="type"
            value="whatsapp"
            onChange={formik.handleChange}
            checked={formik.values.type === 'whatsapp'}
          />
        </div>
        {formik.errors.type && formik.touched.type && (
          <div className="alert alert-danger p-1">
            {formik.errors.type}
          </div>
        )}
      </div>

      <div className="d-flex justify-content-end">
              <button
                  type="button"
                  className="btn btn-secondary mx-3"
                  data-bs-dismiss="modal"
                >
                  Close
                  </button>
                
          <button
          type="submit"
          className="btn btn-success px-5 btn-sm"
        >
          Send
        </button>
      
      </div>
    </form>
  </div>
</div>

        
            </div>
          </div>
        </div>
      </>
    </>
  );
}
