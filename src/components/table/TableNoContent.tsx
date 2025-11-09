import React from "react";
import { View, Text, StyleSheet, TextStyle, ViewStyle } from "react-native";

interface TableNoContentProps {
  message?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const TableNoContent: React.FC<TableNoContentProps> = ({
  message = "Nenhum dado encontrado.",
  style,
  textStyle,
}) => (
  <View style={[styles.container, style]}>
    <Text style={[styles.text, textStyle]}>{message}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  text: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
  },
});
