import React from "react";
import { CartProvider } from "./cartContext";
import CartPage from "./cartPage";
import Banner from "./banner";

export default function Checkout() {
  return (
    <>
    <Banner/>
      <CartProvider>
        <CartPage />
      </CartProvider>
    </>
  );
}
