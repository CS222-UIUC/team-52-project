import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const sessionId = 'test-session-id'; // You can improve this later
  const baseURL = 'http://localhost:8000'; // Update if needed

  //  Load cart items on mount
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const res = await axios.get(`${baseURL}/api/cart/?session_id=${sessionId}`);
        setCartItems(res.data);
      } catch (err) {
        console.error("Error loading cart:", err);
      }
    };

    fetchCartItems(); // call it inside useEffect
  }, []);

  //  Add item to cart
  const addToCart = async (productId, quantity = 1) => {
    try {
      const response = await axios.post(`${baseURL}/api/cart/add/`, {
        product_id: productId,
        quantity,
        session_id: sessionId,
      });
      setCartItems(prev => [...prev, response.data]);
      return { success: true };
    } catch (error) {
      console.error('Error adding to cart:', error);
      return { success: false };
    }
  };

  // Remove item from cart
  const removeFromCart = async (cartItemId) => {
    try {
      await axios.delete(`${baseURL}/api/cart/remove/${cartItemId}/`);
      setCartItems(prevItems => prevItems.filter(item => item.id !== cartItemId));
    } catch (error) {
      console.error("Failed to remove item from cart:", error);
    }
  };

  //  Update item quantity
  const updateQuantity = async (cartItemId, newQuantity) => {
    try {
      const response = await axios.patch(`${baseURL}/api/cart/update/${cartItemId}/`, {
        quantity: newQuantity,
      });
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === cartItemId ? { ...item, quantity: response.data.quantity } : item
        )
      );
    } catch (error) {
      console.error("Failed to update cart quantity:", error);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
