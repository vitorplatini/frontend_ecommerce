import React, { createContext, useContext, useState } from 'react';

// Tipo de uma compra finalizada
type Purchase = {
  id: string;
  items: { name: string; price: number; quantity: number }[];
  total: number;
  date: string;
};

// Tipo do contexto
type PurchaseContextType = {
  purchases: Purchase[];
  addPurchase: (items: { name: string; price: number; quantity: number }[], total: number) => void;
};

// Criando o contexto
const PurchaseContext = createContext<PurchaseContextType | undefined>(undefined);

// Criando o Provider do contexto
export const PurchaseProvider = ({ children }: { children: React.ReactNode }) => {
  const [purchases, setPurchases] = useState<Purchase[]>([]);

  const addPurchase = (items: { name: string; price: number; quantity: number }[], total: number) => {
    const newPurchase: Purchase = {
      id: new Date().getTime().toString(),
      items,
      total,
      date: new Date().toLocaleDateString(),
    };

    setPurchases((prevPurchases) => [...prevPurchases, newPurchase]);
  };

  return (
    <PurchaseContext.Provider value={{ purchases, addPurchase }}>
      {children}
    </PurchaseContext.Provider>
  );
};

// Criando um hook personalizado para usar o contexto
export const usePurchase = () => {
  const context = useContext(PurchaseContext);
  if (!context) {
    throw new Error("usePurchase deve ser usado dentro de um PurchaseProvider");
  }
  return context;
};
