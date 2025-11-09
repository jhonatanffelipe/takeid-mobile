import { IEmployee } from "../interfaces/IEmployee";
import { db } from "./index";

export async function saveEmployee(
  id: number,
  name: string,
  position: string,
  email: string
) {
  await db.execAsync("DELETE FROM employees");

  await db.runAsync(
    "INSERT INTO employees (id, name, position, email, synchronized) VALUES (?, ?, ?, ?, ?)",
    [id, name, position, email, 1]
  );
}

export async function getEmployees(): Promise<IEmployee[]> {
  const result = await db.getAllAsync(
    "SELECT * FROM employees order by id asc"
  );
  return result as IEmployee[];
}
