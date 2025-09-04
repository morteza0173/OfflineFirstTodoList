"use server";

import { prisma } from "@/lib/db";
import { LocalTodo } from "@/lib/indexeddb";

const addNote = async (note: LocalTodo) => {
  try {
    await prisma.todo.create({
      data: {
        id: note.id,
        title: note.title,
        completed: note.completed,
        createdAt: note.createdAt,
        updatedAt: note.updatedAt,
      },
    });
  } catch (error) {
    console.log(error);
    throw new Error("خطا در ثبت یادداشت");
  }
};
export default addNote;
