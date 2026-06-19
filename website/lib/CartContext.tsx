"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { Product, CartItem } from "@/lib/data";

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, color: string, material: string) => void;
  removeFromCart: (id: string, color: string, material: string) => void;
  updateQuantity: (id: string, color: string, material: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = useCallback((product: Product, color: string, material: string) => {
    setItems((prev) => {
      const existing = prev.find(
        (i) => i.id === product.id && i.selectedColor === color && i.selectedMaterial === material
      );
      if (existing) {
        return prev.map((i) =>
          i.id === product.id && i.selectedColor === color && i.selectedMaterial === material
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { ...product, quantity: 1, selectedColor: color, selectedMaterial: material }];
    });
  }, []);

  const removeFromCart = useCallback((id: string, color: string, material: string) => {
    setItems((prev) => prev.filter(
      (i) => !(i.id === id && i.selectedColor === color && i.selectedMaterial === material)
    ));
  }, []);

  const updateQuantity = useCallback((id: string, color: string, material: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter(
        (i) => !(i.id === id && i.selectedColor === color && i.selectedMaterial === material)
      ));
    } else {
      setItems((prev) => prev.map(
        (i) => (i.id === id && i.selectedColor === color && i.selectedMaterial === material ? { ...i, quantity } : i)
      ));
    }
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, subtotal }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}