import { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { RouteProp } from "@react-navigation/native";
import dayjs from "dayjs";

import { RootStackParamList } from "../types/RootStackParamList";
import { ISignature } from "../interfaces/ISignature";
import { AppContainer } from "../components/ui/AppContaner";
import { ImagemBase64 } from "../components/ImagemBase64";
import api from "../service/api";
import { Alert } from "../components/Alert";
import { Skeleton } from "../components/Skeleton";
import { TableNoContent } from "../components/table/TableNoContent";
import { TableReload } from "../components/table/TableReload";
import { getSignaturesByEmployee } from "../database/signatures";

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
      </View>
    </View>
  );
}

function SignatureItem({ signature }: { signature: ISignature }) {
  return (
    <View style={styles.signatureItem}>
      <View style={styles.signatureItemImage}>
        <ImagemBase64 base64={signature.image} />
      </View>
      <View style={styles.signatureItemContent}>
        <Text>{dayjs(signature.signed_at).format("DD/MM/YYYY HH:mm")}</Text>
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
    await getSignaturesByEmployee(employeeId)
      .then((data) => {
        setSignatures(data);
      })
      .catch(() => {
        setError("Erro ao carregar assinaturas locais.");
      });
  };

  const handleListSignatures = useCallback(async () => {
    setLoading(true);
    setError(null);
    setSignatures([]);

    await api
      .get(`/signatures/all/${employeeId}`)
      .then((response) => {
        setSignatures(response.data);
      })
      .catch(() => {
        setError("Erro ao carregar assinaturas.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [employeeId]);

  useEffect(() => {
    handleListLocalSignatures(employeeId);
  }, [employeeId]);

  return (
    <AppContainer showHeader disableMenuButton handleAddItem={() => {}}>
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
            <SignatureItem key={signature.id} signature={signature} />
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
  skeleton: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  signatureItem: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  signatureItemImage: {},
  signatureItemContent: {
    flex: 1,
  },
});
