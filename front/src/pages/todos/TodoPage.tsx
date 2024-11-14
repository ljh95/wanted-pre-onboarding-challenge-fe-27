import { TodoDetail } from "./TodoDetail";
import { TodoList } from "./TodoList";

export const TodoPage = () => {
  return (
    <div className="flex justify-between p-[20px] w-[100vh] h-screen">
      <TodoList />
      <TodoDetail />
    </div>
  );
};
