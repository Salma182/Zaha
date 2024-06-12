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
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.min.css";
import "owl.carousel/dist/assets/owl.theme.default.min.css";
import Cart from "../Cart/Cart";
import CartContext, { CartProvider } from "../../CartContext/CartContext";
import Swal from "sweetalert2";
import Loading from "../Loading/Loading";
import WishlistContext from "../../WishlistContext/WishlistContext";
import Rate from "./Rate";
import CommonContext from "../../CommonContext/CommonContext";
import NotifyMeModal from "./Notifyme";

export default function ProductDetails() {
  const { cart, setCart } = useContext(CartContext);
  const{guestToken, setGuestToken} =useContext(CommonContext)
  const {AddtoWishlist, setSelectedwishlist , selectedwishlist}=useContext(WishlistContext)
  const [productdetails, setProductDetails] = useState([]);
  const { productId } = useParams();
  const[productid, setproductid]=useState('')
  const[quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedColorId, setSelectedColorId] = useState('');
  const[response, setResponse] = useState(null)
  const [selectedSizeId, setSelectedSizeId] = useState(null);
  const[loading, setloading] = useState(false);
const[error,setError] = useState('')
const token = localStorage.getItem('token');
const userId= localStorage.getItem('userid')
  
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

function onSizeClick (sizeId) {
  setSelectedSizeId(sizeId);
    console.log('Selected size ID:', sizeId);
}

function handleColorChange(colorid){
setSelectedColorId(colorid);
console.log('Selected color ID:', colorid);

}

const handleAddtoWishlist=(id) =>{
  AddtoWishlist(id);
  setSelectedwishlist((prev) => [...prev, id]);
}  

async function ProductDetails(productId)  {
  setloading(true)
  try{
    const {data} =await axios.get(`https://zahaback.com/api/userproduct/getProduct/${productId}`
    // {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // }
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
      size_id:selectedSizeId,
      color_id:selectedColorId,
     user_id:userId
    }],
  guest_token: guestToken
}
 console.log("userId",userId)

  try{
    const {data} = await axios.post(`https://zahaback.com/api/cart/add`, payload 
  //   {  
  //    headers: {
  //      Authorization: `Bearer ${token}`,
  //    },
  //  }
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

// const handleColorChange = (color, image) => {
//   setSelectedColor(color);
//   setSelectedImage(image);
// };

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
  
       
          <OwlCarousel {...settings}>    
            {productdetails.images?.map((image, index) => (
            <div key={index}>
              <img src={image} alt="" className={style.imgDefault} />
            </div>
          ))}
      </OwlCarousel>
  
        </div>
        <div className="col-lg-8">
          <div className="item">
            <h2>{productdetails.name}</h2>
            {/* <h3>{productdetails.price} EGP</h3> */}
            
            <div className="product-price">
              {productdetails?.original_price !== productdetails.price ? (
                <span style={{ textDecoration: 'line-through', color: 'red' }}>
                  {productdetails?.original_price} 
                </span>
              ) : null}
              <span style={{ marginLeft: productdetails.original_price !== productdetails.price ? '10px' : '0' }}>
                {productdetails.price} Egp
              </span>
            </div>

            {productdetails?.sizes?.length >0 &&
              <div>
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
         </div>
          }
          
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
        <button type="submit" className={`${style.addCart} mx-2 ${productdetails.is_sold_out === true ? `${style.disabled}` : ""}`}  
         disabled={productdetails.is_sold_out}>
             Add to cart
          </button>

          {productdetails.is_sold_out && <NotifyMeModal productId={productdetails.id} />}
      </div>
    </div>
            </form>
            {response && <Cart response={response} />}
            <div className="item p-2 mb-2 mt-3 rounded-3 bg-light shadow-lg">
              <h3>{productdetails.material}</h3>
              <div className="rate">
              <Rate productId={productid} />
              
                {/* <span className="ms-2">(7 customer reviews)</span> */}
                
              </div>
            </div>
              {productdetails?.colors?.length > 0 && 
            <div className="item my-2 p-2 rounded-3 bg-light shadow-lg ">

               <h4>Colors</h4>
               <div className="color my-2 d-flex align-items-center">
             <ul className="list-unstyled d-flex flex-row gap-3">
               {productdetails?.colors?.map((product)=>
                <li
                key={product.id} 
                className={`${style.ball} mx-2 ${selectedColorId === product.id ? 'selected' : ''}`}
                
                onClick={() => handleColorChange(product.id)} 
                style={{ cursor: 'pointer',backgroundColor: product.name }} 
              >
                {/* {product.name} */}
              </li>
                 )}
                 </ul>
               </div>
                </div>
              }
             
        
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
          </div>
          {productdetails?.colors?.length || productdetails?.sizes?.length > 0 && 
          <div>          
             <hr className={`${style.hr} my-4`} />
              <div className="small my-3">
              <h3>Additional information</h3>
              {productdetails?.colors?.length >0 && 
              <p className="my-1 ms-5">
              <span className="fw-bolder me-2">Color</span>{productdetails.colors?.map((color)=>color.name).join(' , ')}
            </p>
            }
              {productdetails?.sizes?.length > 0 &&   <p className="my-1 ms-5">
                <span className="fw-bolder me-2">Size</span>
                {productdetails.sizes?.map((item)=>item.size).join(' , ')}
              </p>}
            
            </div>
             </div>
            
          }
        
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

