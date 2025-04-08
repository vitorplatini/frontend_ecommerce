import { Tabs } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { CartProvider } from "../context/CartContext";
import { PurchaseProvider } from "../context/PurchaseContext";
import { MenuProvider } from "react-native-popup-menu";

export default function TabLayout() {
  return (
    <CartProvider>
      <PurchaseProvider>
        <MenuProvider>
          <Tabs screenOptions={{ headerShown: false }}>
            <Tabs.Screen
              name="home"
              options={{
                tabBarLabel: "Home",
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="home" size={size} color={color} />
                ),
                tabBarStyle: { backgroundColor: "#0EDFBD" },
                tabBarActiveTintColor: "white",
                tabBarInactiveTintColor: "gray",
              }}
            />
            <Tabs.Screen
              name="cart"
              options={{
                tabBarLabel: "Carrinho",
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="cart" size={size} color={color} />
                ),
                tabBarStyle: { backgroundColor: "#0EDFBD" },
                tabBarActiveTintColor: "white",
                tabBarInactiveTintColor: "gray",
              }}
            />
            <Tabs.Screen
              name="purchaseHistory"
              options={{
                tabBarLabel: "Histórico",
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="history" size={size} color={color} />
                ),
                tabBarStyle: { backgroundColor: "#0EDFBD" },
                tabBarActiveTintColor: "white",
                tabBarInactiveTintColor: "gray",
              }}
            />
          </Tabs>
        </MenuProvider>
      </PurchaseProvider>
    </CartProvider>
  );
}