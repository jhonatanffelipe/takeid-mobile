import React from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { AppContainer } from "../../components/ui/AppContaner";
import ButtonTouchableOpacity from "../../components/ButtonTouchableOpacity";

type RootStackParamList = {
  Login: undefined;
  // add other routes here if needed
};

export function Settings() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleLogout = () => {
    navigation.navigate("Login");
  };

  return (
    <AppContainer showHeader disableGoBackButton disableMenuButton>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Configurações</Text>
        <ButtonTouchableOpacity
          title="Sair"
          color="error"
          outline
          onPress={handleLogout}
        />
      </View>
    </AppContainer>
  );
}
