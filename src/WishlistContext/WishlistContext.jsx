import axios from 'axios';
import React, { createContext, useState } from 'react';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    const[addwishlist,setAddWishlist] = useState([])
    const[productId, setproductId ]=useState('')
    const [selectedwishlist, setSelectedwishlist]=useState([])
 
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
  setAddWishlist(data)
console.log(data)
    }

  return (
    <WishlistContext.Provider value={{AddtoWishlist, setproductId, addwishlist, setAddWishlist, selectedwishlist, setSelectedwishlist}}>
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistContext;