type Todo = {
  title: string;
  content: string;
  id: string;
  createdAt: string;
  updatedAt: string;
};

type CreateTodoRequest = Pick<Todo, "title" | "content">;

type UpdateTodoRequest = Pick<Todo, "id" | "title" | "content">;

type ApiResponse<T> = {
  data: T;
};
