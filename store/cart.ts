'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface CartItem {
  sku: string;
  productId: string;
  variantId: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartState {
  items: CartItem[];
  isCartOpen: boolean;

  // Actions
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeItem: (id: number) => void;
  updateItemQuantity: (id: number, quantity: number) => void;
  incrementItemQuantity: (id: number) => void;
  decrementItemQuantity: (id: number) => void;
  clearCart: () => void;
  setIsCartOpen: (open: boolean) => void;
  openCart: () => void;
  closeCart: () => void;

  // Derived data
  totalItems: () => number;
  totalPrice: () => number;
  getItem: (id: number) => CartItem | undefined;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isCartOpen: false,

      addItem: (item) => set((state) => {
        const existingItemIndex = state.items.findIndex((i) =>
          i.variantId === item.variantId 
        );

        if (existingItemIndex > -1) {
          const updatedItems = [...state.items];
          updatedItems[existingItemIndex] = {
            ...updatedItems[existingItemIndex],
            quantity: updatedItems[existingItemIndex].quantity + (item.quantity || 1)
          };
          return { items: updatedItems };
        }

        return {
          items: [...state.items, { ...item, quantity: item.quantity || 1 }],
        };
      }),

      removeItem: (id) => set((state) => ({
        items: state.items.filter((item) => item.variantId !== id),
      })),

      updateItemQuantity: (id, quantity) => set((state) => ({
        items: state.items.map((item) =>
          item.variantId === id
            ? { ...item, quantity: Math.max(1, quantity) }
            : item
        ),
      })),

      incrementItemQuantity: (id) => set((state) => {
        const existingItem = state.items.find((item) => item.variantId === id);
        if (!existingItem) return state;
        
        return {
          items: state.items.map((item) =>
            item.variantId === id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }),

      decrementItemQuantity: (id) => set((state) => {
        const existingItem = state.items.find((item) => item.variantId === id);
        if (!existingItem) return state;
        
        // If quantity would become less than 1, maintain at least 1
        if (existingItem.quantity <= 1) return state;
        
        return {
          items: state.items.map((item) =>
            item.variantId === id
              ? { ...item, quantity: item.quantity - 1 }
              : item
          ),
        };
      }),

      clearCart: () => set({ items: [] }),

      setIsCartOpen: (open) => set({ isCartOpen: open }),

      openCart: () => set({ isCartOpen: true }),

      closeCart: () => set({ isCartOpen: false }),

      totalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      totalPrice: () => {
        return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
      },

      getItem: (id) => {
        return get().items.find((item) => item.variantId === id);
      },
    }),
    {
      name: 'farm-track-cart',
      storage: createJSONStorage(() => localStorage),
      // Only persist these fields to localStorage, not the methods
      partialize: (state) => ({ items: state.items }),
    }
  )
);
