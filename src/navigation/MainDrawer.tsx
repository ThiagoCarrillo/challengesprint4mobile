import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { AppointmentsStack } from "../screens//AppointmentsStack";
import { DentalPlanScreen } from "../screens/DentalPlanScreen";
import { UserProfileScreen } from "../screens/UserProfileScreen";

const Drawer = createDrawerNavigator();

export function MainDrawer() {
  return (
    <Drawer.Navigator initialRouteName="Agendamentos">
      <Drawer.Screen name="Agendamentos" component={AppointmentsStack} />
      <Drawer.Screen name="Plano Odontológico" component={DentalPlanScreen} />
      <Drawer.Screen name="Perfil do Usuário" component={UserProfileScreen} />
    </Drawer.Navigator>
  );
}
