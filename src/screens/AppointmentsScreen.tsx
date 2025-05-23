import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { subscribeAppointments } from "../services/appointmentsService";
import { format } from "date-fns";

export function AppointmentsScreen({ navigation }: any) {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeAppointments(
      (data) => {
        setAppointments(data);
        setLoading(false);
      },
      (error) => {
        setError(error.message || "Erro ao carregar agendamentos");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  if (loading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;

  if (error)
    return (
      <View style={{ padding: 20 }}>
        <Text style={{ color: "red", marginBottom: 12 }}>{error}</Text>
        <Button
          title="Tentar Novamente"
          onPress={() => {
            setLoading(true);
            setError(null);
          }}
        />
      </View>
    );

  return (
    <View style={{ flex: 1, padding: 16 }}>
      {appointments.length === 0 ? (
        <Text>Nenhum agendamento encontrado.</Text>
      ) : (
        <FlatList
          data={appointments}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const dateObj = item.date
              ? new Date(item.date.seconds * 1000)
              : null;
            return (
              <TouchableOpacity
                style={{
                  padding: 12,
                  borderBottomWidth: 1,
                  borderBottomColor: "#ccc",
                }}
                onPress={() =>
                  navigation.navigate("AppointmentDetail", { id: item.id })
                }
              >
                <Text style={{ fontWeight: "bold" }}>{item.service}</Text>
                {dateObj && (
                  <>
                    <Text>Data: {format(dateObj, "dd-MM-yyyy")}</Text>
                    <Text>Hora: {format(dateObj, "HH:mm")}</Text>
                  </>
                )}
              </TouchableOpacity>
            );
          }}
        />
      )}
      <Button
        title="Novo Agendamento"
        onPress={() => navigation.navigate("AppointmentDetail")}
      />
    </View>
  );
}
