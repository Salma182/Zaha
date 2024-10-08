import React, { useContext, useEffect, useRef, useState } from "react";
import style from "./NavsAndTabs.module.css";
import img from "../../Images/fff.jpg";
import axios from "axios";
import classNames from 'classnames'; // For better class name handling
import ProductDetails from "../ProductDetails/ProductDetails";
import { useNavigate } from "react-router-dom";
import WishlistContext from "../../WishlistContext/WishlistContext";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.min.css";
import "owl.carousel/dist/assets/owl.theme.default.min.css";
import Rate from "../ProductDetails/Rate";

export default function NavsAndTabs() {
  const [product, setProduct] = useState([]);
  const [nav, setNav]= useState('');
  const[specificProducts,setSpecificProducts] = useState([])
  const[categories, setCategories] = useState([])
  const navigate = useNavigate()
   const[Id, setId] = useState(null)
   const[productName, setproductName] = useState("")
   const { AddtoWishlist, setproductname, productname , selectedwishlist, setSelectedwishlist  } = useContext(WishlistContext);

   const handleAddtoWishlist = (productId) => {
    AddtoWishlist(productId);
    setSelectedwishlist((prevWishlist) => 
      prevWishlist.includes(productId)
        ? prevWishlist.filter((id) => id !== productId) // Remove from wishlist if already present
        : [...prevWishlist, productId] // Add to wishlist if not present
    );
  };

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

  async function Navs() {
const {data}= await axios.get(`https://zahaback.com/api/categoriesCollection`
)
setNav(data.category)
setId(null)
//console.log("navs",data.category)
  }

  async function getAllProducts() {
    const { data } = await axios.get(
      `https://zahaback.com/api/userproduct/all`
    );
    setProduct(data.products);
    setSpecificProducts(data.products);
    //console.log("products",data.products);
  }

  async function getCategories(){
    const{data}= await axios.get(`https://zahaback.com/api/categoriesCollection`
    )
    setCategories(data.category)
    setId(data.category.id)
    //console.log("productCategory",data.category)
  }


  async function getSpecificProducts(Id){
    const{data}= await axios.get(`https://zahaback.com/api/products/category/${Id}`
    )
    setSpecificProducts(data.products)
    //console.log("productCategory",data.products)
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
  <h1 className="title">FEATURED</h1>

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

      <div className="tab-content gold" id="myTabContent">
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
      
          onClick={() => handleProductClick(product.name)}
        >
          <div className={`${style.myimg}`}>
          <OwlCarousel {...settings}>
              {product.images?.map((image, index) => (
                <div key={index}>
                  <img src={image} alt="img" height={400} className="w-100 object-fit-cover pointer" onClick={() => handleProductClick(product.name)} />
                </div>
              ))}
            </OwlCarousel>

            <i
            onClick={(e) => {
              e.stopPropagation(); // Prevent event bubbling
              handleAddtoWishlist(product.id);
            }}
            className={classNames(
              'fa-heart gold text-red pointer fs-3',
              {
                'fa-solid': selectedwishlist.includes(product.id),
                'fa-regular': !selectedwishlist.includes(product.id),
              },
              style.hearticon
            )}
          ></i>
          
            <div className={`${style.layer}`}>
              {product.badge !== null ? <div className={style.badge}>{product.badge}</div> : ""}
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
              
                        onClick={()=>handleProductClick(product.name)}
                        >


                    <div className={`${style.myimg}`}>
                    <OwlCarousel {...settings}>
                            {product.images?.map((image, index) => (
                                    <div key={index}>
                                      <img src={image} alt="img"  height={400} className="w-100 object-fit-cover"/>
                                    </div>
                                  ))}
                              </OwlCarousel>
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
