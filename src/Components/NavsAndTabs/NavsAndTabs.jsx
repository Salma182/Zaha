import React, { useContext, useEffect, useRef, useState } from "react";
import style from "./NavsAndTabs.module.css";
import img from "../../Images/fff.jpg";
import axios from "axios";
import ProductDetails from "../ProductDetails/ProductDetails";
import { useNavigate } from "react-router-dom";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import WishlistContext from "../../WishlistContext/WishlistContext";

export default function NavsAndTabs() {
  const [product, setProduct] = useState([]);
  const [nav, setNav]= useState('');
  const[specificProducts,setSpecificProducts] = useState([])
  const [isHovering, setIsHovering] = useState(false);
  const sliderRef = useRef(null);
  const[categories, setCategories] = useState([])
  const navigate = useNavigate()
   const[Id, setId] = useState(null)
   const[productName, setproductName] = useState("")
   const { AddtoWishlist, setproductname, productname , selectedwishlist, setSelectedwishlist  } = useContext(WishlistContext);

const handleAddtoWishlist=(id) =>{
    AddtoWishlist(id);
    setSelectedwishlist((prev) => [...prev, id]);
    console.log("wishlist",id)
    console.log(selectedwishlist)
}  

  // useEffect(() => {
  //   let interval;
  //   if (isHovering) {
  //     interval = setInterval(() => {
  //       if (sliderRef.current) {
  //         sliderRef.current.slickNext();
  //       }
  //     }, 1000); // Adjust the interval as needed
  //   }
  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [isHovering]);

const settings = {
  dots: false,
    infinite: true,
    autoplay: false, // Disable autoplay to handle manually
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
};

  async function Navs() {
const {data}= await axios.get(`https://zahaback.com/api/categoriesCollection`
)
setNav(data.category)
setId(null)
console.log("navs",data.category)
  }

  async function getAllProducts() {
    const { data } = await axios.get(
      `https://zahaback.com/api/userproduct/all`
    );
    setProduct(data.products);
    setSpecificProducts(data.products);
    console.log("products",data.products);
  }

  async function getCategories(){
    const{data}= await axios.get(`https://zahaback.com/api/categoriesCollection`
    )
    setCategories(data.category)
    setId(data.category.id)
    console.log("productCategory",data.category)
  }


  async function getSpecificProducts(Id){
    const{data}= await axios.get(`https://zahaback.com/api/products/category/${Id}`
    )
    setSpecificProducts(data.products)
    console.log("productCategory",data.products)
  }
  const handleProductClick = (productName) => {
    setproductName(productName)
    navigate(`/productdetails/${productName}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });

  };

  const handleTabClick = (categoryId) => {
    getSpecificProducts(categoryId)
    setId(categoryId);
  };

  console.log(Id)
  useEffect(() => {
    getAllProducts();
    getCategories();
    Navs()
    getSpecificProducts(undefined)
  }, []);

  return (
    <>

<div className="mt-5">
  <div className="container w-100">
  <h1 className="title">New Collection</h1>

  </div>
      <ul className={`nav ${style.tabs}`} id="myTab" role="tablist">
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link tabLink ${style.link} ${Id === null || undefined ? ' show active' : ''}`}
            id="all-tab"
            data-bs-toggle="tab"
            data-bs-target="#all"
            type="button"
            role="tab"
            aria-controls="all"
            aria-selected={Id === null}
            onClick={() => setId(null)}
          >
            All
          </button>
        </li>
        {categories.map((category) => (
          <li className="nav-item" role="presentation" key={category.id}>
            <button
              className={`nav-link tabLink ${style.link} ${Id === category.id ? 'active' : ''}`}
              id={`${category.name}-tab`}
              data-bs-toggle="tab"
              data-bs-target={`#${category.name}`}
              type="button"
              role="tab"
              aria-controls={category.name}
              aria-selected={Id === category.id}
              onClick={() => handleTabClick(category.id)}
            >
              {category.name}
            </button>
          </li>
        ))}
      </ul>

      <div className="tab-content" id="myTabContent">
        <div
         className={`tab-pane fade ${Id === null || Id === undefined ? 'show active' : ''}`}
          id="all"
          role="tabpanel"
          aria-labelledby="all-tab"
        >
        <div className="container my-5">
  <div className="row g-3">
    {product.map((product) => (
      <div className="col-sm-6 col-md-4 col-lg-3" key={product.id}>
        <div
          className="mycard rounded rounded-3 overflow-hidden pointer"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onClick={() => handleProductClick(product.name)}
        >
          <div className={`${style.myimg}`}>
            <Slider ref={sliderRef} {...settings}>
              {product.images?.map((image, index) => (
                <div key={index}>
                  <img src={image} alt="img" height={400} className="w-100 object-fit-cover pointer" onClick={() => handleProductClick(product.name)} />
                </div>
              ))}
            </Slider>

            <i
              onClick={(e) => {
                e.stopPropagation(); // Prevent event bubbling
                handleAddtoWishlist(product.id);
              }}
              className={`fa-heart gold ${selectedwishlist.includes(product.id) ? 'fa-solid' : 'fa-regular'} text-red pointer fs-3 ${style.hearticon}`}
            ></i>

            <div className={`${style.layer}`}>
              {product.badge !== null ? <div className={style.badge}>{product.badge}</div> : ""}
              {/* <span className={`${style.eye}`}>
                <i className={` fa-solid fa-eye fs-5`}></i>
                <small className={`${style.small}`}>overview</small>
              </span>
              <div className={`${style.shopCart} pointer`}>
                <i className="fa-solid fa-cart-plus"></i>
              </div> */}
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
</div>

        </div>
        
        {categories.map((category) => (
          <div
            key={category.id}
            className={`tab-pane fade ${Id === category.id ? 'show active' : ''}`}
            id={category.name}
            role="tabpanel"
            aria-labelledby={`${category.name}-tab`}
          >
            <div className="container my-5">
              <div className="row g-3">
                {specificProducts.map((product) => (
                  <div className="col-sm-6 col-md-4 col-lg-3" key={product.id} 
                  onClick={() => handleProductClick(product.name)}
                  >
                    <div className="mycard rounded rounded-3 overflow-hidden pointer"
                  onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)} 
                        onClick={()=>handleProductClick(product.name)}
                        >


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
            </div>
          </div>
        ))}
      </div>
    </div>


  
    </>
  );
}
