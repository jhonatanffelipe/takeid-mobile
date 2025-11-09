import React from "react";
import { View, Text } from "react-native";
import { AppContainer } from "../components/ui/AppContaner";
import ButtonTouchableOpacity from "../components/ButtonTouchableOpacity";
import api from "../service/api";
import { IEmployee } from "../interfaces/IEmployee";
import { getEmployees, saveEmployee } from "../database/employees";
import { Alert } from "../components/Alert";

export function Home() {
  const [employees, setEmployees] = React.useState<IEmployee[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSaveEmployee = async (employee: IEmployee) => {
    await saveEmployee(
      employee.id,
      employee.name,
      employee.position,
      employee.email
    )
      .then(() => {
        console.log("Funcionário salvo localmente:", employee.name);
      })
      .catch((err) => {
        setError("Erro ao salvar funcionário:" + err);
      });
  };

  const handleSyncEmployees = async () => {
    setLoading(true);
    setError(null);
    setEmployees([]);

    await api
      .get("/employees")
      .then(async (response) => {
        response.data.forEach(async (employee: IEmployee) => {
          await handleSaveEmployee(employee);
        });

        setEmployees(response.data);
      })
      .catch(() => {
        setError("Erro ao carregar funcionários.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <AppContainer showHeader disableGoBackButton disableMenuButton>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {error && <Alert severity="error">{error}</Alert>}
        <ButtonTouchableOpacity
          onPress={handleSyncEmployees}
          title="Sincronizar dados"
        />

        <Text style={{ marginTop: 20, fontSize: 16, fontWeight: "bold" }}>
          Funcionários Salvos Localmente:
        </Text>
        {loading ? (
          <Text>Carregando...</Text>
        ) : employees.length > 0 ? (
          employees.map((employee) => (
            <Text key={employee.id}>
              {employee.id} - {employee.name} ({employee.position})
            </Text>
          ))
        ) : (
          <Text>Nenhum funcionário salvo localmente.</Text>
        )}
      </View>
    </AppContainer>
  );
}
