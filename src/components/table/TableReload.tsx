import React from "react";
import { TouchableOpacity, StyleSheet, ViewStyle } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface TableReloadProps {
  onReload: () => void;
  style?: ViewStyle;
}

export const TableReload: React.FC<TableReloadProps> = ({
  onReload,
  style,
}) => (
  <TouchableOpacity
    style={[styles.button, style]}
    onPress={onReload}
    activeOpacity={0.7}
  >
    <MaterialIcons name="refresh" size={28} color="#00958B" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 24,
    backgroundColor: "#e0f7f4",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
});
