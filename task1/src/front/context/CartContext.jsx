import React, { createContext, useContext, useEffect, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  function addToCart(product, qty = 1) {
    setCartItems(prev => {
      // Utilisez product._id au lieu de product.id
      const exist = prev.find(i => i._id === product._id);
      if (exist) {
        return prev.map(i => 
          i._id === product._id 
            ? { ...i, qty: i.qty + qty } 
            : i
        );
      } else {
        return [...prev, { ...product, qty }];
      }
    });
  }

  function removeFromCart(productId) {
    setCartItems(prev => prev.filter(i => i._id !== productId));
  }

  function updateQuantity(productId, newQty) {
    setCartItems(prev => 
      prev.map(item => 
        item._id === productId 
          ? { ...item, qty: newQty } 
          : item
      )
    );
  }

  function clearCart() {
    setCartItems([]);
  }

  return (
    <CartContext.Provider 
      value={{ 
        cartItems, 
        addToCart, 
        removeFromCart, 
        updateQuantity,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);