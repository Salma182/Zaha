import React, { useContext, useEffect, useRef, useState } from "react";
import style from "../NavsAndTabs/NavsAndTabs.module.css";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.min.css";
import "owl.carousel/dist/assets/owl.theme.default.min.css";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../SearchContext/SearchContext";
import Loading from "../Loading/Loading";
import WishlistContext from "../../WishlistContext/WishlistContext";

export default function SearchedProducts() {
  const {
    input, setInput,
    products, setProducts,
    showResults, setShowResults,
    loading, setLoading
  } = useContext(SearchContext);
  const {selectedwishlist , AddtoWishlist ,setSelectedwishlist} = useContext(WishlistContext)

    const navigate= useNavigate();

    const settings = {
      margin: 20,
      responsiveClass: true,
      loop: true,
      autoplay: false,
      smartSpeed: 500,
      responsive: {
        0: { items: 1 },
        400: { items: 1 },
        550: { items:1 },
        750: { items: 1 },
        1000: { items: 1 },
        1200: { items: 1 },
      },
    };
  
  const handleProductClick = (productId) => {
    navigate(`/productdetails/${productId}`);
  };

  const handleAddtoWishlist=(id) =>{
    AddtoWishlist(id);
    setSelectedwishlist((prev) => [...prev, id]);
    //console.log("wishlist",id)
    //console.log(selectedwishlist)
  }  


    return <>
{loading ? (<Loading />) :
(
  <div className={style.searchedProducts} >
  <div className="container responsive gold">
          <div className="row g-3">
  {products && products.length > 0 ? (
      products.map((product) => (
  
        <div className="col-sm-6 col-md-4 col-lg-3" key={product.id} onClick={() => handleProductClick(product.name)}>
        <div className="mycard rounded rounded-3 overflow-hidden pointer"
              onClick={()=>handleProductClick(product.id)}>


          <div className={`${style.myimg}`}>
          <OwlCarousel {...settings}>
                  {product.images?.map((image, index) => (
                          <div key={index}>
                            <img src={image} alt="img"  height={400} className="w-100 object-fit-cover"/>
                          </div>
                        ))}
                    </OwlCarousel>
                    <i
                onClick={(e) => {
                  e.stopPropagation(); // Prevent event bubbling
                  handleAddtoWishlist(product.id);
                }}
                className={`fa-heart gold ${selectedwishlist.includes(product.id) ? 'fa-solid' : 'fa-regular'} text-red pointer fs-3 ${style.hearticon}`}
              ></i>

            <div className={`${style.layer}`}>
              <div className={`${style.sold}`}>{product.soldOut ? 'sold out' : ''}</div>
             
              <span className={style.title}>{product.name}</span>
            </div>
          </div>
          <div className={`${style.content}`}>
            <div className="left">
              <h6 className="small my-2">{product.name}</h6>

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




