import React, { useContext, useEffect, useRef, useState } from "react";
import style from "./ProductDetails.module.css";
import image from "../../Images/model.jpg";
import Delivery from "./../Delivery/Delivery";
import CallBack from "./../CallBack/CallBack";
import BackToTop from "./../BackToTop/BackToTop";
import DeliveryDetails from "../DeliveryDetails/DeliveryDetails";
import AskQuestions from './../AskQuestions/AskQuestions';
import axios from "axios";
import { useParams } from "react-router-dom";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Cart from "../Cart/Cart";
import CartContext from "../../CartContext/CartContext";
import Swal from "sweetalert2";
import Loading from "../Loading/Loading";

export default function ProductDetails() {
  const { cart, setCart, guestToken, setGuestToken } = useContext(CartContext);
  const [productdetails, setProductDetails] = useState([]);
  const { productId } = useParams();
const[quantity, setQuantity] = useState(1);
const [selectedImage, setSelectedImage] = useState('');
const [selectedColor, setSelectedColor] = useState('');
const[response, setResponse] = useState(null)
const [selectedSizeId, setSelectedSizeId] = useState(null);
const[loading, setloading] = useState(false);

const settings = {
  dots: true,
    infinite: true,
    autoplay: false, // Disable autoplay to handle manually
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
};

function onSizeClick (sizeId) {
  setSelectedSizeId(sizeId);
    console.log('Selected size ID:', sizeId);
}

async function ProductDetails(productId)  {
  setloading(false)

  try{
    const {data} =await axios.get(`https://zahaback.com/api/userproduct/getProduct/${productId}`,
    {
      headers: {
        Authorization: `Bearer G7h22L1YUtE9wexBIepKfZ6dac1yIcgMNFLAsC9d73580a97`,
      },
    }
    )
    // console.log(data)
    setProductDetails(data.product)
    }catch (e) {console.error(e)} finally{
      setloading(false)
    }
  }

console.log("productdetails:",productdetails)

useEffect(() => {
  ProductDetails(productId);
}, [productId]);

const handleQuantityChange = (e) => {
  setQuantity(e.target.value);
};

async function Addtocart(e) {
  e.preventDefault(); 

  const payload= { 
   items : [{
      product_id: +productId,
      quantity: quantity,
      size_id:selectedSizeId
    }],
  guest_token: guestToken
}
 
  try{
    const {data} = await axios.post(`https://zahaback.com/api/cart/add`, payload ,
    {  
     headers: {
       Authorization: `Bearer G7h22L1YUtE9wexBIepKfZ6dac1yIcgMNFLAsC9d73580a97`,
     },
   }
   )
   setResponse(data.cart_items)
   if (!guestToken) {
    const newGuestToken = data.guest_token;
    setGuestToken(newGuestToken);
    localStorage.setItem('guestToken', newGuestToken);
  }
  setCart((prevCart) => [...prevCart, ...data.cart_items]);

  Swal.fire({
    position: "center",
    icon: "success",
    title: data.message,
    showConfirmButton: false,
    timer: 2000,
  });
  console.log("addtocart", data)

   }
  catch(error){
    console.error('Error adding item to cart:', error);
  }
}

console.log("response", response)

const handleColorChange = (color, image) => {
  setSelectedColor(color);
  setSelectedImage(image);
};
  return (
    <>

    {loading ? (<Loading />) :  
    (
      <div>
      <div className="py-5"></div>
        <div className="container my-5">
  
      {productdetails ?
        <div className="row g-3">
        <div className="col-lg-4 text-center pointer" >
          {" "}
          {/* <img src={selectedImage} alt="model dress" className="w-100" /> */}
  
       
    <Slider  {...settings}>
    {productdetails.images?.map((image, index) => (
            <div key={index}>
              <img src={image} alt="" className={style.imgDefault} />
            </div>
          ))}
      </Slider>
  
        </div>
        <div className="col-lg-8">
          <div className="item">
            <h2>{productdetails.name}</h2>
            <h3>{productdetails.price} EGP</h3>
            <p>Sizes</p>
            <ul className="list-unstyled d-flex flex-row gap-3">
              {productdetails?.sizes?.map((product)=>
               <li
               key={product.id} 
               className={`sizebtn ${selectedSizeId === product.id ? 'selected' : ''}`}
               onClick={() => onSizeClick(product.id)} 
               style={{ cursor: 'pointer' }} 
             >
               {product.size}
             </li>
                )}
                </ul>
  
            <form onSubmit={Addtocart}>
              <div className="buy d-flex align-items-center">
                <input
                  type="number"
                  placeholder="number of items"
                  className={`${style.input} form-control w-25`}
                  min={1}
                  max={100}
                  value={quantity}
                  onChange={handleQuantityChange}
                />
                <button type="submit" className={`addBtn mx-2`}>
                  Add to cart
                </button>
                {/* <button className="btn btn-success px-4">Buy now</button> */}
              </div>
            </form>
            {response && <Cart response={response} />}
            <div className="item p-2 mb-2 mt-3 rounded-3 bg-light shadow-lg">
              <h3>{productdetails.material}</h3>
              <div className="rate">
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <span className="ms-2">(7 customer reviews)</span>
              </div>
            </div>
            <div className="item my-2 p-2 rounded-3 bg-light shadow-lg ">
              <h4>Color</h4>
              <div className="color my-2 d-flex align-items-center">
              {productdetails.colors?.map((color, index) => (
                  <div
                    key={color}
                    className={`${style.ball} mx-2`}
                    style={{ backgroundColor: color }}
                    onClick={() => handleColorChange(color, productdetails.images[index])}
                  ></div>
                ))}        
               
              </div>
            </div>{" "}
            <div className="item my-2 p-3 bg-light rounded-3 shadow-lg pointer">
              <span>
                <i className="fa-solid fa-heart"></i> Add To WishList
              </span>
            </div>
            <div className="item my-2 bg-light rounded-3 shadow-lg pointer">
              <CallBack />
            </div>
            <div className="item my-2 bg-light rounded-3 shadow-lg pointer">
              <AskQuestions />
            </div>
            <div className="item my-2 p-2 rounded-3 bg-light shadow-sm">
              <span>
                <i className="fa-solid fa-truck-fast"></i> Estimated Delivery:
                Mar 07 – Mar 09
              </span>
            </div>
          </div>
        </div>
      </div>
      : <Loading />}
          
  
        </div>
  
        <div className="container my-5">
          <hr className={style.hr} />
          <div className="desc my-5">
            <h2>Description</h2>
            <div className="small my-3">
              <p className="my-1">
                Free size satin blouse and 2 sizes of the skirt.
              </p>
              <p className="my-1">Size 1 : S/M</p>
              <p className="my-1">Skirt waist “stretchy “ from 70:85 CM</p>
            </div>
            <div className="small my-3">
              <p className="my-1">
                Size 2 :L/XL <br /> Skirt waist “stretchy “
              </p>
              <p className="my-1">From 80:95 cm</p>
              <p className="my-1">Skirt length of both sizes is 107 CM</p>
            </div>
            <div className="small my-3">
              <p className="my-1">البلوزة مقاس فري سايز ومتاح مقاسين</p>
              <p className="my-1">
                Size 1 : S/M الطول <br />
                ١٠٧
              </p>
              <p className="my-1">الوسط يلبس من ٧٠ الى ٨٥ س</p>
            </div>
          </div>
          <hr className={`${style.hr} my-4`} />
          <div className="small my-3">
            <h3>Additional information</h3>
            <p className="my-1 ms-5">
              <span className="fw-bolder me-2">Color</span> Black, Brown, nude,
              Olive, purple
            </p>
            <p className="my-1 ms-5">
              <span className="fw-bolder me-2">Size</span>
              S/M, L/XL
            </p>
          </div>
          <hr className={`${style.hr} my-4`} />
          <div className="small my-3">
            <h3>Reviews (3)</h3>
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <div className="rev">
                    <h4 className="mt-4">Based On 7 Reviews</h4>
                    <p className="my-1">
                      <span className="fw-bold fs-3 text-success">4.86</span>{" "}
                      Overall
                    </p>
  
                    <div className="container">
                      <div className="row">
                        <div className="col-sm-3">
                          <div className="stars">
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                          </div>
                        </div>
                        <div className="col-sm-6"></div>
                        <div className="col-sm-3">85.71%</div>
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
                    <p className="my-1">
                      <span className="me-3">Your rating:</span>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>{" "}
                    </p>
                    <label htmlFor="rev">Your Review:</label> *
                    <textarea
                      name="rev"
                      id="rev"
                      className={`${style.area} form-control p-3`}
                      placeholder="add your review here...."
                    ></textarea>
                    <form>
                      <div
                        className={`${style.form} d-flex justify-content-between my-3`}
                      >
                        <div className={`${style.cont}`}>
                          <label htmlFor="name" className="mb-2">
                            Name
                          </label>{" "}
                          *
                          <input
                            id="name"
                            type="text"
                            className={`${style.input} form-control`}
                          />
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
                          />
                        </div>
                      </div>
  
                      <p className="my-1">
                        Pictures (max size: 3000 kB, max files: 1){" "}
                      </p>
                      <label htmlFor="file" className="text-success fw-bold me-2">
                        Upload Image :
                      </label>
                      <input type="file" id="file" />
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
                    <img className={style.userImage} src={image} alt="user" />
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
                    <img className={style.userImage} src={image} alt="user" />
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
  
      </div>
    )}
 
      

      <Delivery />
      <BackToTop />
    </>
  );
}

