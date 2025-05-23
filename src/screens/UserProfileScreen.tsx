import React, { useEffect, useState } from "react";
import { ScrollView, View, Alert } from "react-native";
import { ActivityIndicator, Button, TextInput, Text } from "react-native-paper";
import { getUserById, updateUser } from "../services/userPlanService";

const userId = "usuarioTeste";

export function UserProfileScreen() {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const loadUser = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getUserById(userId);
      setName(data.name ?? "");
      setEmail(data.email ?? "");
      setPhone(data.phone ?? "");
    } catch (err: any) {
      setError(err.message || "Erro ao carregar perfil");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const handleSave = async () => {
    if (!name.trim() || !email.trim()) {
      Alert.alert("Erro", "Nome e email são obrigatórios");
      return;
    }
    setSaving(true);
    try {
      await updateUser(userId, { name, email, phone });
      Alert.alert("Sucesso", "Perfil atualizado");
    } catch (err: any) {
      Alert.alert("Erro", err.message || "Falha ao salvar perfil");
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return <ActivityIndicator animating size="large" style={{ flex: 1 }} />;

  if (error)
    return (
      <View style={{ padding: 20 }}>
        <Text style={{ color: "red", marginBottom: 12 }}>{error}</Text>
        <Button mode="contained" onPress={loadUser}>
          Tentar Novamente
        </Button>
      </View>
    );

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <TextInput label="Nome" value={name} onChangeText={setName} mode="outlined" style={{ marginBottom: 12 }} />
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        keyboardType="email-address"
        autoCapitalize="none"
        style={{ marginBottom: 12 }}
      />
      <TextInput
        label="Telefone"
        value={phone}
        onChangeText={setPhone}
        mode="outlined"
        keyboardType="phone-pad"
        style={{ marginBottom: 12 }}
      />
      <Button mode="contained" onPress={handleSave} loading={saving} disabled={saving}>
        Salvar
      </Button>
    </ScrollView>
  );
}
