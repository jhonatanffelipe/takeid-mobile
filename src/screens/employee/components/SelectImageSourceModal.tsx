import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Modal, View, Text, StyleSheet, TouchableOpacity } from "react-native";

interface SelectImageSourceModalProps {
  visible: boolean;
  title?: string;
  onCancel: () => void;
  onPickCamera: () => void;
  onPickGallery: () => void;
}

export function SelectImageSourceModal({
  visible,
  onCancel,
  onPickCamera,
  onPickGallery,
}: SelectImageSourceModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Adicionar assinatura</Text>
          <Text style={styles.message}>
            Selecione a fonte da imagem que deseja usar:
          </Text>
          <View style={{ flexDirection: "row", gap: 4, marginVertical: 16 }}>
            <TouchableOpacity
              style={[styles.actionButton]}
              onPress={onPickCamera}
              activeOpacity={0.8}
              accessibilityRole="button"
              accessibilityLabel="Tirar Foto"
            >
              <MaterialIcons name="photo-camera" size={56} color="#00958B" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton]}
              onPress={onPickGallery}
              activeOpacity={0.8}
              accessibilityRole="button"
              accessibilityLabel="Galeria"
            >
              <MaterialIcons name="photo-library" size={56} color="#00958B" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={[styles.button, { marginTop: 16 }]}
            onPress={onCancel}
          >
            <Text style={styles.buttonTextCancel}>Cancelar</Text>
          </TouchableOpacity>
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
    marginVertical: 10,
    textAlign: "center",
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    color: "#1976d2",
  },
  buttonTextCancel: {
    color: "#e53935",
    fontWeight: "bold",
    fontSize: 16,
  },
  button: {
    paddingHorizontal: 24,
    color: "#e53935",
    marginTop: 18,
    minWidth: 120,
    alignItems: "center",
  },
});
