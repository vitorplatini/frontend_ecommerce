import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import Svg, { Circle } from "react-native-svg";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = () => {
    if (!email || !password) {
      Alert.alert("Erro", "Atenção! todos os campos são obrigatórios.");
      return;
    }
    if (!emailRegex.test(email)) {
      Alert.alert("Erro", "Por favor insira um email válido.");
      return;
    }

    router.replace("/home");
  };

  return (
    <LinearGradient
      colors={["#f4647d", "#f5cac4"]}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <View style={styles.formContainer}>
        <Text style={styles.title}>Bruno's Cake</Text>

        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#dd4166"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#dd4166"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleSubmit} style={styles.loginButton}>
            <Text style={styles.loginText}>Entrar</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.replace("/welcome")} style={styles.backButton}>
            <Text style={styles.backText}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  formContainer: {
    width: "85%",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    color: "#FFF",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 40,
  },
  input: {
    width: "100%",
    height: 55,
    backgroundColor: "#FFF",
    borderRadius: 30,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "#dd4166",
    marginBottom: 15,
    elevation: 5, 
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonContainer: {
    width: "100%",
    marginTop: 20,
    alignItems: "center",
  },
  loginButton: {
    width: "100%",
    height: 55,
    backgroundColor: "#FFF", 
    borderRadius: 30, 
    justifyContent: "center",
    alignItems: "center",
    elevation: 5, 
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    marginBottom: 15,
  },
  loginText: {
    color: "#f4647d", 
    fontSize: 18,
    fontWeight: "bold",
  },
  backButton: {
    width: "100%",
    height: 55,
    backgroundColor: "#f4647d", 
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5, 
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  backText: {
    color: "#FFF", 
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Login;
