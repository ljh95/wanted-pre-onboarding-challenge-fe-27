import { useTodoQuery } from "../hooks/useTodoQuery";

export const DeleteTodoButton = ({ id }: { id: string }) => {
  const { useDeleteTodo } = useTodoQuery();
  const { mutateAsync: deleteTodo } = useDeleteTodo();

  const handleDelete = async () => {
    await deleteTodo(id);
  };

  return (
    <button onClick={handleDelete} type="button" className="disabled-btn">
      Delete
    </button>
  );
};
