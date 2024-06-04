import axios from 'axios';
import React, { createContext, useContext, useState } from 'react';
import CartContext from '../CartContext/CartContext';
import CommonContext from '../CommonContext/CommonContext';
const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    const[addwishlist,setAddWishlist] = useState([])
    const[productId, setproductId ]=useState('')
    const [selectedwishlist, setSelectedwishlist]=useState([])
    const[Wtoken, setWToken]=useState('')

async function AddtoWishlist(productId){  

    const products= [
        {
          "product_id": productId,
        }
      ]
  const {data} = await axios.post(`https://zahaback.com/api/wishlist/create`, {products} ,
  {  
    headers: {
      Authorization: `Bearer G7h22L1YUtE9wexBIepKfZ6dac1yIcgMNFLAsC9d73580a97`,
    },
  }
  )
  setAddWishlist(data.wishlist_items)
  if (!Wtoken) {
    const newToken = data.wishlist_items.guest_token;
    setWToken(newToken);
    localStorage.setItem('wtoken', newToken);
  }
console.log("wishlistData",data.wishlist_items)  
console.log(Wtoken)
}

  return (
    <WishlistContext.Provider value={{AddtoWishlist, setproductId, addwishlist, setAddWishlist, selectedwishlist, setSelectedwishlist}}>
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistContext;