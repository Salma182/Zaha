import React, { useEffect, useRef, useState } from "react";
import style from "../NavsAndTabs/NavsAndTabs.module.css";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate } from "react-router-dom";


export default function SearchedProducts({products}) {
    const [isHovering, setIsHovering] = useState(false);
    const sliderRef = useRef(null);
    const navigate= useNavigate();

    useEffect(() => {
      let interval;
      if (isHovering) {
        interval = setInterval(() => {
          if (sliderRef.current) {
            sliderRef.current.slickNext();
          }
        }, 1000); // Adjust the interval as needed
      }
      return () => {
        clearInterval(interval);
      };
    }, [isHovering]);
  
  const settings = {
    dots: true,
      infinite: true,
      autoplay: false, // Disable autoplay to handle manually
      speed: 300,
      slidesToShow: 1,
      slidesToScroll: 1,
      swipeToSlide: true,
  };

  
  const handleProductClick = (productId) => {
    navigate(`/productdetails/${productId}`);
  };


console.log(products)

    return <>

    <div className="bg-color w-50">
        {/* <h3>aloo</h3>
                <h3>aloo</h3> */}

{products && products?.map((product)=>{
<div>
    <h5>{product.name}</h5>
    </div>
})}

{/* 
<div className="mycard rounded rounded-3 overflow-hidden pointer" 
  onMouseEnter={() => setIsHovering(true)}
  onMouseLeave={() => setIsHovering(false)} 
  onClick={()=>handleProductClick(product.id)}>

    <div className={`${style.myimg}`}>

    <Slider  ref={sliderRef} {...settings}>
      {product.images?.map((image, index) => (
              <div key={index}>
                <img src={image} alt="img"  height={400} className="w-100 object-fit-cover"/>
              </div>
            ))}
        </Slider>

      <div className={`${style.layer}`}>
        {product.quantity == 0 ? <div className={`${style.sold}`}>sold out</div> : ""}
        <span className={`${style.eye}`}>
          <i className={` fa-solid fa-eye`}></i>
          <small className={`${style.small}`}>
            overveiw
          </small>
        </span>
        <div className={`${style.shopCart} pointer`}>
          <i className="fa-solid fa-cart-plus"></i>
        </div>
        <span className={style.title}>{product.desc} description</span>
      </div>
    </div>
    <div className={`${style.content}`}>
      <div className="left">
        <h6 className="small my-2">{product.name}</h6>
        <p className="small my-0">Material : {product.material}</p>
        <p className="small my-0">Size : {product.size}</p>
        <ul className="p-0 my-2">
          <i className="fa-solid fa-star text-warning"></i>
          <i className="fa-solid fa-star text-warning"></i>
          <i className="fa-solid fa-star text-warning"></i>
          <i className="fa-solid fa-star text-warning"></i>
          <i className="fa-solid fa-star"></i>
        </ul>
        <p className="small">
          {product.price} LE
        </p>
      </div>
      <div className={`${style.right}`}>
        <div
          className={`bg-danger ${style.circle}`}
        ></div>
        <div className={`bg-info ${style.circle}`}></div>
        <div
          className={`bg-success ${style.circle}`}
        ></div>
      </div>
    </div>
  </div> */}
    </div>


    </>
}