import React, { useContext, useEffect, useRef, useState } from "react";
import style from "../NavsAndTabs/NavsAndTabs.module.css";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../SearchContext/SearchContext";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Loading from "../Loading/Loading";

export default function SearchedProducts() {
  const {
    input, setInput,
    products, setProducts,
    showResults, setShowResults,
    loading, setLoading
  } = useContext(SearchContext);

    const [isHovering, setIsHovering] = useState(false);
    const sliderRef = useRef(null);
    const navigate= useNavigate();

    useEffect(() => {
      setShowResults(false)
      console.log(products)
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



    return <>
{loading ? (<Loading />) :
(
  <div className={style.searchedProducts} style={{marginTop:"5%"}}>
  <div className="container my-5">
          <div className="row g-3">
  {products && products.length > 0 ? (
      products.map((product) => (
  
        <div className="col-sm-6 col-md-4 col-lg-3" key={product.id} onClick={() => handleProductClick(product.id)}>
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
              <div className={`${style.sold}`}>{product.soldOut ? 'sold out' : ''}</div>
              <span className={`${style.eye}`}>
                <i className={` fa-solid fa-eye`}></i>
                <small className={`${style.small}`}>overview</small>
              </span>
              <div className={`${style.shopCart} pointer`}>
                <i className="fa-solid fa-cart-plus"></i>
              </div>
              <span className={style.title}>{product.name}</span>
            </div>
          </div>
          <div className={`${style.content}`}>
            <div className="left">
              <h6 className="small my-2">{product.name}</h6>
              <ul className="p-0 my-2">
                {Array.from({ length: 5 }).map((_, index) => (
                  <i
                    key={index}
                    className={`fa-solid fa-star ${index < product.rating ? 'text-warning' : ''}`}
                  ></i>
                ))}
              </ul>
              <p className="small">{product.price} EGP</p>
            </div>
            <div className={`${style.right}`}>
              {product.colors.map((color) => (
                <div key={color} className={`${style.circle}`} style={{ backgroundColor: color }}></div>
              ))}
            </div>
          </div>
        </div>
      </div>
      ))
    ) : (
      <div style={{marginTop:"7%"}}>
              <p className="fw-bold">No products found</p>
          </div>
    )}

  </div>
</div>
</div>
)

}
   

    </>
}




