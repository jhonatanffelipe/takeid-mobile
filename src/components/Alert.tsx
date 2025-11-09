import React, { useEffect, useRef, useCallback } from "react";
import {
  Animated,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Dimensions,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

type AlertSeverity = "success" | "info" | "warning" | "error";

interface AlertProps {
  severity?: AlertSeverity;
  style?: ViewStyle;
  textStyle?: TextStyle;
  children: React.ReactNode;
  closeAlert?: () => void;
}

const COLORS: Record<
  AlertSeverity,
  { bg: string; icon: string; color: string }
> = {
  success: { bg: "#e6f4ea", icon: "check-circle", color: "#388e3c" },
  info: { bg: "#e3f2fd", icon: "info", color: "#1976d2" },
  warning: { bg: "#fff8e1", icon: "warning", color: "#fbc02d" },
  error: { bg: "#ffebee", icon: "error", color: "#d32f2f" },
};

export const Alert: React.FC<AlertProps> = ({
  severity = "info",
  style,
  textStyle,
  children,
  closeAlert,
}) => {
  const { bg, icon, color } = COLORS[severity];
  const screenWidth = Dimensions.get("window").width;
  const translateX = useRef(new Animated.Value(screenWidth)).current;

  const handleStartAlert = useCallback(() => {
    Animated.timing(translateX, {
      toValue: 0,
      duration: 350,
      useNativeDriver: true,
    }).start();
  }, [translateX]);

  useEffect(() => {
    handleStartAlert();
  }, [handleStartAlert]);

  const handleClose = useCallback(() => {
    Animated.timing(translateX, {
      toValue: screenWidth,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      if (closeAlert) closeAlert();
    });
  }, [closeAlert, screenWidth, translateX]);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: bg,
          borderColor: color,
          transform: [{ translateX }],
        },
        style,
      ]}
    >
      <MaterialIcons
        name={icon as any}
        size={24}
        color={color}
        style={styles.icon}
      />
      <Text style={[styles.text, { color }, textStyle]}>{children}</Text>
      {closeAlert && (
        <MaterialIcons
          name="close"
          size={22}
          color={color}
          style={styles.closeIcon}
          onPress={handleClose}
        />
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 4,
    padding: 12,
    marginVertical: 8,
    marginHorizontal: 8,
  },
  icon: {
    marginRight: 8,
  },
  text: {
    flex: 1,
    fontSize: 16,
  },
  closeIcon: {
    marginLeft: 8,
    padding: 4,
  },
});
