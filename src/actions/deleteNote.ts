"use server";

import { prisma } from "@/lib/db";
import { LocalTodo } from "@/lib/indexeddb";

const deleteNote = async (note: LocalTodo) => {
  try {
    await prisma.todo.delete({
      where: { id: note.id },
    });
  } catch (error) {
    console.log(error);
    throw new Error("خطا در حذف یادداشت");
  }
};
export default deleteNote;
