import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

import { Home } from "../screens/home/Home";
import { Employees } from "../screens/employees/Employees";
import { Settings } from "../screens/settings/Settings";
const Tab = createBottomTabNavigator();

type TabParamList = {
  Dashboard: undefined;
  Colaboradores: undefined;
  Configuracoes: undefined;
};

export function TabNavigator() {
  const navigation = useNavigation<BottomTabNavigationProp<TabParamList>>();

  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: React.ComponentProps<typeof Ionicons>["name"];

          if (route.name === "Dashboard") {
            iconName = "home";
          } else if (route.name === "Colaboradores") {
            iconName = "people";
          } else {
            iconName = "settings";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#00958B",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Dashboard"
        component={Home}
        options={{
          title: "Dashboard",
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Configuracoes")}
            >
              <Ionicons
                name="settings"
                size={24}
                color="black"
                style={{ marginRight: 15 }}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen name="Colaboradores" component={Employees} />
      <Tab.Screen name="Configuracoes" component={Settings} />
    </Tab.Navigator>
  );
}
