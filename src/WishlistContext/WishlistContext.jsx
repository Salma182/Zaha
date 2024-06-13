import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
import CartContext from '../CartContext/CartContext';
import CommonContext from '../CommonContext/CommonContext';
import Swal from 'sweetalert2';
const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    const[addwishlist,setAddWishlist] = useState([])
    const[productId, setproductId ]=useState('')
    const [selectedwishlist, setSelectedwishlist]=useState([])
    const [Wtoken, setWToken] = useState(() => {
      const token = localStorage.getItem('wtoken');
      //console.log("Initial token from localStorage:", token);
      return token || '';
    });

    useEffect(() => {
      //console.log("Wtoken updated:", Wtoken);
    }, [Wtoken]);
  
    async function AddtoWishlist(productId) {
      // Always get the latest token from localStorage
      const currentWToken = localStorage.getItem('wtoken');
      //console.log("Current Wtoken from localStorage:", currentWToken);
  
      const products = [
        {
          "product_id": productId,
        }
      ];
  
      const payload = { products };
  
      // Add guest_token to the payload if it exists
      if (currentWToken) {
        payload.guest_token = currentWToken;
      }
  
      try {
        const { data } = await axios.post(
          `https://zahaback.com/api/wishlist/create`,
          payload
        );
        //console.log("API Response:", data.wishlist_items[0].guest_token);
  
        // If data.wishlist_items exists and has guest_token, update it
        if (data.wishlist_items && data.wishlist_items[0].guest_token) {
          const newToken = data.wishlist_items[0].guest_token;
          //console.log("New Token from wishlist_items:", newToken);
          setWToken(newToken);
          localStorage.setItem('wtoken', newToken);
        } else if (!currentWToken && data.wishlist_items[0].guest_token) {
          // If there's no token in localStorage, set the new token from data
          const newToken = data.wishlist_items[0].guest_token;
          //console.log("New Token from data.guest_token:", newToken);
          setWToken(newToken);
          localStorage.setItem('wtoken', newToken);
        } else {
          // Ensure the token state is set to the current token
          //console.log("Using existing token:", currentWToken);
          setWToken(currentWToken);
        }

        setAddWishlist(data.wishlist_items || []);
        //console.log("Wishlist Data:", data.wishlist_items);
      } catch (error) {
        console.error("Error adding to wishlist:", error);
      }
    }

    async function DeleteWishlist(productid) {
try{
  const{data}= await axios.post(`https://zahaback.com/api/wishlist/deleteWishlist/${Wtoken}/item/${productid}`
  )
  if (data.message === "Product deleted from the Whishlist successfully") {
    Swal.fire({
      position: "center",
      icon: "success",
      title: data.message,
      showConfirmButton: false,
      timer: 2000,
    });
  }
  //console.log("wishlistProducts",data)
}catch(e){console.error(e)}
    }

useEffect(() => {
  //console.log('Current Wtoken:', Wtoken);
}, [Wtoken]);

  return (
    <WishlistContext.Provider value={{AddtoWishlist, setproductId, addwishlist, setAddWishlist, selectedwishlist, setSelectedwishlist, DeleteWishlist}}>
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistContext;