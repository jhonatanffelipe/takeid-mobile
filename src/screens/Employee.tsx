import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { RouteProp } from "@react-navigation/native";
import dayjs from "dayjs";

import { RootStackParamList } from "../types/RootStackParamList";
import { ISignature } from "../interfaces/ISignature";
import signaturesData from "../interfaces/data/signatures";
import { AppContainer } from "../components/ui/AppContaner";
import { ImagemBase64 } from "../components/ImagemBase64";

type Props = {
  route: RouteProp<RootStackParamList, "Employee">;
};

export default function Employee({ route }: Props) {
  const { employeeId, name } = route.params;

  const [signatures, setSignatures] = useState<ISignature[]>(signaturesData);

  useEffect(() => {
    setSignatures(signaturesData.filter((s) => s.employee_id === employeeId));
  }, []);

  return (
    <AppContainer showHeader disableMenuButton>
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          Assinaturas de {employeeId}: {name}
        </Text>

        {signatures.map((signature) => (
          <View
            key={`signature-${signature.id}-${employeeId}`}
            style={styles.signatureItem}
          >
            <ImagemBase64 base64={signature.image} />
            <Text>{dayjs(signature.signed_at).format("DD/MM/YYYY HH:mm")}</Text>
          </View>
        ))}
      </View>
    </AppContainer>
  );
}

const styles = StyleSheet.create({
  signatureItem: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
});
