import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { AppContainer } from "../components/AppContaner";
import { Skeleton } from "../components/Skeleton";

function EmployeeItemSkeleton() {
  return (
    <View style={styles.skeleton}>
      <Skeleton variant="circular" width={60} height={60} />
      <View>
        <Skeleton variant="rectangular" width={270} height={20} radius={4} />
        <Skeleton variant="rectangular" width={270} height={20} radius={4} />
      </View>
    </View>
  );
}

export function Employees() {
  return (
    <AppContainer topMenu>
      <View style={styles.content}>
        {Array(10)
          .fill(0)
          .map((_, index) => (
            <EmployeeItemSkeleton key={index} />
          ))}
      </View>
    </AppContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  skeleton: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
});
