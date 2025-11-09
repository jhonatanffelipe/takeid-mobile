import { use, useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, View, Alert as RNAlert } from "react-native";
import { RouteProp } from "@react-navigation/native";
import dayjs from "dayjs";
import * as ImagePicker from "expo-image-picker";

import { RootStackParamList } from "../../types/RootStackParamList";
import { ISignature } from "../../interfaces/ISignature";
import { AppContainer } from "../../components/ui/AppContaner";
import { ImagemBase64 } from "../../components/ImagemBase64";
import api from "../../service/api";
import { Alert } from "../../components/Alert";
import { Skeleton } from "../../components/Skeleton";
import { TableNoContent } from "../../components/table/TableNoContent";
import { TableReload } from "../../components/table/TableReload";
import {
  deleteSignature,
  getSignaturesByEmployee,
  saveSignature,
} from "../../database/signatures";
import { MaterialIcons } from "@expo/vector-icons";

type Props = {
  route: RouteProp<RootStackParamList, "Employee">;
};

function SignatureItemSkeleton() {
  return (
    <View style={styles.signatureItem}>
      <View style={styles.signatureItemImage}>
        <Skeleton variant="rectangular" width={100} height={100} radius={4} />
      </View>
      <View style={styles.signatureItemContent}>
        <Skeleton variant="rectangular" width={200} height={20} radius={4} />
        <Skeleton
          variant="rectangular"
          width={150}
          height={15}
          radius={4}
          style={{ marginTop: 16 }}
        />
      </View>
    </View>
  );
}

interface SignatureItemProps {
  signature: ISignature;
  onDelete: (id: number) => Promise<void>;
}

function SignatureItem({ signature, onDelete }: SignatureItemProps) {
  return (
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
          onPress={() => onDelete(signature.id)}
        />
      </View>
    </View>
  );
}

export default function Employee({ route }: Props) {
  const { employeeId, name } = route.params;

  const [signatures, setSignatures] = useState<ISignature[]>([]);
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

  const handleListSignatures = useCallback(async () => {
    setLoading(true);
    setError(null);
    setSignatures([]);

    try {
      const response = await api.get(`/signatures/all/${employeeId}`);
      setSignatures(response.data);
    } catch {
      setError("Erro ao carregar assinaturas.");
    } finally {
      setLoading(false);
    }
  }, [employeeId]);

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

    RNAlert.alert(
      "Escolher Imagem",
      "Selecione a origem da assinatura",
      [
        {
          text: "📸 Tirar Foto",
          onPress: async () => await pickImage(true),
        },
        {
          text: "🖼️ Galeria",
          onPress: async () => await pickImage(false),
        },
        { text: "Cancelar", style: "cancel" },
      ],
      { cancelable: true }
    );
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
      RNAlert.alert("Sucesso", "Assinatura salva localmente!");
    }
  }

  const handleDelete = async (id: number, employeeId: number) => {
    RNAlert.alert(
      "Excluir assinatura",
      "Tem certeza que deseja excluir esta assinatura?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            await deleteSignature(id)
              .then(async () => {
                await handleListLocalSignatures(employeeId);
                RNAlert.alert("Sucesso", "Assinatura excluída com sucesso!");
              })
              .catch(() => {
                RNAlert.alert("Erro", "Não foi possível excluir a assinatura.");
              });
          },
        },
      ]
    );
  };

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
              onDelete={async () =>
                await handleDelete(signature.id, signature.employee_id)
              }
            />
          ))
        ) : (
          <TableNoContent message="Nenhuma assinatura encontrada." />
        )}
      </View>

      <TableReload onReload={() => handleListLocalSignatures(employeeId)} />
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
