import React, { useState } from "react";
import style from "../Login/Login.module.css";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate , Link} from "react-router-dom";

export default function Register() {

  let [error, setError] =useState('')
  let [UserToken,setUserToken]=useState(null)
  let navigate = useNavigate();
  const token = localStorage.getItem('token');

const user = {
    name: "",
    email: "",
    password:"",
    password_confirmation:"",
    phone: "",
    admin:""
  }

  const errors = {};
  
  if (!user.email) {
    errors.email = "Required";
  }

  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}])|(([a-zA-Z\-\d]+\.)+[a-zA-Z]{2,}))$/i;

  if (!emailRegex.test(user.email)) {
    errors.email ="Invalid email address";
  }

  let valid = Yup.object({
      name: Yup.string()
        .matches(/^(?=.*[a-zA-Zء-ي].*[a-zA-Zء-ي])[\s\S]*$/, "Invalid name").required("Required"),
    email: Yup.string()
      .matches(emailRegex, "Invalid email address")
      .email("Invalid")
      .required("Required"),
      password: Yup.string().required('Password is required'),
      password_confirmation: Yup.string().required('Password confirmation is required').oneOf([Yup.ref('password'), null], 'Passwords must match'),
      phone:Yup.string().required('Phone number is required').matches(/^(01)[0-2|5][0-9]{8}$/,'Enter Valid Number')
    });

        const formik = useFormik({
          initialValues: user,
          validationSchema:valid,
          onSubmit: submitForm,
          initialErrors: errors,
        });

        
  async function submitForm(values) {
    try {
      const { data } = await axios.post('https://zahaback.com/api/register', values, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      //console.log("data", data);
      localStorage.setItem('token',data.token)  
      setUserToken(localStorage.getItem('token'))
      navigate('/')

    } catch (error) {
      if (error.response) {
        console.error('Server responded with an error:', error.response.data);
        setError(error.response.data.message || 'An error occurred');
      } else if (error.request) {
        console.error('No response received:', error.request);
        setError('No response from server. Please try again later.');
      } else {
        console.error('Error in request setup:', error.message);
        setError('An error occurred. Please try again.');
      }
    }
  }
  
  return (
    <>
      <div className="container responsive">
        <div className="py-3"></div>
        <h1 className="text-center fw-bold mb-3">Register</h1>
        <form onSubmit={formik.handleSubmit} className=" Authform">
        {error ? <div className='alert alert-danger'> {error} </div> : ''}

          <div className="fw-bold">
        <label htmlFor="name">Username </label>
        <input
          autoComplete="off"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}        
          id="name"
          placeholder=""
          name="name"
          type="text"
          value={formik.values.name}
          className="form-control my-2"
        />
        {formik.errors.name && formik.touched.name && (
          <div style={{ color: "red" }}>{formik.errors.name}</div>
        )}
      </div>

      <div className="fw-bold">
      <label htmlFor="user_email">Email </label>
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              id="email"
              placeholder=""
              name="email"
              type="email"
              autoComplete="email"
              className="form-control my-2"
              value={formik.values.email}
            />
            {formik.errors.email && formik.touched.email ? (
              <div style={{ color: "red" }}>{formik.errors.email}</div>
            ) : (
              ""
            )}
          </div>

          <div className="my-3 fw-bold">
              <label htmlFor="password">Password </label>
            <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
              type="password"
              placeholder=""
              id="password"
              name="password"
              className="form-control my-2"
              value={formik.values.password}
            />
                {formik.errors.password && formik.touched.password ? (
              <div style={{ color: "red" }}>{formik.errors.password}</div>
            ) : (
              ""
            )}  
          </div>

          <div className="my-3 fw-bold">
            <label htmlFor="password_confirmation">Confirm Password </label>
            <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}       
              type="password"
              placeholder=""
              id="password_confirmation"
              name="password_confirmation"
              className="form-control my-2"
              value={formik.values.password_confirmation}
            />
                {formik.errors.password_confirmation && formik.touched.password_confirmation ? (
              <div style={{ color: "red" }}>{formik.errors.password_confirmation}</div>
            ) : (
              ""
            )}  
          </div>


          <div className="my-3 fw-bold">
            <label htmlFor="user_phone">Phone</label>
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}       
              placeholder=""
              type="text"
              id="phone"
              name="phone"
              className="form-control my-2"
              value={formik.values.phone}
            />
            {formik.errors.phone && formik.touched.phone ? (
              <div style={{ color: "red" }}>{formik.errors.phone}</div>
            ) : (
              ""
            )}  
          </div>

          <button onSubmit={()=>submitForm()} type='submit' className="btn btn-dark w-100 mt-3">Register</button>
          <div className="d-flex justify-content-center align-center m-auto my-3 ">
          <h6 className="mt-2">Do you Have Account ? </h6>
          <Link to="/login" className={style.registerLink}>Login</Link>
         </div>

        </form>
      </div>
    </>
  );
}
