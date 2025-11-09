import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { Feather, MaterialIcons } from "@expo/vector-icons";

type TabParamList = {
  Dashboard: undefined;
  Colaboradores: undefined;
  Configuracoes: undefined;
};

export function TopMenu() {
  const navigation = useNavigation<BottomTabNavigationProp<TabParamList>>();

  const handleGoBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate("Dashboard");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.sideButton} onPress={handleGoBack}>
        <Feather name="arrow-left" size={24} color="#00958B" />
      </TouchableOpacity>

      <View style={styles.centerContent}>
        <MaterialIcons
          name="lock"
          size={22}
          color="#00958B"
          style={{ marginRight: 6 }}
        />
        <Text style={styles.title}>Take Id</Text>
      </View>

      <TouchableOpacity
        style={styles.sideButton}
        onPress={() => {
          navigation.navigate("Configuracoes");
        }}
      >
        <Feather name="menu" size={26} color="#00958B" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: "space-between",
    width: "100%",
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
    paddingHorizontal: 4,
  },
  sideButton: {
    width: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  centerContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#00958B",
  },
});
