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
import { TopMenu } from "./TopMenu";

type SAppContainerProps = ViewProps & {
  children: React.ReactNode;
  topMenu?: boolean;
};

export function AppContainer({
  topMenu,
  children,
  style,
  ...rest
}: SAppContainerProps) {
  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView
        style={[styles.container, style]}
        edges={["top", "bottom"]}
        {...rest}
      >
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={0}
        >
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
          >
            {topMenu && <TopMenu />}
            {children}
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
});
