"use server";

import { prisma } from "@/lib/db";
import { LocalTodo } from "@/lib/indexeddb";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export type DeleteErrorType = "NOT_FOUND" | "OTHER_ERROR" | "UNKNOWN_ERROR";

const deleteNote = async (note: LocalTodo): Promise<void> => {
  try {
    await prisma.todo.delete({
      where: { id: note.id },
    });
  } catch (error: unknown) {
    const err: Error & { code?: DeleteErrorType } = new Error(
      error instanceof Error ? error.message : "خطای ناشناخته"
    );

    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        err.code = "NOT_FOUND";
      } else {
        err.code = "OTHER_ERROR";
      }
    } else {
      err.code = "UNKNOWN_ERROR";
    }

    throw err;
  }
};

export default deleteNote;
