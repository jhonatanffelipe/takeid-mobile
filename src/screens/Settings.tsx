import React from "react";
import { View, Text } from "react-native";
import App from "../../App";
import { AppContainer } from "../components/AppContaner";

export function Settings() {
  return (
    <AppContainer topMenu>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Configurações</Text>
      </View>
    </AppContainer>
  );
}
