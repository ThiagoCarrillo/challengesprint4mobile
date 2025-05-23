import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ActivityIndicator,
  Alert,
  ScrollView,
} from "react-native";
import {
  createAppointment,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
} from "../services/appointmentsService";
import { Timestamp } from "firebase/firestore";

export function AppointmentDetailScreen({ route, navigation }: any) {
  const id: string | undefined = route.params?.id;
  const isEditing = !!id;

  const [service, setService] = useState("");
  const [date, setDate] = useState(""); // ex: "2025-05-23"
  const [time, setTime] = useState(""); // ex: "14:30"
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadAppointment = async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const data = await getAppointmentById(id);
      setService(data.service ?? "");
      setNotes(data.notes ?? "");
      if (data.date) {
        const d = new Date(data.date.seconds * 1000);
        setDate(d.toISOString().substring(0, 10)); // "YYYY-MM-DD"
        setTime(d.toISOString().substring(11, 16)); // "HH:mm"
      }
    } catch (err: any) {
      setError(err.message || "Erro ao carregar agendamento");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAppointment();
  }, [id]);

  const handleSave = async () => {
    if (!service.trim() || !date.trim() || !time.trim()) {
      Alert.alert("Erro", "Preencha todos os campos obrigatórios");
      return;
    }

    const combinedDateTime = new Date(`${date}T${time}:00`);

    setLoading(true);
    setError(null);
    try {
      const appointmentData = {
        service,
        notes,
        date: Timestamp.fromDate(combinedDateTime),
        status: "agendado",
      };
      if (isEditing && id) {
        await updateAppointment(id, appointmentData);
      } else {
        await createAppointment(appointmentData);
      }
      navigation.goBack();
    } catch (err: any) {
      setError(err.message || "Erro ao salvar agendamento");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = () => {
    Alert.alert("Confirmar", "Deseja realmente excluir este agendamento?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          setLoading(true);
          try {
            if (id) await deleteAppointment(id);
            navigation.goBack();
          } catch (err: any) {
            setError(err.message || "Erro ao excluir agendamento");
          } finally {
            setLoading(false);
          }
        },
      },
    ]);
  };

  if (loading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;

  if (error)
    return (
      <View style={{ padding: 20 }}>
        <Text style={{ color: "red", marginBottom: 12 }}>{error}</Text>
        <Button title="Tentar Novamente" onPress={loadAppointment} />
      </View>
    );

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Text style={{ marginBottom: 8 }}>Serviço*</Text>
      <TextInput
        value={service}
        onChangeText={setService}
        placeholder="Ex: Limpeza dental"
        style={{
          borderBottomWidth: 1,
          borderColor: "#ccc",
          marginBottom: 16,
          padding: 8,
        }}
      />

      <Text style={{ marginBottom: 8 }}>Data (AAAA-MM-DD)*</Text>
      <TextInput
        value={date}
        onChangeText={setDate}
        placeholder="Ex: 2025-05-23"
        style={{
          borderBottomWidth: 1,
          borderColor: "#ccc",
          marginBottom: 16,
          padding: 8,
        }}
      />

      <Text style={{ marginBottom: 8 }}>Hora (HH:mm)*</Text>
      <TextInput
        value={time}
        onChangeText={setTime}
        placeholder="Ex: 14:30"
        style={{
          borderBottomWidth: 1,
          borderColor: "#ccc",
          marginBottom: 16,
          padding: 8,
        }}
      />

      <Text style={{ marginBottom: 8 }}>Notas</Text>
      <TextInput
        value={notes}
        onChangeText={setNotes}
        multiline
        numberOfLines={4}
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          marginBottom: 16,
          padding: 8,
          textAlignVertical: "top",
        }}
      />

      <Button title={isEditing ? "Salvar" : "Criar"} onPress={handleSave} />
      {isEditing && (
        <View style={{ marginTop: 16 }}>
          <Button title="Excluir" color="red" onPress={handleDelete} />
        </View>
      )}
    </ScrollView>
  );
}
