import React, { useState } from "react";
import { View, Alert, StyleSheet } from "react-native";
import { TextInput, Button, Title } from "react-native-paper";

interface LoginScreenProps {
  onLoginSuccess: () => void;
}

export function LoginScreen({ onLoginSuccess }: LoginScreenProps) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (user.trim() === "teste" && pass === "1234") {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        onLoginSuccess();
      }, 1000);
    } else {
      Alert.alert("Erro", "Usuário ou senha inválidos");
    }
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>CENTRO DE CONTROLE{"\n"}PLANOS ODONTOPREV</Title>

      <TextInput
        label="Usuário"
        value={user}
        onChangeText={setUser}
        mode="outlined"
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.input}
      />

      <TextInput
        label="Senha"
        value={pass}
        onChangeText={setPass}
        secureTextEntry
        mode="outlined"
        style={styles.input}
      />

      <Button
        mode="contained"
        onPress={handleLogin}
        loading={loading}
        disabled={loading}
        style={styles.button}
      >
        Entrar
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    justifyContent: "center",
    backgroundColor: "#f2f2f2",
  },
  title: {
    textAlign: "center",
    marginBottom: 32,
    fontWeight: "bold",
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
  },
});
