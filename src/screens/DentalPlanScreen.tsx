import React, { useEffect, useState } from "react";
import { ScrollView, View, Alert } from "react-native";
import { ActivityIndicator, Button, TextInput, Text } from "react-native-paper";
import { getPlanById, updatePlan } from "../services/userPlanService";

const planId = "planoTeste"; // ajuste para o ID real do plano

export function DentalPlanScreen() {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [planName, setPlanName] = useState("");
  const [validity, setValidity] = useState("");
  const [coverage, setCoverage] = useState("");
  const [contactPhone, setContactPhone] = useState("");

  const loadPlan = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getPlanById(planId);
      setPlanName(data.planName ?? "");
      setValidity(data.validity ?? "");
      setCoverage(data.coverage ?? "");
      setContactPhone(data.contactPhone ?? "");
    } catch (err: any) {
      setError(err.message || "Erro ao carregar plano");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPlan();
  }, []);

  const handleSave = async () => {
    if (!planName.trim() || !validity.trim()) {
      Alert.alert("Erro", "Nome do plano e validade são obrigatórios");
      return;
    }
    setSaving(true);
    try {
      await updatePlan(planId, { planName, validity, coverage, contactPhone });
      Alert.alert("Sucesso", "Plano atualizado");
    } catch (err: any) {
      Alert.alert("Erro", err.message || "Falha ao salvar plano");
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
        <Button mode="contained" onPress={loadPlan}>
          Tentar Novamente
        </Button>
      </View>
    );

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <TextInput label="Nome do Plano" value={planName} onChangeText={setPlanName} mode="outlined" style={{ marginBottom: 12 }} />
      <TextInput
        label="Validade (AAAA-MM-DD)"
        value={validity}
        onChangeText={setValidity}
        mode="outlined"
        style={{ marginBottom: 12 }}
        placeholder="Ex: 2025-12-31"
      />
      <TextInput
        label="Cobertura"
        value={coverage}
        onChangeText={setCoverage}
        mode="outlined"
        multiline
        numberOfLines={3}
        style={{ marginBottom: 12 }}
      />
      <TextInput
        label="Telefone para contato"
        value={contactPhone}
        onChangeText={setContactPhone}
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
