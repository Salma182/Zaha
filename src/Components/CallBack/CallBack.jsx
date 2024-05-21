import React from "react";
import style from "./CallBack.module.css";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";

export default function CallBack() {
  const phoneRegex = /^01[0125][0-9]{8}$/gm;

  const validationSchema = yup.object({
    name: yup.string("name must be charachters"),
    email: yup.string().email().required("email is required"),
    phone: yup
      .string()
      .matches(phoneRegex, "Invalid phone number")
      .required("phone is required"),
  });

  async function callbackSubmit(values) {
    // const { data } = await axios.post(
    //   `https://zahaback.com/api/callback/create`,
    //   values
    // );
    // console.log(data);
    console.log(values);
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      country: "egypt",
      type: "",
    },
    validationSchema,
    onSubmit: callbackSubmit,
  });

  return (
    <>
      <>
        <button
          type="button"
          className="btn text-dark fs-5"
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
                  className="modal-title bg-dark text-warning w-50 rounded px-2 py-1 mt-5"
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
                        value={formik.values.name}
                      />
                    </div>
                    <label htmlFor="country">Country</label>
                    <select
                      name="country"
                      id="country"
                      className="form-select"
                      aria-label="Default select example"
                      onChange={formik.handleChange}
                    >
                      <option value="egypt">Egypt</option>
                      <option value="ksa">ksa</option>
                      <option value="usa">usa</option>
                    </select>

                    <div className="my-2">
                      <label htmlFor="email" className="text-danger">
                        Your Email (required)*
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
                      {formik.errors.email && formik.touched.email? (
                        <div className="alert alert-danger p-1">
                          {formik.errors.email}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>

                    <div className="my-2">
                      <label className="text-danger" htmlFor="phone">
                        Your Phone (required)*
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
                      {formik.errors.phone && formik.touched.phone? (
                        <div className="alert alert-danger p-1">
                          {formik.errors.phone}
                        </div>
                      ) : (
                        ""
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
                          checked
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
                        />
                      </div>
                    </div>

                    <div className="d-flex justify-content-end">
                      <button
                        type="submit"
                        className="btn btn-success px-5 btn-sm"
                      >
                        send
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              {/* <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" className="btn btn-success">
                  Understood
                </button>
              </div> */}
            </div>
          </div>
        </div>
      </>
    </>
  );
}
