import { Todo } from "@prisma/client";
import Dexie, { type EntityTable } from "dexie";

type PendingType = "add" | "edit" | "delete" | null;

type LocalTodo = Todo & {
  pending?: PendingType;
};

export const indexeddb = new Dexie("TodoDatabase") as Dexie & {
  todos: EntityTable<LocalTodo, "id">;
  pendingTodos: EntityTable<LocalTodo, "id">;
};

indexeddb.version(1).stores({
  todos: "id, title, completed, createdAt, updatedAt",
  pendingTodos: "id, title, completed, pendingAdd, createdAt, updatedAt",
});
