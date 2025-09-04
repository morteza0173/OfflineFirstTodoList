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

    queryClient.setQueryData<LocalTodo[]>(["todos"], (old = []) =>
      old.filter((todo) => todo.id !== item.id)
    );

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
