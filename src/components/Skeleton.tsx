import React, { useEffect, useRef } from "react";
import { Animated, View, StyleSheet, ViewStyle } from "react-native";

type SkeletonProps = {
  variant?: "rectangular" | "circular";
  width?: number | `${number}%` | "auto";
  height?: number | `${number}%` | "auto";
  radius?: number;
  style?: ViewStyle;
};

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = "rectangular",
  width = 100,
  height = 20,
  radius = 8,
  style,
}) => {
  const opacity = useRef(new Animated.Value(0.6)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.6,
          duration: 700,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [opacity]);

  const borderRadius =
    variant === "circular"
      ? typeof width === "number" && typeof height === "number"
        ? Math.min(width, height) / 2
        : 9999
      : radius;

  return (
    <Animated.View
      style={[
        styles.skeleton,
        {
          width,
          height,
          borderRadius,
          opacity,
        },
        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: "#e0e0e0",
    overflow: "hidden",
  },
});
