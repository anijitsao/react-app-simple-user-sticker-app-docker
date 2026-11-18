"use server";

import { getAllUsers } from "services/db.service";

export async function fetchUsers(skipRecords = 0) {
  const users = await getAllUsers(skipRecords);
  users.forEach(function (user) {
    // changing the _id field to string as Next JS expects it
    user._id = user._id.toString();
  });
  return users;
}
