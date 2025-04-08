import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
} from "react-native";
import { useCart } from "./context/CartContext";
import { usePurchase } from "./context/PurchaseContext";
import { LinearGradient } from "expo-linear-gradient";
import ConfettiCannon from "react-native-confetti-cannon";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Cart() {
  const { cart, removeFromCart, finalizePurchase } = useCart();
  const { addPurchase } = usePurchase();
  const router = useRouter();
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleConfirmOrder = () => {
    Alert.alert(
      "Confirmar Pedido",
      `O total do seu pedido é R$ ${total.toFixed(2)}. Deseja confirmar?`,
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Confirmar", onPress: () => handleFinishOrder() },
      ]
    );
  };

  const handleFinishOrder = () => {
    if (cart.length === 0) {
      Alert.alert("Carrinho vazio", "Adicione produtos antes de finalizar o pedido!");
      return;
    }

    addPurchase(cart, total);
    finalizePurchase();
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
      setShowSuccessModal(true);
    }, 2000);
  };

  return (
    <LinearGradient colors={["#f4647d", "#f5cac4"]} style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={28} color="white" />
      </TouchableOpacity>

      <Text style={styles.title}>Carrinho de Compras</Text>

      {cart.length === 0 ? (
        <Text style={styles.emptyCart}>Seu carrinho está vazio.</Text>
      ) : (
        <FlatList
          data={cart}
          contentContainerStyle={styles.listContent}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.cartItem}>
              <Text style={styles.itemText}>{item.name} - R$ {item.price.toFixed(2)}</Text>
              <Text style={styles.itemText}>Quantidade: {item.quantity}</Text>
              <Text style={styles.itemText}>Valor: R$ {(item.price * item.quantity).toFixed(2)}</Text>

              <TouchableOpacity onPress={() => removeFromCart(item.id)} style={styles.removeButton}>
                <Text style={styles.textButton}>Remover</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}

      {cart.length > 0 && (
        <TouchableOpacity onPress={handleConfirmOrder} style={styles.finishButton}>
          <Text style={styles.textButton}>Finalizar Pedido</Text>
        </TouchableOpacity>
      )}

      {showConfetti && <ConfettiCannon count={100} origin={{ x: 200, y: 500 }} fadeOut={true} />}

      <Modal visible={showSuccessModal} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Pedido Finalizado! 🎉</Text>
            <Text style={styles.modalText}>Sua compra foi registrada com sucesso!</Text>

            <TouchableOpacity onPress={() => setShowSuccessModal(false)} style={styles.closeButton}>
              <Text style={styles.textButton}>Fechar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setShowSuccessModal(false);
                router.replace("/home");
              }}
              style={styles.homeButton}
            >
              <Text style={styles.textButton}>Voltar para Home</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF",
    textAlign: "center",
    marginBottom: 20,
  },
  emptyCart: {
    fontSize: 18,
    color: "#FFF",
    textAlign: "center",
    marginTop: 100,
  },
  listContent: {
    paddingBottom: 100,
  },
  cartItem: {
    padding: 15,
    backgroundColor: "#EEE",
    marginBottom: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  itemText: {
    fontSize: 16,
    color: "#000",
    marginBottom: 5,
  },
  removeButton: {
    marginTop: 5,
    backgroundColor: "#df3164",
    padding: 10,
    borderRadius: 15,
    alignItems: "center",
    width: "80%",
  },
  finishButton: {
    backgroundColor: "#d30057",
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
    width: "100%",
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  },
  textButton: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "#FFF",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 15,
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: "#d30057",
    padding: 10,
    borderRadius: 15,
    alignItems: "center",
    width: "100%",
  },
  homeButton: {
    marginTop: 10,
    backgroundColor: "#b63d8a",
    padding: 10,
    borderRadius: 15,
    alignItems: "center",
    width: "100%",
  },
});