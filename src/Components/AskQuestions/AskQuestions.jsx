import React from "react";
import style from "./AskQuestions.module.css";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";

export default function AskQuestions() {
  
  async function AskQuestion(values) {
    const { data } = await axios.post(
      `https://zahaback.com/api/question/create`,
      { ...values }
    );
    console.log("values");
    console.log(data);
 }

  const phoneRegex = /^01[0125][0-9]{8}$/gm;

  const validationSchema = yup.object({
    message: yup.string("name must be charachters"),
    client_email: yup.string().email().required("email is required"),
    client_phone: yup
      .string()
      .matches(phoneRegex, "Invalid phone number")
      .required("phone is required"),
  });

  const formik = useFormik({
    initialValues: {
      message: "",
      client_name: "",
      client_email: "",
      client_phone: "",
      // product_id: "",
    },
    validationSchema,
    onSubmit: AskQuestion,
  });

  return (
    <>
      <>
        <button
          type="button"
          className="btn text-dark fs-5"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdropa"
        >
          <i className="fa-solid fa-headset me-2"></i>
          Ask Questions
        </button>

        <div
          className="modal fade"
          id="staticBackdropa"
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
                  Ask Questions
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
                      <label htmlFor="message">Enter Your Message</label>
                      <input
                        id="message"
                        type="text"
                        name="message"
                        className="form-control"
                        onChange={formik.handleChange}
                        // onBlur={formik.handleBlur}
                        value={formik.values.message}
                      />
                    </div>
                    <label htmlFor="client_name">Name</label>
                    <div className="my-2">
                      <label htmlFor="email">Your Name</label>
                      <input
                        id="client_name"
                        type="text"
                        name="client_name"
                        className="form-control"
                        onChange={formik.handleChange}
                        // onBlur={formik.handleBlur}
                        value={formik.values.client_name}
                      />
                    </div>

                    <div className="my-2">
                      <label htmlFor="client_email">
                        Your Email (required)*
                      </label>
                      <input
                        id="client_email"
                        type="text"
                        name="client_email"
                        className="form-control"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.client_email}
                      />
                      {formik.errors.client_email && formik.touched.client_email? (
                        <div className="alert alert-danger p-1">
                          {formik.errors.client_email}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>

                    <div className="my-2">
                      <label htmlFor="client_phone">
                        Your Phone (required)*
                      </label>
                      <input
                        id="client_phone"
                        type="text"
                        name="client_phone"
                        className="form-control"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.client_phone}
                      />
                      {formik.errors.client_phone && formik.touched.client_phone ? (
                        <div className="alert alert-danger p-1">
                          {formik.errors.client_phone}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>

                    <div className="d-flex justify-content-end">
                      <button
                        type="submit"
                        className="btn btn-success px-5 btn-sm"
                        onSubmit={()=>AskQuestion}
                      >
                        Send
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
