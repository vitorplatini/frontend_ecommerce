import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  Alert,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { useCart } from "./context/CartContext";
import {
  FontAwesome5,
  MaterialIcons,
  Entypo,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";

const imagens: { [key: string]: any } = {
  "Banoffee": require("../assets/images/banoffe.jpg"),
  "Bolo de Café": require("../assets/images/bolo_cafe.jpg"),
  "Bolo de Cenoura": require("../assets/images/bolo_cenoura.jpg"),
  "Bolo de Chocolate": require("../assets/images/bolo_chocolate.jpg"),
  "Bolo de Doce de Leite": require("../assets/images/bolo_dleite.jpg"),
  "Floresta Negra": require("../assets/images/bolo_floresta.jpg"),
  "Bolo de Limão": require("../assets/images/bolo_limao.jpg"),
  "Bolo de Maracujá": require("../assets/images/bolo_maracuja.jpg"),
  "Bolo de Morango": require("../assets/images/bolo_morango.jpg"),
  "Bolo de Leite Ninho": require("../assets/images/bolo_ninho.jpg"),
  "Bolo de Oreo": require("../assets/images/bolo_oreo.jpg"),
  "Bolo de Pistache": require("../assets/images/bolo_pistache.jpg"),
  "Red Velvet": require("../assets/images/bolo_red.jpg"),
};

type Produto = {
  id: string;
  nome: string;
  preco: number;
  promocao: number;
  descricao: string;
  validade: string;
};

export default function Home() {
  const { addToCart, cart } = useCart();
  const router = useRouter();
  const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(null);

  const adicionarAoCarrinho = (produto: Produto) => {
    const produtoFormatado = {
      id: produto.id.toString(),
      name: produto.nome,
      price: produto.promocao,
      quantity: 1,
    };

    addToCart(produtoFormatado);
    Alert.alert("Adicionado!", `${produto.nome} foi adicionado ao carrinho.`);
  };

  return (
    <LinearGradient colors={["#f4647d", "#f5cac4"]} style={styles.container}>
      <View style={styles.headerWrapper}>
        <Text style={styles.title}>Produtos Disponíveis</Text>

        <Menu>
          <MenuTrigger>
            <Entypo
              name="dots-three-vertical"
              size={24}
              color="white"
              style={{ padding: 5 }}
            />
          </MenuTrigger>
          <MenuOptions
            customStyles={{
              optionsContainer: {
                backgroundColor: "white",
                borderRadius: 8,
                padding: 10,
              },
            }}
          >
            <MenuOption onSelect={() => router.replace("/welcome")}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <MaterialIcons
                  name="logout"
                  size={20}
                  color="red"
                  style={{ marginRight: 8 }}
                />
                <Text style={{ color: "red", fontWeight: "bold" }}>
                  Logout
                </Text>
              </View>
            </MenuOption>
          </MenuOptions>
        </Menu>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {produtosFake.map((produto) => (
          <TouchableOpacity
            key={produto.id}
            onPress={() => setProdutoSelecionado(produto)}
          >
            <View style={styles.produtoContainer}>
              <Text style={styles.produtoNome}>{produto.nome}</Text>
              {imagens[produto.nome] && (
                <Image
                  source={imagens[produto.nome]}
                  style={styles.produtoImagem}
                />
              )}
              {produto.nome === "Banoffee" && (
                <FontAwesome5
                  name="star"
                  size={20}
                  color="#FFD700"
                  style={styles.estrela}
                />
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {produtoSelecionado && (
        <Modal
          transparent={true}
          animationType="slide"
          visible={!!produtoSelecionado}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitulo}>
                {produtoSelecionado.nome}
              </Text>
              <Image
                source={imagens[produtoSelecionado.nome]}
                style={styles.modalImagem}
              />
              <Text style={styles.produtoDescricao}>
                {produtoSelecionado.descricao}
              </Text>
              <Text style={styles.precoOriginal}>
                De: R$ {produtoSelecionado.preco.toFixed(2)}
              </Text>
              <Text style={styles.precoPromocional}>
                Por: R$ {produtoSelecionado.promocao.toFixed(2)}
              </Text>
              <Text style={styles.produtoDescricao}>
                Validade: {produtoSelecionado.validade}
              </Text>

              <TouchableOpacity
                onPress={() => adicionarAoCarrinho(produtoSelecionado)}
                style={styles.botaoAdicionar}
              >
                <Text style={styles.textoBotao}>Adicionar ao Carrinho</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setProdutoSelecionado(null)}
                style={styles.botaoFechar}
              >
                <Text style={styles.textoBotao}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => router.push("/cart")}
          style={styles.botaoCarrinho}
        >
          <FontAwesome5 name="shopping-cart" size={18} color="white" />
          <Text style={styles.textoBotao}> ({cart.length})</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/purchaseHistory")}
          style={styles.botaoHistorico}
        >
          <FontAwesome5 name="clipboard-list" size={18} color="white" />
          <Text style={styles.textoBotao}> Histórico</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const produtosFake: Produto[] = [
  { id: "1", nome: "Banoffee", preco: 22.99, promocao: 17.50, descricao: "Massa de biscoito, doce de leite, banana e chantilly", validade: "12/04/2025" },
  { id: "2", nome: "Bolo de Cenoura", preco: 17.99, promocao: 13.50, descricao: "Cenoura com cobertura de chocolate", validade: "16/04/2025" },
  { id: "3", nome: "Bolo de Chocolate", preco: 17.99, promocao: 13.50, descricao: "Massa e recheio de chocolate ao leite", validade: "15/04/2025" },
  { id: "4", nome: "Bolo de Doce de Leite", preco: 19.99, promocao: 15.00, descricao: "Recheio cremoso de doce de leite artesanal", validade: "14/04/2025" },
  { id: "5", nome: "Bolo de Café", preco: 18.99, promocao: 14.50, descricao: "Massa sabor café com cobertura de chocolate", validade: "14/04/2025" },
  { id: "6", nome: "Floresta Negra", preco: 23.99, promocao: 18.00, descricao: "Cerejas, chantilly e chocolate meio amargo", validade: "15/04/2025" },
  { id: "7", nome: "Bolo de Limão", preco: 16.99, promocao: 12.90, descricao: "Com cobertura de glacê de limão", validade: "15/04/2025" },
  { id: "8", nome: "Bolo de Maracujá", preco: 16.99, promocao: 13.00, descricao: "Recheio e cobertura de maracujá azedinho", validade: "16/04/2025" },
  { id: "9", nome: "Bolo de Morango", preco: 21.99, promocao: 16.50, descricao: "Com pedaços de morango e chantilly", validade: "13/04/2025" },
  { id: "10", nome: "Bolo de Leite Ninho", preco: 22.99, promocao: 17.50, descricao: "Recheio e cobertura de leite ninho cremoso", validade: "14/04/2025" },
  { id: "11", nome: "Bolo de Oreo", preco: 23.99, promocao: 18.00, descricao: "Camadas com pedaços de biscoito Oreo", validade: "13/04/2025" },
  { id: "12", nome: "Bolo de Pistache", preco: 25.99, promocao: 19.50, descricao: "Cobertura e recheio com creme de pistache", validade: "16/04/2025" },
  { id: "13", nome: "Red Velvet", preco: 24.99, promocao: 18.90, descricao: "Massa vermelha aveludada com cream cheese", validade: "15/04/2025" },
];

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 10,
  },
  title: { fontSize: 24, fontWeight: "bold", color: "#FFF" },
  scrollContainer: { alignItems: "center" },
  produtoContainer: {
    width: 160,
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#FFF",
    borderRadius: 10,
    alignItems: "center",
  },
  produtoImagem: { width: 130, height: 130, resizeMode: "contain" },
  produtoNome: { fontSize: 16, fontWeight: "bold", textAlign: "center" },
  modalImagem: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    marginBottom: 10,
  },
  modalTitulo: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  produtoDescricao: {
    fontSize: 14,
    color: "#333",
    textAlign: "center",
    marginVertical: 10,
  },
  precoOriginal: {
    fontSize: 14,
    color: "#999",
    textDecorationLine: "line-through",
  },
  precoPromocional: { fontSize: 16, color: "#e11d3b", fontWeight: "bold" },
  botaoAdicionar: {
    backgroundColor: "#e11d3b",
    padding: 12,
    borderRadius: 25,
    width: "90%",
    alignItems: "center",
    marginVertical: 5,
  },
  botaoFechar: {
    backgroundColor: "#e11d3b",
    padding: 12,
    borderRadius: 25,
    width: "90%",
    alignItems: "center",
    marginVertical: 5,
  },
  botaoCarrinho: {
    backgroundColor: "#fe4387",
    padding: 12,
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "48%",
  },
  botaoHistorico: {
    backgroundColor: "#b63d8a",
    padding: 12,
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "48%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  textoBotao: { color: "#FFF", fontSize: 16, fontWeight: "bold" },
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
  estrela: { position: "absolute", top: 10, right: 10 },
});
