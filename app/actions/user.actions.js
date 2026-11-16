"use server";

import { getAllUsers } from "services/db.service";

export async function fetchUsers() {
  const users = await getAllUsers();
  return users;
}
