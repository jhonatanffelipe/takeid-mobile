import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

import TextInput from "../components/TextInput";
import LogoLogin from "../assets/logo_login.svg";
import ButtonTouchableOpacity from "../components/ButtonTouchableOpacity";
import { AppContainer } from "../components/ui/AppContaner";
import { RootStackParamList } from "../types/RootStackParamList";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

export function Login({ navigation }: Props) {
  return (
    <AppContainer>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <LogoLogin width={240} height={150} />
        </View>
        <View style={styles.titleContainer}>
          <Ionicons name="lock-closed-outline" size={48} color="#00958B" />
          <Text style={styles.title}>Take ID</Text>
        </View>
        <TextInput
          placeholder="E-mail"
          placeholderTextColor="#aaa"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Senha"
          placeholderTextColor="#aaa"
          secureTextEntry
        />
        <ButtonTouchableOpacity
          title="Confirmar"
          onPress={() => {
            navigation.replace("App");
          }}
          style={{ marginTop: 16 }}
        />
      </View>
    </AppContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 24,
    paddingTop: 100,
  },
  logoContainer: {
    alignItems: "center",
  },
  titleContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginBottom: 48,
    marginTop: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    fontFamily: "Roboto_700Bold",
    color: "#00958B",
  },
});

export default Login;
