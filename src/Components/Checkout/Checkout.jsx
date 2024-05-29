import React, { useEffect, useState } from "react"
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";

export default function Checkout() {

const [cities, setCities]= useState([])
const [cityId, setCityId]= useState("")

    const user = {
      first_name: "",
      last_name: "",
      email:"",
      state: "",
      phone:"",
      address:"",
      additional_phone:"",
      city:"",
    instagram_user: ""
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
        first_name: Yup.string().matches(/^(?=.*[a-zA-Zء-ي].*[a-zA-Zء-ي])[\s\S]*$/, "Invalid name").required("Required"),
        last_name:Yup.string().matches(/^(?=.*[a-zA-Zء-ي].*[a-zA-Zء-ي])[\s\S]*$/, "Invalid name").required("Required"),
        email: Yup.string().matches(emailRegex, "Invalid email address").email("Invalid").required("Required"),
        state:Yup.string().matches(/^(?=.*[a-zA-Zء-ي].*[a-zA-Zء-ي])[\s\S]*$/, "Invalid name").required("Required"),
        phone:Yup.string().required('Required').matches(/^(01)[0-2|5][0-9]{8}$/,'Enter Valid Number'),
        additional_phone:Yup.string().matches(/^(01)[0-2|5][0-9]{8}$/,'Enter Valid Number'),
        address:Yup.string().required('Required'),
        city: Yup.string().required('City is required'),
        instagram_user: Yup.string().matches(/^(?=.*[a-zA-Zء-ي].*[a-zA-Zء-ي])[\s\S]*$/, "Invalid name"),

    });

    const formik = useFormik({
      initialValues: user,
      validationSchema: valid,
      onSubmit: (values) => {
        const FormData = { ...values, city: cityId.toString() };
        console.log('Form data:', FormData);
        Checkout(FormData);
      },
      initialErrors: {}, // No initial errors
    });
  
    const Checkout = async (values) => {
      const token = localStorage.getItem('guestToken');
      try {
        const { data } = await axios.post(`https://zahaback.com/api/checkout/${token}`, values, {
          headers: {
            Authorization: `Bearer G7h22L1YUtE9wexBIepKfZ6dac1yIcgMNFLAsC9d73580a97`,
          },
        });
        console.log(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

async function Getcity(){
const {data} = await axios.get(`https://zahaback.com/api/getAreaEstimate`,
{  
  headers: {
    Authorization: `Bearer G7h22L1YUtE9wexBIepKfZ6dac1yIcgMNFLAsC9d73580a97`,
  },
}
)
setCities(data.areaEstimate)
}
  
const handleChangeCity = (e) => {
  const selectedCity = cities.map((city)=>city).find(city => city.city === e.target.value)
  setCityId(selectedCity ? selectedCity.id : '');
  formik.handleChange(e);
  console.log('Selected city ID:', selectedCity ? selectedCity.id : 'Not found');
};


useEffect(() => {
Getcity()
}, [])

    return <>

      <div className="" style={{marginTop:"10%"}}>

      <form onSubmit={formik.handleSubmit} className="bg-color p-3 rounded-3 w-50 m-auto">
        {errors ? (
            <div className="bg-white" style={{ color: "red" }}>
              {" "}
              {errors.all}{" "}
            </div>
          ) : (
            ""
          )}
          
          <div>
        <label className="fw-bold" htmlFor="first_name">First name</label>
        <input
          autoComplete="off"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}        
          id="first_name:"
          placeholder=""
          name="first_name"
          type="text"
          value={formik.values.first_name}
          className="form-control my-2"
        />
        {formik.errors.first_name && formik.touched.first_name && (
          <div className="mb-2" style={{ color: "red" }}>{formik.errors.first_name}</div>
        )}
      </div>


      <div>
        <label className="fw-bold" htmlFor="last_name">Last name</label>
        <input
          autoComplete="off"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}        
          id="last_name"
          placeholder=""
          name="last_name"
          type="text"
          value={formik.values.last_name}
          className="form-control my-2"
        />
        {formik.errors.last_name && formik.touched.last_name && (
          <div className="mb-2" style={{ color: "red" }}>{formik.errors.last_name}</div>
        )}
      </div>

      <div>
      <label className="fw-bold" htmlFor="user_email">Email</label>
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
              <div className="mb-2" style={{ color: "red" }}>{formik.errors.email}</div>
            ) : (
              ""
            )}
          </div>

          <div>
        <label className="fw-bold" htmlFor="address">Address</label>
        <input
          autoComplete="off"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          id="address"
          name="address"
          type="text"
          value={formik.values.address}
          className="form-control my-2"
        />
        {formik.errors.address && formik.touched.address && (
          <div className="mb-2" style={{ color: 'red' }}>{formik.errors.address}</div>
        )}
      </div>

      <div>
        <label className="fw-bold" htmlFor="state">State</label>
        <input
          autoComplete="off"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          id="state"
          name="state"
          type="text"
          value={formik.values.state}
          className="form-control my-2"
        />
        {formik.errors.state && formik.touched.state && (
          <div className="mb-2" style={{ color: 'red' }}>{formik.errors.state}</div>
        )}
      </div>

      <div>
        <label className="fw-bold" htmlFor="city">City</label>
        <select
          id="city"
          name="city"
          onBlur={formik.handleBlur}
          onChange={(e)=>handleChangeCity(e)}        
          value={formik.values.city}
          className="form-control my-2"
        >
          <option value="" label="Select City" />
          {cities &&
          cities?.map((item) => (
            <option key={item.id} value={item.city}>
              {item.city}
            </option>
          ))
        }
        </select>
        {formik.errors.city && formik.touched.city && (
          <div style={{ color: 'red' }}>{formik.errors.city}</div>
        )}
      </div>

      <div>
        <label className="fw-bold" htmlFor="phone">Phone Number</label>
        <input
          autoComplete="off"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          id="phone"
          name="phone"
          type="text"
          value={formik.values.phone}
          className="form-control my-2"
        />
        {formik.errors.phone && formik.touched.phone && (
          <div className="mb-2" style={{ color: 'red' }}>{formik.errors.phone}</div>
        )}
      </div>

      <div>
        <label className="fw-bold" htmlFor="additionalPhoneNumber">Additional Phone Number</label>
        <input
          autoComplete="off"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          id="additional_phone"
          name="additional_phone"
          type="text"
          value={formik.values.additional_phone}
          className="form-control my-2"
        />
        {formik.errors.additional_phone && formik.touched.additional_phone && (
          <div className="mb-2" style={{ color: 'red' }}>{formik.errors.additional_phone}</div>
        )}
      </div>


      <div>
        <label className="fw-bold" htmlFor="instagram_user">Instagram user</label>
        <input
          autoComplete="off"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          id="instagram_user"
          name="instagram_user"
          type="text"
          value={formik.values.instagram_user}
          className="form-control my-2"
        />
        {formik.errors.instagram_user && formik.touched.instagram_user && (
          <div className="mb-2" style={{ color: 'red' }}>{formik.errors.instagram_user}</div>
        )}
      </div>


          {/* <div className="my-3">
            <label htmlFor="user_phone">Phone :</label>
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
          </div> */}

          <button onSubmit={()=>Checkout()} type='submit' className="btn btn-dark w-100 mt-3">Checkout</button>
        </form>



      </div>



</>
}