import React, { useContext, useEffect, useRef, useState } from "react";
import style from "./ProductDetails.module.css";
import image from "../../Images/model.jpg";
import Delivery from "./../Delivery/Delivery";
import CallBack from "./../CallBack/CallBack";
import BackToTop from "./../BackToTop/BackToTop";
import PostReview from "./PostReview"
import DeliveryDetails from "../DeliveryDetails/DeliveryDetails";
import AskQuestions from './../AskQuestions/AskQuestions';
import axios from "axios";
import { useParams } from "react-router-dom";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Cart from "../Cart/Cart";
import CartContext, { CartProvider } from "../../CartContext/CartContext";
import Swal from "sweetalert2";
import Loading from "../Loading/Loading";
import WishlistContext from "../../WishlistContext/WishlistContext";
import Rate from "./Rate";
import CommonContext from "../../CommonContext/CommonContext";

export default function ProductDetails() {
  const { cart, setCart } = useContext(CartContext);
  const{guestToken, setGuestToken} =useContext(CommonContext)
  const {AddtoWishlist, setSelectedwishlist , selectedwishlist}=useContext(WishlistContext)
  const [productdetails, setProductDetails] = useState([]);
  const { productId } = useParams();
  const[productid, setproductid]=useState('')
  const[quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const[response, setResponse] = useState(null)
  const [selectedSizeId, setSelectedSizeId] = useState(null);
  const[loading, setloading] = useState(false);
const[error,setError] = useState('')

const settings = {
  dots: true,
    infinite: true,
    autoplay: true, // Disable autoplay to handle manually
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
};

function onSizeClick (sizeId) {
  setSelectedSizeId(sizeId);
    console.log('Selected size ID:', sizeId);
}


const handleAddtoWishlist=(id) =>{
  AddtoWishlist(id);
  setSelectedwishlist((prev) => [...prev, id]);
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
    setproductid(data.product.id)
    }catch (e) {console.error(e)} finally{
      setloading(false)
    }
  }

console.log("productdetails:",productdetails)

useEffect(() => {
  ProductDetails(productId);
}, [productId]);

const handleQuantityChange = (e) => {
  const value = Math.max(1, Math.min(100, parseInt(e.target.value, 10))); // Ensures the value stays between 1 and 100
  setQuantity(isNaN(value) ? 1 : value);
};

const incrementQuantity = () => {
  setQuantity((prev) => Math.min(prev + 1, 100));  // Increment quantity, but not above 100
};

const decrementQuantity = () => {
  setQuantity((prev) => Math.max(prev - 1, 1));  // Decrement quantity, but not below 1
};

async function Addtocart(e) {
  e.preventDefault(); 

  const payload= { 
   items : [{
      product_id: +productid,
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
    if(error.response.data.message === "The items.0.size_id field is required."){
      setError(error)
    }
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
            {error && ( <div className="text-danger fw-bold p-1 w-50">
            Size is Required
          </div>  )}
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
            <div className="buy">
      <div className="d-flex align-items-center">
        <input
          placeholder="number of items"
          className={`${style.input} form-control me-2`}
          min={1}
          max={100}
          value={quantity}
          onChange={handleQuantityChange}
        />
        <div className="d-flex flex-column me-2">
          <button
            type="button"
            className={`${style.quantityBtn} mb-1`}
            onClick={incrementQuantity}
            disabled={quantity >= 100}
          >
            +
          </button>
          <button
            type="button"
            className={`${style.quantityBtn} mb-1`}
            onClick={decrementQuantity}
            disabled={quantity <= 1}
          >
            -
          </button>
        </div>
        <button type="submit" className={`${style.addCart} mx-2 ${productdetails.is_sold_out ? `disabled` : ""}`}>
             Add to cart
          </button>
      </div>
    </div>
            </form>
            {response && <Cart response={response} />}
            <div className="item p-2 mb-2 mt-3 rounded-3 bg-light shadow-lg">
              <h3>{productdetails.material}</h3>
              <div className="rate">
              <Rate productId={productid} />
              
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
              <span onClick={()=> handleAddtoWishlist(productdetails.id)} >
                <i className="fa-solid fa-heart"></i> Add To WishList
              </span>
            </div>
            <div className="item my-2 bg-light rounded-3 shadow-lg pointer">
              <CallBack />
            </div>
            <div className="item my-2 bg-light rounded-3 shadow-lg pointer">
              <AskQuestions  productId={productid} />
            </div>
            <div className="item my-2 p-2 rounded-3 bg-light shadow-sm">
              <span>
                <i className="fa-solid fa-truck-fast"></i> Shipping:
              5 to 7 Working Days
              </span>
            </div>
          </div>
        </div>
      </div>
      : <Loading />}
          
  
        </div>
       {productdetails ?  <div className="container my-5">
          <hr className={style.hr} />
          <div className="desc my-5">
            <h2>Description</h2>
            <div className="small my-3">
              <p className="my-1">
                {productdetails.desc}
              </p>
              </div>
              {/* <p className="my-1">Size 1 : S/M</p>
              <p className="my-1">Skirt waist “stretchy “ from 70:85 CM</p> */}
           
            {/* <div className="small my-3">
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
            </div> */}
          </div>
          <hr className={`${style.hr} my-4`} />
          <div className="small my-3">
            <h3>Additional information</h3>
            <p className="my-1 ms-5">
              <span className="fw-bolder me-2">Color</span>{productdetails.colors?.map((color)=>color).join(' , ')}
            </p>
            <p className="my-1 ms-5">
              <span className="fw-bolder me-2">Size</span>
              {productdetails.sizes?.map((item)=>item.size).join(' , ')}
            </p>
          </div>
          </div>
 : "" }
      

             
        <PostReview productId={productid}  />
  
      </div>
    )}
 
      

      <Delivery />
      <BackToTop />
    </>
  );
}

