import { Stack } from "expo-router";
import { useCart, CartProvider } from "context/CartContext";
import { PurchaseProvider } from "./context/PurchaseContext";
import { MenuProvider } from "react-native-popup-menu";
import React from "react";

export default function RootLayout() {
  return (
    <CartProvider>
      <PurchaseProvider>
        <MenuProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="welcome" options={{ headerShown: false }} />
            <Stack.Screen name="login" options={{ headerShown: false }} />
            <Stack.Screen name="register" options={{ headerShown: false }} />
            <Stack.Screen name="home" options={{ headerShown: false }} />
            <Stack.Screen name="cart" options={{ headerShown: false }} />
            <Stack.Screen name="purchaseHistory" options={{ headerShown: false }} />
            <Stack.Screen name="chat" options={{ headerShown: false }} />
          </Stack>
        </MenuProvider>
      </PurchaseProvider>
    </CartProvider>
  );
}