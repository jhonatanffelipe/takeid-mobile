import React from "react";
import { View, Text } from "react-native";
import { AppContainer } from "../components/AppContaner";

export function Employees() {
  return (
    <AppContainer topMenu>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Colaboradores</Text>
      </View>
    </AppContainer>
  );
}
