"use server";

import { prisma } from "@/lib/db";
import { LocalTodo } from "@/lib/indexeddb";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export type EditErrorType = "NOT_FOUND" | "OTHER_ERROR" | "UNKNOWN_ERROR";

const editNote = async (note: LocalTodo): Promise<void> => {
  try {
    await prisma.todo.update({
      where: { id: note.id },
      data: {
        title: note.title,
        updatedAt: note.updatedAt,
      },
    });
  } catch (error: unknown) {
    const err: Error & { code?: EditErrorType } = new Error(
      error instanceof Error ? error.message : "خطای ناشناخته"
    );

    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        // آیتم برای ویرایش پیدا نشد
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

export default editNote;
