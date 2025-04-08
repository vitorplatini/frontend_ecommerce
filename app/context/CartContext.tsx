import React, { createContext, useContext, useState } from 'react';

// Tipo do produto no carrinho
type Product = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

// Tipo de uma compra finalizada
type Purchase = {
  id: number;
  items: Product[];
  total: number;
  date: string;
};

// Tipo do contexto
type CartContextType = {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  purchases: Purchase[];
  finalizePurchase: () => void;
};

// Criando o contexto
const CartContext = createContext<CartContextType | undefined>(undefined);

// Criando o Provider do contexto
export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<Product[]>([]);
  const [purchases, setPurchases] = useState<Purchase[]>([]);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const finalizePurchase = () => {
    if (cart.length === 0) return;

    const newPurchase: Purchase = {
      id: purchases.length + 1,
      items: cart,
      total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
      date: new Date().toLocaleDateString(),
    };

    setPurchases((prevPurchases) => [...prevPurchases, newPurchase]);
    clearCart();
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, purchases, finalizePurchase }}>
      {children}
    </CartContext.Provider>
  );
};

// Criando um hook personalizado para usar o contexto
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart deve ser usado dentro de um CartProvider");
  }
  return context;
};
