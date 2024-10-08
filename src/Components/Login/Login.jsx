import React, { useContext, useState } from "react";
import style from "./Login.module.css";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext/AuthContext";

export default function Login() {
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  let navigate = useNavigate();

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
    onSubmit: async (values) => {
      await login(values, setError);
      navigate('/');
    },
  });

  return (
    <>
      <div className="container responsive">
        <div className="py-3"></div>
        <h1 className="text-center fw-bold mb-3">Login</h1>
        <form onSubmit={formik.handleSubmit} className="Authform ">
          {error ? <div className='alert alert-danger'>{error}</div> : ''}

          <div className="my-3 fw-bold">
            <label htmlFor="email">Email</label>
            <input
              onBlur={formik.handleBlur} onChange={formik.handleChange}
              type="email"
              id="email"
              name="email"
              className="form-control my-2"
            />
            {formik.errors.email && formik.touched.email ? <div style={{ color: "red" }}>{formik.errors.email}</div> : ''}
          </div>
          <div className="my-3 fw-bold">
            <label htmlFor="password">Password</label>
            <input
              onBlur={formik.handleBlur} onChange={formik.handleChange}
              type="password"
              id="password"
              name="password"
              className="form-control my-2"
            />
            {formik.errors.password && formik.touched.password ? <div style={{ color: "red" }}>{formik.errors.password}</div> : ''}
          </div>
          <button type='submit' className="btn btn-dark w-100 mt-3">Login</button>
          <div className="d-flex justify-content-center align-center m-auto my-3">
            <h6 className="mt-2">Haven't Account yet?</h6>
            <Link to="/register" className={style.registerLink}>Create Account</Link>
          </div>
        </form>
      </div>
    </>
  );
}
