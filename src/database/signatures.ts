import { ISignature } from "../interfaces/ISignature";
import { db } from "./index";

export async function saveSignature({
  api_id,
  employee_id,
  signed_at,
  image,
  synchronized,
}: Omit<ISignature, "id">) {
  await db.runAsync(`DELETE FROM signatures WHERE api_id = ? AND api_id > 0;`, [
    api_id,
  ]);

  await db.runAsync(
    `INSERT INTO signatures (api_id, employee_id, signed_at, image, synchronized)
     VALUES (?, ?, ?, ?, ?);`,
    [api_id, employee_id, signed_at, image ?? null, synchronized ? 1 : 0]
  );
}

export async function getSignaturesByEmployee(
  employee_id: number
): Promise<ISignature[]> {
  const result = await db.getAllAsync(
    `SELECT * FROM signatures WHERE employee_id = ? ORDER BY signed_at DESC;`,
    [employee_id]
  );
  return result as ISignature[];
}

export async function getUnsyncedSignatures(): Promise<ISignature[]> {
  const result = await db.getAllAsync(
    `SELECT * FROM signatures WHERE synchronized = 0 ORDER BY id ASC;`
  );
  return result as ISignature[];
}

export async function markSignatureAsSynced(id: number) {
  await db.runAsync(`UPDATE signatures SET synchronized = 1 WHERE id = ?;`, [
    id,
  ]);
}

export async function clearSignaturesByEmployee(employee_id: number) {
  await db.runAsync("DELETE FROM signatures WHERE employee_id = ?;", [
    employee_id,
  ]);
}

export async function deleteSignature(id: number) {
  await db.runAsync(`DELETE FROM signatures WHERE id = ?;`, [id]);
}
