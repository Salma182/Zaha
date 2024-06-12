import React, { useContext, useEffect, useRef, useState } from "react";
import CategoriesContext from "../../CategoriesContext/CategoriesContext";
import style from "../NavsAndTabs/NavsAndTabs.module.css";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.min.css";
import "owl.carousel/dist/assets/owl.theme.default.min.css";
import Select from 'react-select';
import WishlistContext from "../../WishlistContext/WishlistContext";

export default function  ChosenCategory(){
    const {categoryName, products, options, selectedOption, setSelectedOption, loading } = useContext(CategoriesContext);
    const navigate = useNavigate()
    const [filteredProducts, setFilteredProducts] = useState([]);
    const {selectedwishlist , AddtoWishlist ,setSelectedwishlist} = useContext(WishlistContext)

    useEffect(() => {
      if (selectedOption?.value === 'All' || !selectedOption) {
        setFilteredProducts(products);
      } else {
        const filtered = products.filter(product => product.subcategory === selectedOption.value);
        setFilteredProducts(filtered);
      }
    }, [selectedOption, products]);

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

{loading ? <Loading /> : (
  <div className="container responsive">
  <h1 className="m-auto gold text-center">{categoryName}</h1>
  
   <div className={style.Dropdown}>
   <Select
        value={selectedOption}
        onChange={setSelectedOption}
        options={options}
        placeholder="Select a category"
        className={style.select}
      />
   </div>
  
      {filteredProducts ? <div className=" gold" style={{marginTop:"2%"}}>
              <div className="row g-3">
                {filteredProducts.map((product) => (
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
                        {product.badge !== null ? <div className={style.badge} >{product.badge}</div> : ""}
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
                ))}
              </div>
            </div> : <Loading />}
  
            </div>
)}

</>

}