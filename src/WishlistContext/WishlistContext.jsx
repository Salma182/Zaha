import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
import CartContext from '../CartContext/CartContext';
import CommonContext from '../CommonContext/CommonContext';
const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    const[addwishlist,setAddWishlist] = useState([])
    const[productId, setproductId ]=useState('')
    const [selectedwishlist, setSelectedwishlist]=useState([])
    const [Wtoken, setWToken] = useState(localStorage.getItem('wtoken') || '');

async function AddtoWishlist(productId) {
  // Always get the latest token from localStorage
  let currentWToken = localStorage.getItem('wtoken');

  const products = [
    {
      "product_id": productId,
    }
  ];

  try {
    const { data } = await axios.post(
      `https://zahaback.com/api/wishlist/create`,
      { products }
    );

    // If data.wishlist_items exists and has guest_token, update it
    if (data.wishlist_items && data.wishlist_items.guest_token) {
      const newToken = data.wishlist_items.guest_token;
      setWToken(newToken);
      localStorage.setItem('wtoken', newToken);
    } else if (!currentWToken) {
      // If there's no token in localStorage, set the new token from data
      const newToken = data.guest_token;
      setWToken(newToken);
      localStorage.setItem('wtoken', newToken);
    } else {
      // Ensure the token state is set to the current token
      setWToken(currentWToken);
    }

    setAddWishlist(data.wishlist_items);
    console.log("wishlistData", data.wishlist_items);
    console.log("Wtoken:", Wtoken);

  } catch (error) {
    console.error("Error adding to wishlist:", error);
  }
}

useEffect(() => {
  console.log('Current Wtoken:', Wtoken);
}, [Wtoken]);

  return (
    <WishlistContext.Provider value={{AddtoWishlist, setproductId, addwishlist, setAddWishlist, selectedwishlist, setSelectedwishlist}}>
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistContext;