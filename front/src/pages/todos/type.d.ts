type Todo = {
  title: string;
  content: string;
  id: string;
  createdAt: string;
  updatedAt: string;
  priority: TodoPriority;
};

type TodoPriority = "urgent" | "normal" | "low";

type CreateTodoRequest = Pick<Todo, "title" | "content" | "priority">;

type UpdateTodoRequest = Pick<Todo, "id" | "title" | "content" | "priority">;

type ApiResponse<T> = {
  data: T;
};

type TodoEditFormType = CreateTodoRequest;
