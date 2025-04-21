'use client';

import { useCartStore } from '@/store/cart';
import { useState, useEffect } from 'react';

export const useCart = () => {
  const [isMounted, setIsMounted] = useState(false);
  
  // Access all cart state and methods
  const cart = useCartStore();
    // Empty fallback for SSR
  const fallbackCart = {
    items: [],
    isCartOpen: false,
    addItem: () => {},
    removeItem: () => {},
    updateItemQuantity: () => {},
    incrementItemQuantity: () => {},
    decrementItemQuantity: () => {},
    clearCart: () => {},
    setIsCartOpen: () => {},
    openCart: () => {},
    closeCart: () => {},
    totalItems: () => 0,
    totalPrice: () => 0,
    getItem: () => undefined,
  };
  
  // Set mounted state after hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Return fallback during SSR to prevent hydration mismatch
  return isMounted ? cart : fallbackCart;
};
