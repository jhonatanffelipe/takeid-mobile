import React from "react";
import { Modal, View, Text, StyleSheet, TouchableOpacity } from "react-native";

interface ConfirmationModalProps {
  visible: boolean;
  title?: string;
  message: string;
  onCancel?: () => void;
  confirmText?: string;
  onConfirm?: () => void;
}

export function ConfirmationModal({
  visible,
  title = "Confirmação",
  message,
  onCancel,
  onConfirm,
}: ConfirmationModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          <View style={{ flexDirection: "row", gap: 10 }}>
            {onCancel && (
              <TouchableOpacity
                style={styles.button}
                onPress={onCancel}
                activeOpacity={0.7}
              >
                <Text style={styles.buttonTextCancel}>Cancelar</Text>
              </TouchableOpacity>
            )}

            {onConfirm && (
              <TouchableOpacity
                style={styles.button}
                onPress={onConfirm}
                activeOpacity={0.7}
              >
                <Text style={styles.buttonTextConfirm}>Confirmar</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 24,
    minWidth: 280,
    alignItems: "center",
    elevation: 4,
    maxWidth: "80%",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 24,
  },
  buttonTextCancel: {
    color: "#e53935",
    fontWeight: "bold",
    fontSize: 16,
  },
  buttonTextConfirm: {
    color: "#007bff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
