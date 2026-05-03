"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { CartItem, Product } from "@/types";
import { getCart, addToCart as sdkAddToCart, removeFromCart as sdkRemoveFromCart, updateCartItem as sdkUpdateCartItem, clearCart as sdkClearCart } from "@/lib/storentiaClient";
import { useAuth } from "@/contexts/AuthContext";

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, qty: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  updateQty: (productId: string, qty: number) => Promise<void>;
  clearCart: () => Promise<void>;
  cartCount: number;
  loading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { authenticated } = useAuth();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);

  // Load cart when authenticated
  useEffect(() => {
    if (authenticated) {
      loadCart();
    } else {
      const savedCart = localStorage.getItem("velixaco-cart");
      if (savedCart) {
        try {
          setCart(JSON.parse(savedCart));
        } catch (e) {
          console.error("Failed to parse cart from localStorage", e);
        }
      }
    }
  }, [authenticated]);

  const loadCart = async () => {
    try {
      setLoading(true);
      const serverCart = await getCart();
      if (serverCart?.items) {
        const items = serverCart.items.map((item: any) => ({
          id: item.productId || item.id,
          name: item.product?.name || item.name,
          img: item.product?.img || item.img,
          sellingPrice: item.product?.sellingPrice || item.sellingPrice,
          originalPrice: item.product?.originalPrice || item.originalPrice,
          description: item.product?.description || item.description,
          category: item.product?.category || item.category,
          qty: item.quantity || item.qty,
        }));
        setCart(items);
      } else {
        setCart([]);
      }
    } catch (error) {
      console.error("Failed to load cart:", error);
      const savedCart = localStorage.getItem("velixaco-cart");
      if (savedCart) {
        try {
          setCart(JSON.parse(savedCart));
        } catch (e) {
          console.error("Failed to parse cart from localStorage", e);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (product: Product, qty: number) => {
    if (!authenticated) {
      setCart((prevCart) => {
        const existing = prevCart.find((item) => item.id === product.id);
        if (existing) {
          return prevCart.map((item) =>
            item.id === product.id ? { ...item, qty: item.qty + qty } : item
          );
        }
        return [...prevCart, { ...product, qty }];
      });
      localStorage.setItem("velixaco-cart", JSON.stringify(cart));
      return;
    }

    try {
      await sdkAddToCart(product.id, qty);
      await loadCart();
    } catch (error) {
      console.error("Failed to add item:", error);
      throw error;
    }
  };

  const removeFromCart = async (productId: string) => {
    if (!authenticated) {
      setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
      localStorage.setItem("velixaco-cart", JSON.stringify(cart));
      return;
    }

    try {
      await sdkRemoveFromCart(productId);
      await loadCart();
    } catch (error) {
      console.error("Failed to remove item:", error);
      throw error;
    }
  };

  const updateQty = async (productId: string, qty: number) => {
    if (qty <= 0) {
      await removeFromCart(productId);
      return;
    }

    if (!authenticated) {
      setCart((prevCart) =>
        prevCart.map((item) => (item.id === productId ? { ...item, qty } : item))
      );
      localStorage.setItem("velixaco-cart", JSON.stringify(cart));
      return;
    }

    try {
      await sdkUpdateCartItem(productId, qty);
      await loadCart();
    } catch (error) {
      console.error("Failed to update item:", error);
      throw error;
    }
  };

  const clearCart = async () => {
    if (!authenticated) {
      setCart([]);
      localStorage.removeItem("velixaco-cart");
      return;
    }

    try {
      await sdkClearCart();
      setCart([]);
    } catch (error) {
      console.error("Failed to clear cart:", error);
      throw error;
    }
  };

  const cartCount = cart.reduce((acc, item) => acc + (item.qty || 1), 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQty, clearCart, cartCount, loading }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
