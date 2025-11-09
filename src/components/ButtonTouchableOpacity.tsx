import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableOpacityProps,
  ViewStyle,
  TextStyle,
} from "react-native";

type ButtonColor = "primary" | "error" | "warning" | "alert" | "success";

interface ButtonTouchableOpacityProps extends TouchableOpacityProps {
  title: string;
  color?: ButtonColor;
  outline?: boolean;
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
}

const COLORS: Record<ButtonColor, string> = {
  primary: "#00958B",
  error: "#e53935",
  warning: "#fbc02d",
  alert: "#ff9800",
  success: "#43a047",
};

const ButtonTouchableOpacity: React.FC<ButtonTouchableOpacityProps> = ({
  title,
  color = "primary",
  outline = false,
  buttonStyle,
  textStyle,
  style,
  ...rest
}) => {
  const mainColor = COLORS[color] || COLORS.primary;
  const buttonStyles = [
    styles.button,
    outline
      ? {
          backgroundColor: "transparent",
          borderWidth: 2,
          borderColor: mainColor,
        }
      : { backgroundColor: mainColor },
    buttonStyle,
    style,
  ];
  const textStyles = [
    styles.text,
    outline ? { color: mainColor } : {},
    textStyle,
  ];
  return (
    <TouchableOpacity style={buttonStyles} activeOpacity={0.7} {...rest}>
      <Text style={textStyles}>{title}</Text>
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
