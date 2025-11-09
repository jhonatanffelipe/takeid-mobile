import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AppContainer } from "../components/AppContaner";
import { Skeleton } from "../components/Skeleton";
import { IEmployee } from "../interfaces/IEmployee";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/RootStackParamList";
import { useNavigation } from "@react-navigation/native";

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

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Employees"
>;

function EmployeeItem({ employee }: { employee: IEmployee }) {
  const navigation = useNavigation<NavigationProp>();
  return (
    <TouchableOpacity
      style={styles.item}
      activeOpacity={0.7}
      onPress={() =>
        navigation.navigate("Employee", {
          employeeId: employee.id,
          name: employee.name,
        })
      }
    >
      <View style={styles.avatar} />
      <View>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>
          {employee.name}
        </Text>
        <Text style={{ fontSize: 14, color: "#666" }}>{employee.position}</Text>
      </View>
    </TouchableOpacity>
  );
}

export function Employees() {
  const [employees, setEmployees] = useState<IEmployee[]>([
    {
      id: 1,
      name: "John Doe",
      position: "Software Engineer",
      email: "john.doe@example.com",
    },
    {
      id: 2,
      name: "Jane Smith",
      position: "Product Manager",
      email: "jane.smith@example.com",
    },
    {
      id: 3,
      name: "Alice Johnson",
      position: "UX Designer",
      email: "alice.johnson@example.com",
    },
  ]);

  const [loading, setLoading] = useState(false);

  return (
    <AppContainer topMenu>
      <View style={styles.content}>
        {loading
          ? Array(10)
              .fill(0)
              .map((_, index) => <EmployeeItemSkeleton key={index} />)
          : employees.map((employee) => (
              <EmployeeItem key={employee.id} employee={employee} />
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
    padding: 16,
  },
  skeleton: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#ccc",
    marginRight: 10,
    borderColor: "#00958B",
    borderWidth: 2,
  },
  item: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#fff",
    marginBottom: 16,
    elevation: 2, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
});
