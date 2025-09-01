"use client";
import getTodosData from "@/actions/getTodos";
import { indexeddb, LocalTodo } from "@/lib/indexeddb";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

async function getTodos(): Promise<LocalTodo[]> {
  const notes = await indexeddb.todos.toArray();
  const pendingNotes = await indexeddb.pendingTodos.toArray();
  return [...notes, ...pendingNotes];
}

export async function saveTodos(serverTodos: LocalTodo[]) {
  if (!serverTodos || serverTodos.length === 0) return [];

  try {
    const offlinePending = await indexeddb.pendingTodos.toArray();

    const mergedMap: Record<string, LocalTodo> = {};

    [...serverTodos, ...offlinePending].forEach((todo) => {
      mergedMap[todo.id] = todo;
    });

    const merged = Object.values(mergedMap);

    await indexeddb.todos.bulkPut(merged);

    return merged;
  } catch (error) {
    console.error("خطا در ذخیره‌سازی یادداشت در IndexedDB:", error);
    return serverTodos;
  }
}

export function useGetNotes() {
  const [offlineData, setOfflineData] = useState<LocalTodo[]>([]);

  useEffect(() => {
    getTodos().then((todos) => setOfflineData(todos));
  }, []);

  const {
    data: serverData,
    isPending,
    refetch,
    isError,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      try {
        const data = await getTodosData();
        const merged = await saveTodos(data);
        setOfflineData(merged || []);
        return merged;
      } catch {
        throw new Error("خطا در دریافت یادداشت‌ها از سرور");
      }
    },
  });

  const mergedData: LocalTodo[] = Object.values(
    [
      ...(serverData ?? []),
      ...offlineData.filter((o) => !serverData?.some((s) => s.id === o.id)),
    ].reduce<Record<string, LocalTodo>>((acc, todo) => {
      acc[todo.id] = todo;
      return acc;
    }, {})
  ).sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());

  return { data: mergedData, isPending, refetch, isError };
}
