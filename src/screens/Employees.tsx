import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AppContainer } from "../components/ui/AppContaner";
import { Skeleton } from "../components/Skeleton";
import { IEmployee } from "../interfaces/IEmployee";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/RootStackParamList";
import { useNavigation } from "@react-navigation/native";
import api from "../service/api";
import { Alert } from "../components/Alert";
import { TableNoContent } from "../components/table/TableNoContent";
import { TableReload } from "../components/table/TableReload";
import { getEmployees } from "../database/employees";

function EmployeeItemSkeleton() {
  return (
    <View style={styles.skeleton}>
      <Skeleton variant="circular" width={60} height={60} />
      <View style={{ marginLeft: 10 }}>
        <Skeleton variant="rectangular" width={270} height={20} radius={4} />
        <Skeleton
          variant="rectangular"
          width={200}
          height={15}
          radius={4}
          style={{ marginTop: 4 }}
        />
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
          {employee.id} - {employee.name}
        </Text>
        <Text style={{ fontSize: 14, color: "#666" }}>{employee.position}</Text>
      </View>
    </TouchableOpacity>
  );
}

export function Employees() {
  const [employees, setEmployees] = useState<IEmployee[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);

  const handleListLocalEmployees = async () => {
    await getEmployees()
      .then((localEmployees) => {
        setEmployees(localEmployees);
      })
      .catch((error) => {
        setError("Erro ao carregar funcionários locais: " + error);
      });
  };

  const handleListEmployees = async () => {
    setLoading(true);
    setError(null);
    setEmployees([]);

    await api
      .get("/employees")
      .then((response) => {
        setEmployees(response.data);
      })
      .catch(() => {
        setError("Erro ao carregar funcionários.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    handleListLocalEmployees();
    // handleListEmployees();
  }, [handleListLocalEmployees]);

  return (
    <AppContainer showHeader disableGoBackButton disableMenuButton>
      {error && (
        <Alert severity="error" closeAlert={() => setError(null)}>
          {error}
        </Alert>
      )}
      <View style={styles.content}>
        {loading ? (
          Array(3)
            .fill(0)
            .map((_, index) => <EmployeeItemSkeleton key={index} />)
        ) : employees.length > 0 ? (
          employees.map((employee) => (
            <EmployeeItem key={employee.id} employee={employee} />
          ))
        ) : (
          <TableNoContent message="Nenhum funcionário encontrado." />
        )}
      </View>
      <TableReload onReload={handleListLocalEmployees} />
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
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
});
