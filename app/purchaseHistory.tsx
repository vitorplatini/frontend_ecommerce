import React from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { usePurchase } from "./context/PurchaseContext";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function PurchaseHistory() {
  const { purchases } = usePurchase();
  const router = useRouter();

  return (
    <LinearGradient colors={["#f4647d", "#f5cac4"]} style={styles.container}>
      <TouchableOpacity onPress={() => router.navigate("/home")} style={styles.backButton}>
        <Ionicons name="arrow-back" size={28} color="white" />
      </TouchableOpacity>

      <Text style={styles.title}>Histórico de Compras</Text>

      {purchases.length === 0 ? (
        <Text style={styles.empty}>Não há nenhuma compra registrada.</Text>
      ) : (
        <FlatList
          data={purchases}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
            <View style={styles.purchaseItem}>
              <FontAwesome5 name="receipt" size={20} color="#FFF" style={styles.icon} />
              <Text style={styles.date}>📅 Data: {item.date}</Text>
              <Text style={styles.total}>Total: R$ {item.total.toFixed(2)}</Text>
              <Text style={styles.itemTitle}>Itens Comprados:</Text>
              {item.items.map((produto, index) => (
                <Text key={index} style={styles.itemText}>
                  - {produto.name} (x{produto.quantity})
                </Text>
              ))}
            </View>
          )}
        />
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60, // espaço para o botão de voltar e título
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginTop: 40,
    marginBottom: 20,
  },
  empty: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
    marginTop: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  purchaseItem: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  icon: {
    alignSelf: "center",
    marginBottom: 5,
  },
  date: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
    textAlign: "center",
  },
  total: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
    textAlign: "center",
    marginTop: 5,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
    marginTop: 10,
  },
  itemText: {
    fontSize: 14,
    color: "#FFF",
  },
});