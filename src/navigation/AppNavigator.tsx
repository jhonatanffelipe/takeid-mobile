import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login } from "../screens/login/Login";
import { TabNavigator } from "./TabNavigator";
import { RootStackParamList } from "../types/RootStackParamList";
import { Employee } from "../screens/employee/Employee";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="App"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Employee"
        component={Employee}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
