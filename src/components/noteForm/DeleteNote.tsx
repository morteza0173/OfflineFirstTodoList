import { indexeddb, LocalTodo } from "@/lib/indexeddb";
import { Button } from "../ui/button";
import { useQueryClient } from "@tanstack/react-query";

export async function savePendingTodos(todos: LocalTodo[]) {
  await indexeddb.pendingTodos.bulkPut(todos);
}

const DeleteNote = ({
  item,
  close,
}: {
  item: LocalTodo;
  close: () => void;
}) => {
  const queryClient = useQueryClient();

  const submitHandler = async () => {
    const indexeddbData: LocalTodo = {
      id: item.id,
      createdAt: item.createdAt,
      updatedAt: new Date(),
      completed: item.completed,
      title: item.title,
      pending: "delete",
    };
    await savePendingTodos([indexeddbData]);

    const cachedTodos = queryClient.getQueryData<LocalTodo[]>(["todos"]);

    if (!cachedTodos || cachedTodos.length === 0) {
      const notes = await indexeddb.todos.toArray();
      const pendingNotes = await indexeddb.pendingTodos.toArray();

      const mergedMap: Record<string, LocalTodo> = {};
      [...notes, ...pendingNotes].forEach((todo) => {
        if (todo.id !== indexeddbData.id && todo.pending !== "delete") {
          mergedMap[todo.id] = todo;
        }
      });

      const merged = Object.values(mergedMap).sort(
        (a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()
      );

      queryClient.setQueryData<LocalTodo[]>(["todos"], merged);
    } else {
      queryClient.setQueryData<LocalTodo[]>(["todos"], (old = []) => {
        const mergedMap: Record<string, LocalTodo> = {};
        old.forEach((todo) => {
          if (todo.id !== indexeddbData.id && todo.pending !== "delete") {
            mergedMap[todo.id] = todo;
          }
        });
        return Object.values(mergedMap).sort(
          (a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()
        );
      });
    }

    window.dispatchEvent(new Event("new-todo"));

    close();
  };

  return (
    <div className="p-2 w-full">
      <Button
        size={"lg"}
        variant={"destructive"}
        className="w-full"
        onClick={() => submitHandler()}
      >
        حذف
      </Button>
    </div>
  );
};
export default DeleteNote;
