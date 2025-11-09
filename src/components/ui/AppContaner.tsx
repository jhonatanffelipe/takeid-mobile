import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  ViewProps,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "./Header";

type AppContainerProps = ViewProps & {
  children: React.ReactNode;
  showHeader?: boolean;
  disableMenuButton?: boolean;
  disableGoBackButton?: boolean;
};

export function AppContainer({
  showHeader = false,
  disableMenuButton = false,
  disableGoBackButton = false,
  children,
  style,
  ...rest
}: AppContainerProps) {
  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView
        style={[styles.container, style]}
        edges={["top", "bottom"]}
        {...rest}
      >
        {showHeader && (
          <Header
            disableGoBackButton={disableGoBackButton}
            disableMenuButton={disableMenuButton}
          />
        )}
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={0}
        >
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.content}>{children}</View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
  },
});
