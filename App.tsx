import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
import { initializeDatabase } from "./src/database";

export default function App() {
  initializeDatabase();

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" translucent />
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
