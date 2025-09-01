"use server";
import { prisma } from "@/lib/db";

const getTodosData = async () => {
  const todosData = await prisma.todo.findMany();

  return todosData;
};
export default getTodosData;
