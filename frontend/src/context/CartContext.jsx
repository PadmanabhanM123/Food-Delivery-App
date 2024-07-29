// src/contexts/CartContext.js
import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart((prevItems) => [...prevItems, item]);
    alert(`${item.name} has been added to your cart!`)
  };
  const removeFromCart = (item) => {
    setCart(cart.filter(cartItem => cartItem.id !== item.id));
  };
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart,removeFromCart,getTotalPrice,clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
