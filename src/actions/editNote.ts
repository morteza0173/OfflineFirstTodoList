"use server";

import { prisma } from "@/lib/db";
import { LocalTodo } from "@/lib/indexeddb";

const editNote = async (note: LocalTodo) => {
  try {
    await prisma.todo.update({
      where: { id: note.id },
      data: {
        title: note.title,
        updatedAt: note.updatedAt,
      },
    });
  } catch (error) {
    console.log(error);
    throw new Error("خطا در ویرایش یادداشت");
  }
};
export default editNote;
