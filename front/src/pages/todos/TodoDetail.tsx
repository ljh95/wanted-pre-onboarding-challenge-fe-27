import dayjs from "dayjs";
import { useSearchParams } from "react-router-dom";
import { DATE_FORMAT } from "../../const/date.const";
import { useTodoQuery } from "./hooks/useTodoQuery";

export const TodoDetail = () => {
  const [searchParams] = useSearchParams();
  const todoId = searchParams.get("id");

  const { useGetTodoById } = useTodoQuery();
  const { data: todo } = useGetTodoById(todoId);

  if (!todo) return null;

  return (
    <div>
      <h2 className="text-[40px] font-bold mb-[40px]">TodoDetail</h2>

      <div className="flex flex-col items-start gap-[10px] mb-[40px]">
        <span>title: {todo.title}</span>
        <span>content: {todo.content}</span>
        <span>priority: {todo.priority}</span>

        <p>createAt: {dayjs(todo.createdAt).format(DATE_FORMAT)}</p>
        <p>updateAt: {dayjs(todo.updatedAt).format(DATE_FORMAT)}</p>
      </div>
    </div>
  );
};
