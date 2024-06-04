import React, { useEffect, useState } from "react";
import style from "./ProductDetails.module.css";
import axios from "axios";
import Rate from "./Rate";
import Swal from "sweetalert2";

export default function PostReview({productId}) {
  const [name, setName]=useState("");
  const[id,setid]=useState("");    
  const[email,setEmail]=useState("");
  const[image,setImage]=useState("");
  const[rate,setRate]=useState("");
  const[rating,setRating]=useState("");
const [Data,setData]=useState("");
const [review,setReview]=useState("");
const [errors, setErrors] = useState({});


async function GetRate(id){
  const {data} = await axios.get(`https://zahaback.com/api/review/productReviewResult/${id}`,
  {
    headers: {
      Authorization: `Bearer G7h22L1YUtE9wexBIepKfZ6dac1yIcgMNFLAsC9d73580a97`,
    },
  }
  )
  setRating(data.ceil_rate)
  setData(data)
  console.log("returnedData",data)
  }

const handleImageChange=(e) =>{
setImage(e.target.files[0])
}

const validateForm = () => {
  const newErrors = {};
  if (!name) newErrors.name = 'Name is required';
  if (!review) newErrors.review = 'Review is required';
  if (!rate) newErrors.rate = 'Rate is required';
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
}

async function Review(e){
  e.preventDefault();
  
  if (!validateForm()) {
    return;
  }
  const formData = new FormData();
  formData.append("name", name);
  formData.append("image", image);
  formData.append("email", email);
  formData.append("rate", rate);
  formData.append("review", review);
  formData.append("product_id", id);

  try{
  const {data} = await axios.post(`https://zahaback.com/api/review/create`,
  formData ,
  {
    headers: {
      Authorization: `Bearer G7h22L1YUtE9wexBIepKfZ6dac1yIcgMNFLAsC9d73580a97`,
    },
  }
  )
  Swal.fire({
    position: "center",
    icon: "success",
    title: data.message,
    showConfirmButton: false,
    timer: 2000,
  });
  // setData(data)
  console.log(data.message)
}catch(e) {
  console.log(e)
}
}

console.log("productid",productId)

useEffect(() => {
  GetRate(id)
  setid(productId)},
   [productId]);

return<>


    <div className="container">
                  <hr className={`${style.hr} my-4`} />
          <div className="small my-3">
            <h3>Reviews (3)</h3>
            <div className="container">
              <div className="row">
              {/* {Data && ( ) } */}
              <div className="col-md-6">
              <div className="rev">
                <h4 className="mt-4">Based On {Data.count} Reviews</h4>
                <p className="my-1">
                  <span className="fw-bold fs-3 text-success">{Data.ceil_rate}</span>{" "}
                  Overall
                </p>

                <div className="container">
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="stars">
                      <Rate  returnedData={Data} />
                      </div>
                    </div>
                    <div className="col-sm-6"></div>
                  </div>
                </div>
              </div>
            </div>
              
                <div className="col-md-6">
                  <div className="add">
                    <h4>Add Review</h4>
                    <p className="my-1">
                      Your email address will not be published. Required fields
                      are marked *
                    </p>
                
                    <form onSubmit={Review}>
                    <p className="my-1">
                      <span className="me-3">Your rating:</span>
                      <Rate initialRate={1} onRate={setRate} Rating={rating}/>
                      {errors.rate && <p className="text-danger">{errors.rate}</p>}
                    </p>
                    <label htmlFor="rev">Your Review : *</label> 
                    <textarea
                      name="rev"
                      id="rev"
                      className={`${style.area} form-control p-3`}
                      placeholder="add your review here...."
                      value={review}
                      onChange={e=> setReview(e.target.value)}
                    ></textarea>
                  {errors.review && <p className="text-danger">{errors.review}</p>}

                      <div
                        className={`${style.form} d-flex justify-content-between my-3`}
                      >
                        <div className={`${style.cont}`}>
                          <label htmlFor="name" className="mb-2">
                            Name : *
                          </label>{" "}
                        
                          <input
                            id="name"
                            type="text"
                            className={`${style.input} form-control`}
                            value={name}
                            onChange={e=> setName(e.target.value)}
                          />
                          {errors.name && <p className="text-danger">{errors.name}</p>}

                        </div>
                        <div className={`${style.cont}`}>
                          <label htmlFor="email" className="mb-2">
                            Email :
                          </label>{" "}
                          *
                          <input
                            className={`${style.input} form-control`}
                            id="email"
                            type="text"
                            value={email}
                            onChange={e=> setEmail(e.target.value)}
                          />
                        </div>
                      </div>
  
                      <p className="my-1">
                        Pictures (max size: 3000 kB, max files: 1){" "}
                      </p>
                      <label htmlFor="file" className="text-success fw-bold me-2">
                        Upload Image :
                      </label>
                      <input type="file" id="file" 
                      onChange={handleImageChange}/>
                      <br />
                      <br />
                      <div className="d-flex align-align-items-center">
                        <input type="checkbox" name="saveme" id="save" />
                        <label htmlFor="save" className="ms-2 small pointer">
                          Save my name, email, and website in this browser for the
                          next time I comment.
                        </label>
                      </div>
                      <button
                        type="submit"
                        className="btn btn-success btn-sm my-3 px-4"
                        onClick={Review}
                      >
                        {" "}
                        Submit{" "}
                      </button>
                    </form>
                  </div>
                </div>
              </div>

              <hr className={`${style.hr} my-4`} />
              <div className="allrev my-5">
                <h2 className="text-uppercase text-center fw-bold">
                  no reviews yet
                </h2>
  
                <div className="rev my-5">
                  <div className=" comment align-items-center d-flex justify-content-start ">
                    {/* <img className={style.userImage} src={image} alt="user" /> */}
                    <div className="ms-4">
                      <div className="icon">
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                      </div>
                      <p className="my-1">username</p>
                      <p className="my-1">comment</p>
                    </div>
                  </div>
                  <hr className={style.hr} />
                </div>
                <div className="rev my-5">
                  <div className=" comment align-items-center d-flex justify-content-start ">
                    {/* <img className={style.userImage} src={image} alt="user" /> */}
                    <div className="ms-4">
                      <div className="icon">
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                      </div>
                      <p className="my-1">username</p>
                      <p className="my-1">comment</p>
                    </div>
                  </div>
                  <hr className={style.hr} />
                </div>
              </div>
            </div>
          </div>
                  </div>




</>
}