import React, { useState } from "react";
import style from "./Login.module.css";
import { useFormik } from "formik";
import * as Yup from 'yup'
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext/AuthContext";

export default function Login() {
  // api/login

  let [error, setError] =useState('')
  let [UserToken,setUserToken]=useState(null)
  let navigate = useNavigate();
  
  const { isAuthenticated, isAdmin , setIsAuthenticated , setIsAdmin } = useAuth();


  
  async function Allusers(){
    const{data}= await axios.get(`https://zahaback.com/api/allusers`,
    {
      headers: {
        Authorization: `Bearer G7h22L1YUtE9wexBIepKfZ6dac1yIcgMNFLAsC9d73580a97`,
      },
    }
    )
    const admins = data.allusers.map((user)=> {
       user.isadmin === "admin" ? setIsAdmin(true) : setIsAdmin(false)
    })
    
    console.log(data.allusers)
    
      }

  const validationSchema = Yup.object({
    email: Yup.string().required('Email is required').email('Enter a valid email'),
    password: Yup.string().required('Password is required'),
  });


  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: submitForm,
  });
  
  async function submitForm(values) {
    try {
      const { data } = await axios.post('https://zahaback.com/api/login', values, 
      {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log("data", data);
      localStorage.setItem('token',data.token)  
      setUserToken(localStorage.getItem('token'))
      navigate('/')
      setIsAuthenticated(true)
      Allusers()

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
      <div className="container mt-5">
        <div className="py-5"></div>
        <h1 className="text-center fw-bold mb-3">Login </h1>
        <form onSubmit={formik.handleSubmit} className="bg-color p-3 rounded-3 w-50 m-auto">
        {error ? <div className='alert alert-danger'> {error} </div> : ''}

          <div className="my-3">
            <label htmlFor="email">Email :</label>
            <input
            onBlur={formik.handleBlur} onChange={formik.handleChange}
              type="email"
              id="email"
              name="email"
              className="form-control my-2"
            />
           {formik.errors.email && formik.touched.email? <div  style={{ color: "red" }}>{formik.errors.email}</div> : ''}

          </div>
          <div className="my-3">
            <label htmlFor="password">Password :</label>
            <input
             onBlur={formik.handleBlur} onChange={formik.handleChange}
              type="password"
              id="password"
              name="password"
              className="form-control my-2"
            />
           {formik.errors.password && formik.touched.password? <div style={{ color: "red" }}>{formik.errors.password}</div> : ''}

          </div>
          <button type='submit' onSubmit={()=>submitForm()} className="btn btn-dark w-100 mt-3">Login</button>
         <div className="d-flex justify-content-center align-center m-auto my-3 ">
          <h6 className="mt-2">Haven't Account yet ? </h6>
          <Link to="/register" className={style.registerLink}>Create Account</Link>
         </div>
        </form>
      </div>
    </>
  );
}
