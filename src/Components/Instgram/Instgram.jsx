import React, { useEffect, useState } from "react";
import style from "./Instgram.module.css";
import model from "../../Images/model.jpg";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.min.css";
import "owl.carousel/dist/assets/owl.theme.default.min.css";
import axios from "axios";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";

export default function Instgram() {
 const[images, setImages]=useState([])
const[loading, setLoading] = useState(false)

  const options = {
    margin: 10,
    responsiveClass: true,
    loop: true,
    autoplay: true,
    smartSpeed: 400,
    responsive: {
      0: { items: 1 },
      400: { items: 1 },
      550: { items:3 },
      750: { items: 4 },
      1000: { items: 4},
      1200: { items: 4 },
    },
  };

  async function GetImages(){
    setLoading(true)
    try{
      const {data}= await axios.get(`https://zahaback.com/api/allInsta`,
      {  
        headers: {
          Authorization: `Bearer G7h22L1YUtE9wexBIepKfZ6dac1yIcgMNFLAsC9d73580a97`,
        },
      }
      )
      setImages(data.allInsta)
      console.log(data.allInsta)  

    }catch(e){console.error(e)
      setLoading(false)
    }

  }


  useEffect(()=> {
    GetImages()
  },[])

  return (
    <>

{/* {loading ? <Loading /> :  */}
<div>
<h1 className={` title `}>
        follow us on Instgram
      </h1>


  <OwlCarousel {...options}>
         {images && images.length > 0 ? (
          images?.map((item)=> 
            <div
            key={""}
            className={`${style.item} container mt-5 rounded rounded-5 overflow-hidden position-relative`}
          >
            <Link target="_blank" to={item.name}> 

            <img
              className="object-fit-cover w-100"
              src={item.path}
              height={700}
              alt="img"
            />
            </Link>
            
          </div>
          )
         ) : " "}
          
        </OwlCarousel>
</div> 


    </>
  );
}
