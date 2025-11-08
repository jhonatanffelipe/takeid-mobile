import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableOpacityProps,
  ViewStyle,
  TextStyle,
} from "react-native";

interface ButtonTouchableOpacityProps extends TouchableOpacityProps {
  title: string;
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
}

const ButtonTouchableOpacity: React.FC<ButtonTouchableOpacityProps> = ({
  title,
  buttonStyle,
  textStyle,
  style,
  ...rest
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, buttonStyle, style]}
      activeOpacity={0.7}
      {...rest}
    >
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    maxWidth: 340,
    height: 58,
    backgroundColor: "#00958B",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  text: {
    color: "#fff",
    fontFamily: "Roboto_700Bold",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ButtonTouchableOpacity;
