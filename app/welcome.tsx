import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from "react-native-reanimated";
import Svg, { Circle } from "react-native-svg";

const { width, height } = Dimensions.get("window");

export default function Welcome() {
  const router = useRouter();

  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePressIn = () => {
    scale.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  return (
    <LinearGradient colors={["#f4647d", "#f5cac4"]} style={styles.container}>
      
      {/* 🎈 Bubbles */}
      <Svg height={height} width={width} style={styles.bubblesContainer}>
        <Circle cx={width * 0.2} cy={height * 0.1} r={40} fill="rgba(255,255,255,0.2)" />
        <Circle cx={width * 0.8} cy={height * 0.2} r={30} fill="rgba(255,255,255,0.3)" />
        <Circle cx={width * 0.5} cy={height * 0.4} r={50} fill="rgba(255,255,255,0.2)" />
        <Circle cx={width * 0.3} cy={height * 0.6} r={60} fill="rgba(255,255,255,0.25)" />
        <Circle cx={width * 0.7} cy={height * 0.8} r={45} fill="rgba(255,255,255,0.15)" />
      </Svg>

      <View style={styles.formContainer}>
        <Text style={styles.title}>Bruno's Cake</Text>
        <Text style={styles.subtitle}>Bem-vindo à melhor loja de bolos no pote!</Text>
      </View>

      {/* 📱 Botões animados */}
      <View style={styles.buttonContainer}>
        <Animated.View style={[animatedStyle, styles.buttonWrapper]}>
          <TouchableOpacity
            onPress={() => router.replace("/login")}
            style={styles.loginButton}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
          >
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View style={[animatedStyle, styles.buttonWrapper]}>
          <TouchableOpacity
            onPress={() => router.replace("/register")}
            style={styles.registerButton}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
          >
            <Text style={styles.registerText}>Registrar-se</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  bubblesContainer: {
    position: "absolute",
    top: 0,
    left: 0,
  },
  formContainer: {
    width: "90%",
    alignItems: "center",
    marginBottom: 30,
  },
  title: {
    fontSize: 34,
    color: "#FFF",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#FFF",
    textAlign: "center",
    marginBottom: 25,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
  buttonWrapper: {
    width: "100%",
    alignItems: "center",
    marginBottom: 12,
  },
  loginButton: {
    width: "80%",
    height: 55,
    backgroundColor: "#fff",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  loginText: {
    color: "#f4647d",
    fontSize: 18,
    fontWeight: "bold",
  },
  registerButton: {
    width: "80%",
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
  registerText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

