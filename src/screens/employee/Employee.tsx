import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Alert as RNAlert } from "react-native";
import { RouteProp } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

import { RootStackParamList } from "../../types/RootStackParamList";
import { ISignature } from "../../interfaces/ISignature";
import { AppContainer } from "../../components/ui/AppContaner";
import { Alert } from "../../components/Alert";
import { TableNoContent } from "../../components/table/TableNoContent";
import { TableReload } from "../../components/table/TableReload";
import {
  getSignaturesByEmployee,
  saveSignature,
} from "../../database/signatures";
import { SelectImageSourceModal } from "./components/SelectImageSourceModal";
import { SignatureItemSkeleton } from "./components/SignatureItemSkeleton";
import { SignatureItem } from "./components/SignatureItem";
import { ConfirmationModal } from "../../components/ConfirmationModal";

type Props = {
  route: RouteProp<RootStackParamList, "Employee">;
};

export function Employee({ route }: Props) {
  const { employeeId, name } = route.params;
  const [signatures, setSignatures] = useState<ISignature[]>([]);
  const [selectImageModalVisible, setSelectImageModalVisible] = useState(false);
  const [showSuccessSignatureModal, setShowSuccessSignatureModal] =
    useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleListLocalSignatures = async (employeeId: number) => {
    setLoading(true);
    setError(null);
    setSignatures([]);

    try {
      const data = await getSignaturesByEmployee(employeeId);
      setSignatures(data);
    } catch {
      setError("Erro ao carregar assinaturas locais.");
    } finally {
      setLoading(false);
    }
  };

  async function requestPermissions() {
    const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
    const mediaStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (cameraStatus.status !== "granted" || mediaStatus.status !== "granted") {
      RNAlert.alert(
        "Permissão negada",
        "Você precisa permitir acesso à câmera e galeria."
      );
      return false;
    }
    return true;
  }

  async function handleAddSignature() {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;
    setSelectImageModalVisible(true);
  }

  async function pickImage(fromCamera: boolean) {
    const result = fromCamera
      ? await ImagePicker.launchCameraAsync({ base64: true, quality: 0.5 })
      : await ImagePicker.launchImageLibraryAsync({
          base64: true,
          quality: 0.5,
        });

    if (!result.canceled && result.assets[0].base64) {
      const base64Image = result.assets[0].base64; // salva só o base64 puro

      await saveSignature({
        api_id: 0,
        employee_id: employeeId,
        signed_at: new Date().toISOString(),
        image: base64Image,
        synchronized: false,
      });

      await handleListLocalSignatures(employeeId);
      setShowSuccessSignatureModal(true);
    }
  }

  useEffect(() => {
    handleListLocalSignatures(employeeId);
  }, [employeeId]);

  return (
    <AppContainer
      showHeader
      disableMenuButton
      handleAddItem={handleAddSignature}
    >
      {error && (
        <Alert severity="error" closeAlert={() => setError(null)}>
          {error}
        </Alert>
      )}

      <Text style={styles.title}>
        {employeeId} - {name}
      </Text>

      <View style={styles.content}>
        {loading ? (
          Array(3)
            .fill(0)
            .map((_, index) => <SignatureItemSkeleton key={index} />)
        ) : signatures.length > 0 ? (
          signatures.map((signature) => (
            <SignatureItem
              key={signature.id}
              signature={signature}
              listSignatures={handleListLocalSignatures}
            />
          ))
        ) : (
          <TableNoContent message="Nenhuma assinatura encontrada." />
        )}
      </View>

      <TableReload onReload={() => handleListLocalSignatures(employeeId)} />
      <SelectImageSourceModal
        visible={selectImageModalVisible}
        onCancel={() => setSelectImageModalVisible(false)}
        onPickCamera={async () => {
          setSelectImageModalVisible(false);
          await pickImage(true);
        }}
        onPickGallery={async () => {
          setSelectImageModalVisible(false);
          await pickImage(false);
        }}
      />
      <ConfirmationModal
        visible={showSuccessSignatureModal}
        title="Assinatura Adicionada!"
        message="A assinatura foi adicionada com sucesso."
        onConfirm={() => setShowSuccessSignatureModal(false)}
      />
    </AppContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    width: "100%",
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 16,
    textAlign: "center",
  },
});
