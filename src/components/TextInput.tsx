import React from "react";
import {
  TextInput as RNTextInput,
  TextInputProps,
  StyleSheet,
} from "react-native";

const TextInput = (props: TextInputProps) => {
  return (
    <RNTextInput
      style={[styles.input, props.style]}
      placeholderTextColor="#aaa"
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    width: "100%",
    maxWidth: 340,
    height: 58,
    borderColor: "#00958B",
    borderWidth: 1.5,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    color: "#222",
  },
});

export default TextInput;
