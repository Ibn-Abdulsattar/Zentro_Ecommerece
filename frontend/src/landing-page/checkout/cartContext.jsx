// CartContext.js
import React, { createContext, useContext, useState } from "react";

// 👉 This context manages cart state globally
const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([
    {
      id: 1,
      name: "Laptop",
      price: 999,
      quantity: 1,
      image: "/laptop.webp",
    },
    {
      id: 2,
      name: "Headphones",
      price: 199,
      quantity: 2,
      image: "/headphone.avif",
    },
    {
      id: 3,
      name: "Smartphone",
      price: 799,
      quantity: 1,
      image: "/smartWatch.avif",
    },
  ]);

  // 👉 Update product quantity
  const updateQuantity = (id, quantity) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: quantity } : item
      )
    );
  };

  // 👉 Remove product from cart
  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // 👉 Calculate totals
  const getTotal = () =>
    cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, updateQuantity, removeItem, getTotal }}>
      {children}
    </CartContext.Provider>
  );
};
