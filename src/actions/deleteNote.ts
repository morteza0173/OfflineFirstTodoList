"use server";

import { prisma } from "@/lib/db";
import { LocalTodo } from "@/lib/indexeddb";

export type DeleteErrorType = "NOT_FOUND" | "OTHER_ERROR" | "UNKNOWN_ERROR";

const deleteNote = async (note: LocalTodo): Promise<void> => {
  try {
    await prisma.todo.delete({
      where: { id: note.id },
    });
  } catch {
    throw new Error("خطا در حذف یادداشت");
  }
};

export default deleteNote;
