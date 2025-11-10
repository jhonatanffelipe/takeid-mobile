import { useState } from "react";
import { StyleSheet, Text, View, Alert as RNAlert } from "react-native";
import dayjs from "dayjs";
import { ImagemBase64 } from "../../../components/ImagemBase64";
import { MaterialIcons } from "@expo/vector-icons";
import { ConfirmationModal } from "../../../components/ConfirmationModal";

import { ISignature } from "../../../interfaces/ISignature";
import { deleteSignature } from "../../../database/signatures";

interface SignatureItemProps {
  signature: ISignature;
  listSignatures: (employeeId: number) => Promise<void>;
}

export function SignatureItem({
  signature,
  listSignatures,
}: SignatureItemProps) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = async (id: number, employeeId: number) => {
    await deleteSignature(id)
      .then(async () => {
        setShowDeleteModal(false);
        listSignatures(employeeId);
      })
      .catch(() => {
        RNAlert.alert("Erro", "Não foi possível excluir a assinatura.");
      })
      .finally(() => {
        setShowDeleteModal(false);
      });
  };

  return (
    <>
      <View style={styles.signatureItem}>
        <View style={styles.signatureItemImage}>
          <ImagemBase64 base64={signature.image} />
        </View>
        <View style={styles.signatureItemContent}>
          <Text style={styles.signatureDate}>
            {dayjs(signature.signed_at).format("DD/MM/YYYY HH:mm")}
          </Text>
          <Text>
            {signature.synchronized ? "Sincronizado" : "Não sincronizado"}
          </Text>
        </View>
        <View style={styles.signatureItemDeleteIcon}>
          <MaterialIcons
            name="delete"
            size={24}
            color="red"
            onPress={() => setShowDeleteModal(true)}
          />
        </View>
      </View>

      <ConfirmationModal
        visible={showDeleteModal}
        title="Excluir Assinatura"
        message="Tem certeza que deseja excluir esta assinatura?"
        onConfirm={() => handleDelete(signature.id, signature.employee_id)}
        onCancel={() => setShowDeleteModal(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  signatureItem: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  signatureDate: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 16,
  },
  signatureItemImage: {},
  signatureItemDeleteIcon: {
    height: "100%",
    alignItems: "flex-end",
  },
  signatureItemContent: {
    flex: 1,
  },
});
