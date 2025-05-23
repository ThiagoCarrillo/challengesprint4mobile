import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";
import { LoginScreen } from "./src/screens/LoginScreen";
import { MainDrawer } from "./src/navigation/MainDrawer";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const onLoginSuccess = () => setLoggedIn(true);

  return (
    <PaperProvider theme={DefaultTheme}>
      <NavigationContainer>
        {loggedIn ? <MainDrawer /> : <LoginScreen onLoginSuccess={onLoginSuccess} />}
      </NavigationContainer>
    </PaperProvider>
  );
}
