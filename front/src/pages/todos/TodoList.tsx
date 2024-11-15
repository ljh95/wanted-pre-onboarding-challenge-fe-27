import { useURLParams } from "../../url/hooks/useURLParams";
import { CreateTodo } from "./components/CreateTodo";
import { TodoFilter } from "./components/TodoFilter";
import { TodoItem } from "./components/TodoItem";
import { useTodoQuery } from "./hooks/useTodoQuery";

export const TodoList = () => {
  const { useGetTodos } = useTodoQuery();

  const { filters } = useURLParams();

  let { data } = useGetTodos(filters);

  if (typeof data !== "object") data = [];

  return (
    <div className="flex flex-col gap-[20px]">
      <h2 className="text-[40px] font-bold">TodoList</h2>

      <CreateTodo />

      <TodoFilter />

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

export const getURLParams = (url: string) => {
  // URL에서 ? 이후의 쿼리스트링 부분만 추출
  const queryString = url.split("?")[1];

  // 쿼리스트링이 없으면 빈 URLSearchParams 객체 반환
  if (!queryString) {
    return new URLSearchParams();
  }

  return new URLSearchParams(queryString);
};
