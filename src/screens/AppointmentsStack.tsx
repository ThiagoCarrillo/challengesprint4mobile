import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AppointmentsScreen } from "../screens/AppointmentsScreen";
import { AppointmentDetailScreen } from "../screens/AppointmentDetailScreen";

export type AppointmentsStackParamList = {
  AppointmentsList: undefined;
  AppointmentDetail: { id?: string };
};

const Stack = createNativeStackNavigator<AppointmentsStackParamList>();

export function AppointmentsStack() {
  return (
    <Stack.Navigator initialRouteName="AppointmentsList">
      <Stack.Screen
        name="AppointmentsList"
        component={AppointmentsScreen}
        options={{ title: "Agendamentos" }}
      />
      <Stack.Screen
        name="AppointmentDetail"
        component={AppointmentDetailScreen}
        options={({ route }) => ({
          title: route.params?.id ? "Editar Agendamento" : "Novo Agendamento",
        })}
      />
    </Stack.Navigator>
  );
}
