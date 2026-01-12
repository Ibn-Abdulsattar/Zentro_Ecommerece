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
      image:
        // "/laptop.webp" ||
        "https://images.unsplash.com/photo-1499914485622-a88fac536970?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bGFwdG9wfGVufDB8fDB8fHww",
    },
    {
      id: 2,
      name: "Headphones",
      price: 199,
      quantity: 2,
      image:
      //  "/headphone.avif" ||
      "https://images.unsplash.com/photo-1577174881658-0f30ed549adc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fEhlYWRwaG9uZXN8ZW58MHx8MHx8fDA%3D",
    },
    {
      id: 3,
      name: "Smartphone",
      price: 799,
      quantity: 1,
      image: 
      // "/smartWatch.avif",
                      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8U21hcnRwaG9uZXxlbnwwfHwwfHx8MA%3D%3D",

    },
  ]);

  const updateQuantity = (id, quantity) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: quantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const getTotal = () =>
    cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cart, updateQuantity, removeItem, getTotal }}
    >
      {children}
    </CartContext.Provider>
  );
};
