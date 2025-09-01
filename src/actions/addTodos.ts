"use server";

import { prisma } from "@/lib/db";
import { LocalTodo } from "@/lib/indexeddb";

const addTodos = async ({ todo }: { todo: LocalTodo }) => {
  try {
    await prisma.todo.create({
      data: {
        id: todo.id,
        title: todo.title,
        completed: todo.completed,
        createdAt: todo.createdAt,
        updatedAt: todo.updatedAt,
      },
    });
  } catch (error) {
    console.log(error);
    throw new Error("خطا در ثبت یادداشت");
  }
};
export default addTodos;
