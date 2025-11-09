import React from "react";
import { View, Text } from "react-native";
import { AppContainer } from "../components/ui/AppContaner";

export function Home() {
  return (
    <AppContainer showHeader disableGoBackButton disableMenuButton>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Bem-vindo à Home!</Text>
      </View>
    </AppContainer>
  );
}
