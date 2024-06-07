import React, { useEffect, useState } from "react";
import style from "./Reviews.module.css";
import { Table } from "react-bootstrap";
import axios from "axios";
import Loading from "../../Loading/Loading";
import Rate from "../../ProductDetails/Rate";
import Swal from "sweetalert2";

export default function Reviews() {
  const [Reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
const[toggle, setToggle] = useState(false);
const token = localStorage.getItem('token');

  async function getReviews() {
    setLoading(true)
    try{
      let { data } = await axios.get(
        `https://zahaback.com/api/userData/allReviews`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(111);
      console.log(data.allReviews.data);
      setReviews(data.allReviews.data);

      if(data.allReviews.data.is_accepted === "accepted" ){
        setToggle(true)
      }else {
        setToggle(false)
      }
      setLoading(false)

    }catch(e){
      console.log(e)
    }
  }

  async function EditReview(id) {
    try {
      let { data } = await axios.post(
        `https://zahaback.com/api/userData/review/${id}/changeStatus`,
        null, // Passing null as the second parameter since there's no data to send
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.message === "Review status changed to reject") {
        setToggle(false);
      } else if (data.message === "Review status changed to accept"){
        setToggle(true);
      }
  
    Swal.fire({
        icon: 'success',
        title: 'Review Status Changed',
      }).then(() => {
        getReviews();
      });
      console.log(data.message);
      // setReviews(data.allReviews.data);
    } catch (e) {
      console.log(e);
    }
  }
  

  async function DeleteReview(id) {
    setLoading(true);
    try {
      let { data } = await axios.get(
        `https://zahaback.com/api/userData/deletereview/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );  
      Swal.fire({
        icon: "success",
        title: "Review deleted successfully",
      }).then(() =>{
        getReviews();
        window.location.reload();
    })
      console.log(data.message);
      // setReviews(data.allReviews.data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getReviews();
  }, []);

  return (
    <>
      <h1 className="text-center bg-color text-dark rounded-3 fw-bold text-capitalize p-3 my-3">
        Reviews
      </h1>
      {loading ? <Loading /> :  <div className="container">
        <div className="row">
          {Reviews.length > 0
            ? Reviews.map((review) => (
              <div className="col-12 col-sm-6 col-md-6 col-lg-4 mb-4" key={review.id}>
              <div className="item text-start border border-3 rounded-3 p-3 h-100 d-flex flex-column">
                <p className="fw-bold pt-3">Name : {review.name}</p>
                <p className="fw-bold">Product Id : {review.product_id}</p>
                <p className="fw-bold">Review : {review.review}</p>
                <p className="fw-bold">Email : {review.email}</p>
                <p className="fw-bold">Status :
                  <button
                    className={review.is_accepted === "accepted" ? `accepted` : `rejected`}
                    onClick={() => EditReview(review.id)}
                    disabled={loading}
                  >
                    {review.is_accepted}
                  </button>
                </p>
                <Rate rating={review.rate} />
        
                {review?.image ? (
                  <img
                    src={review.image}
                    className="object-fit-cover mt-3"
                    width={200}
                    height={150}
                    alt=""
                  />
                ) : ""}
        
                <div className="mt-auto">
                  <div className="buttons">
                    <button
                      className="deleteBtn mt-4 w-75"
                      onClick={() => {
                        Swal.fire({
                          title: "Are you sure?",
                          text: "You won't be able to revert this!",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#3085d6",
                          cancelButtonColor: "#d33",
                          confirmButtonText: "Yes, delete it!",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            DeleteReview(review.id);
                          }
                        });
                      }}
                      disabled={loading}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>

            //   <div className="text-center" key={review.id}>
            //   <div className="item border border-3 p-2 d-flex">
            //     <div className="col-md-7 d-flex flex-column justify-content-center text-start">
            //       <p className="fw-bold pt-3">Name : {review.name}</p>
            //       <p className="fw-bold ">Product Id : {review.product_id}</p>
            //       <p className="fw-bold ">Review : {review.review}</p>
            //       <p className="fw-bold ">Email : {review.email}</p>
            //       <p className="fw-bold ">Status : {review.is_accepted}</p>
            //       <Rate rating={review.rate} />
            //     </div>
            //     {review.image ?  <img
            //       src={review.image}
            //       className="object-fit-cover col-md-5"
            //       height={150}
            //       alt=""
            //     /> : ""}
               
            //   </div>
            // </div>
            
              ))
            : ""}
        </div>
      </div>}
    
    </>
  );
}
