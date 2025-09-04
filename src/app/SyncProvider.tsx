"use client";
import addNote from "@/actions/addNote";
import deleteNote from "@/actions/deleteNote";
import editNote from "@/actions/editNote";
import { indexeddb, LocalTodo } from "@/lib/indexeddb";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useCallback } from "react";

const SyncProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useQueryClient();

  const mutationAdd = useMutation({
    mutationKey: ["addSyncTodos"],
    mutationFn: async (todo: LocalTodo) => addNote(todo),
    onSuccess: async (_data, variables) => {
      await indexeddb.pendingTodos.delete(variables.id);
      await indexeddb.todos.delete(variables.id);
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (error, variables) => {
      console.error("❌ خطا در سینک", error, variables);
    },
  });

  const mutationEdit = useMutation({
    mutationKey: ["EditSyncTodos"],
    mutationFn: async (todo: LocalTodo) => editNote(todo),
    onSuccess: async (_data, variables) => {
      await indexeddb.pendingTodos.delete(variables.id);
      await indexeddb.todos.delete(variables.id);
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (error, variables) => {
      if ("code" in error) {
        if (error.code === "NOT_FOUND") {
          indexeddb.pendingTodos.delete(variables.id);
        } else {
          console.log("مشکل اتصال، pending حفظ شد");
        }
      }
    },
  });

  const mutationDelete = useMutation({
    mutationKey: ["DeleteSyncTodos"],
    mutationFn: async (todo: LocalTodo) => deleteNote(todo),
    onSuccess: async (_data, variables) => {
      await indexeddb.pendingTodos.delete(variables.id);
      await indexeddb.todos.delete(variables.id);
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (error, variables) => {
      if ("code" in error) {
        if (error.code === "NOT_FOUND") {
          indexeddb.pendingTodos.delete(variables.id);
        } else {
          console.log("مشکل اتصال، pending حفظ شد");
        }
      }
    },
  });

  const syncPendingTodos = useCallback(async () => {
    if (!navigator.onLine) return;
    const pending = await indexeddb.pendingTodos.toArray();
    for (const todo of pending) {
      if (todo.pending === "add" && !mutationAdd.isPending) {
        mutationAdd.mutate(todo);
      }
      if (todo.pending === "edit" && !mutationEdit.isPending) {
        mutationEdit.mutate(todo);
      }
      if (todo.pending === "delete" && !mutationDelete.isPending) {
        mutationDelete.mutate(todo);
      }
    }
  }, [mutationAdd, mutationEdit, mutationDelete]);

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

export default SyncProvider;
