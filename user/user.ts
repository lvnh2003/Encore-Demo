import { api } from "encore.dev/api";
import { SQLDatabase } from "encore.dev/storage/sqldb";
import { user } from "~encore/clients";

interface UserParams {
  name: string;
  email: string;
}

interface UserResponse {
  name: string;
  email: string;
}
export const create = api(
  {
    method: "POST",
    path: "/create",
    expose: true,
  },
  async ({ name, email }: UserParams) => {
    return doCreate(name, email);
  }
);

export const doCreate = async (name: string, email: string) => {
  const row = await UsersDB.queryRow`
        INSERT INTO users (name, email, isActive) VALUES (${name}, ${email},${true})
    `;
  return row;
};

export const get = api(
  {
    method: "GET",
    path: "/get/:userID",
    expose: true,
  },
  async ({ userID }: { userID: number }) => {
    return doGet(userID);
  }
);

export const doGet = async (userID: number): Promise<UserResponse> => {
  const row = await UsersDB.queryRow`
        SELECT * FROM users WHERE id = ${userID} 
    `;
  return { name: row?.name, email: row?.email };
};

export const update = api(
  {
    method: "POST",
    path: "/update/:userID",
    expose: true,
  },
  async ({
    userID,
    name,
    email,
  }: {
    userID: number;
    name: string;
    email: string;
  }) => {
    return doUpdate(userID, name, email);
  }
);

const doUpdate = async (userID: number, name: string, email: string) => {
  const user = doGet(userID);
  if (user === null) return;
  const row = await UsersDB.queryRow`
        UPDATE users SET name = ${name}, email = ${email} WHERE id = ${userID}
    `;
  return row;
};

export const remove = api(
  {
    method: "DELETE",
    path: "/remove/:userID",
    expose: true,
  },
  async ({ userID }: { userID: number }) => {
    return doRemove(userID);
  }
);

const doRemove = async (userID: number) => {
  const user = doGet(userID);
  if (user === null) return;

  const row = await UsersDB.queryRow`
        DELETE FROM users WHERE id = ${userID}
    `;
  return row;
};
export const UsersDB = new SQLDatabase("users", {
  migrations: "./migrations",
});
