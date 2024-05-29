import React, { createContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [guestToken, setGuestToken] = useState(localStorage.getItem('guestToken') || '');
console.log("cartcontext",cart)

  return (
    <CartContext.Provider value={{ cart, setCart, guestToken, setGuestToken }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;