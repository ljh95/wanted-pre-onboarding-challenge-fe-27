import { CreateTodo } from "./components/CreateTodo";
import { TodoItem } from "./components/TodoItem";
import { useTodoQuery } from "./hooks/useTodoQuery";

export const TodoList = () => {
  const { useGetTodos } = useTodoQuery();
  const { data } = useGetTodos();

  return (
    <div className="flex flex-col gap-[20px]">
      <h2 className="text-[40px] font-bold">TodoList</h2>

      <CreateTodo />

      <div>
        <ul className="flex flex-col gap-[10px]">
          {data?.map((todo, idx) => (
            <TodoItem key={todo.id} todo={todo} idx={idx} />
          ))}
        </ul>
      </div>
    </div>
  );
};
