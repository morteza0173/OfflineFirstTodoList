"use client";
import addTodos from "@/actions/addTodos";
import { indexeddb, LocalTodo } from "@/lib/indexeddb";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useCallback } from "react";

const AddSyncProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useQueryClient();

  const mutationTodo = useMutation({
    mutationKey: ["syncTodos"],
    mutationFn: async (todo: LocalTodo) => addTodos({ todo }),
    onSuccess: async (_data, variables) => {
      await indexeddb.pendingTodos.delete(variables.id);
      await indexeddb.todos.delete(variables.id);
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (error, variables) => {
      console.error("❌ خطا در سینک", error, variables);
    },
  });

  const syncPendingTodos = useCallback(async () => {
    if (!navigator.onLine) return;
    const pending = await indexeddb.pendingTodos.toArray();
    for (const todo of pending) {
      if (!mutationTodo.isPending) {
        mutationTodo.mutate(todo);
      }
    }
  }, [mutationTodo]);

  useEffect(() => {
    window.addEventListener("online", syncPendingTodos);

    const interval = setInterval(() => {
      if (navigator.onLine) {
        syncPendingTodos();
      }
    }, 30_000);

    return () => {
      window.removeEventListener("online", syncPendingTodos);
      clearInterval(interval);
    };
  }, [syncPendingTodos]);

  useEffect(() => {
    window.addEventListener("new-todo", syncPendingTodos);
    return () => window.removeEventListener("new-todo", syncPendingTodos);
  }, [syncPendingTodos]);

  return <>{children}</>;
};

export default AddSyncProvider;
