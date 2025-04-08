import React, { useState } from "react";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

export default function Register() {
  const router = useRouter();

  const [nomeCompleto, setNomeCompleto] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmSenha, setConfirmSenha] = useState("");

  const formatarCPF = (texto: string) => {
    let cpfApenasNumeros = texto.replace(/\D/g, "");
    if (cpfApenasNumeros.length > 3 && cpfApenasNumeros.length <= 6) {
      cpfApenasNumeros = cpfApenasNumeros.replace(/(\d{3})(\d+)/, "$1.$2");
    } else if (cpfApenasNumeros.length > 6 && cpfApenasNumeros.length <= 9) {
      cpfApenasNumeros = cpfApenasNumeros.replace(/(\d{3})(\d{3})(\d+)/, "$1.$2.$3");
    } else if (cpfApenasNumeros.length > 9) {
      cpfApenasNumeros = cpfApenasNumeros.replace(
        /(\d{3})(\d{3})(\d{3})(\d{0,2})/,
        "$1.$2.$3-$4"
      );
    }
    setCpf(cpfApenasNumeros);
  };

  const validarFormulario = () => {
    if (nomeCompleto.trim().length < 2) {
      Alert.alert("Erro", "Nome completo deve ter no mínimo 2 caracteres.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      Alert.alert("Erro", "Email inválido.");
      return;
    }
    if (cpf.length !== 14) {
      Alert.alert("Erro", "CPF inválido. O formato correto é 000.000.000-00.");
      return;
    }
    if (!senha || !confirmSenha || senha !== confirmSenha) {
      Alert.alert("Erro", "Ops! Parece que as senhas não coincidem ou estão vazias.");
      return;
    }

    Alert.alert("Sucesso", "Seu cadastro foi realizado com sucesso!");
    router.replace("/home");
  };

  return (
    <LinearGradient
      style={styles.container}
      colors={["#f4647d", "#f5cac4"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <ScrollView contentContainerStyle={styles.formContainer}>
        <Text style={styles.title}>Registre-se</Text>
        <Text style={styles.subtitle}>Faça seu registro agora!</Text>

        <TextInput
          style={styles.input}
          placeholder="Nome Completo"
          placeholderTextColor="#dd4166"
          value={nomeCompleto}
          onChangeText={setNomeCompleto}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#dd4166"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="CPF"
          placeholderTextColor="#dd4166"
          keyboardType="numeric"
          maxLength={14}
          value={cpf}
          onChangeText={formatarCPF}
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#dd4166"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        <TextInput
          style={styles.input}
          placeholder="Confirmar Senha"
          placeholderTextColor="#dd4166"
          secureTextEntry
          value={confirmSenha}
          onChangeText={setConfirmSenha}
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={validarFormulario} style={styles.registerButton}>
            <Text style={styles.registerText}>Registrar</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.replace("/welcome")} style={styles.backButton}>
            <Text style={styles.backText}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 32,
    color: "#FFF",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#FFF",
    textAlign: "center",
    marginBottom: 30,
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
  registerButton: {
    width: "100%",
    height: 55,
    backgroundColor: "#f4647d",
    borderRadius: 30, 
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  registerText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  backButton: {
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
  },
  backText: {
    color: "#f4647d",
    fontSize: 18,
    fontWeight: "bold",
  },
});
