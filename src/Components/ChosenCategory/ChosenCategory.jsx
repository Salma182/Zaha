import React, { useContext, useEffect, useRef, useState } from "react";
import CategoriesContext from "../../CategoriesContext/CategoriesContext";
import style from "../NavsAndTabs/NavsAndTabs.module.css";
import { useNavigate } from "react-router-dom";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Loading from "../Loading/Loading";
import WishlistContext, { WishlistProvider } from "../../WishlistContext/WishlistContext";

export default function  ChosenCategory(){
    const {categoryName, setCategoryName, products, setProducts } = useContext(CategoriesContext);
    const [isHovering, setIsHovering] = useState(false);
    const sliderRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const {selectedwishlist , AddtoWishlist ,setSelectedwishlist} = useContext(WishlistContext)

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

const handleAddtoWishlist=(id) =>{
  AddtoWishlist(id);
  setSelectedwishlist((prev) => [...prev, id]);
  console.log("wishlist",id)
  console.log(selectedwishlist)
}  

const handleProductClick = (productId) => {
    navigate(`/productdetails/${productId}`);
  };

return <>
{products ?  <div className="container" style={{marginTop:"7%"}}>
            <div className="row g-3">
              {products.map((product) => (
                <div className="col-sm-6 col-md-4 col-lg-3" key={product.id} onClick={() => handleProductClick(product.name)}>
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

                              <div onClick={() => handleAddtoWishlist(product.id)} className={style.hearticon}>
                        <i className={` fa-heart gold ${selectedwishlist.includes(product.id) ? `fa-solid` : `fa-regular ` } text-red  pointer fs-3`}></i>
                     </div>

                      <div className={`${style.layer}`}>
                      {product.badge !== null ? <div className={style.badge} >{product.badge}</div> : ""}
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
              ))}
            </div>
          </div> : <Loading />}


</>

}