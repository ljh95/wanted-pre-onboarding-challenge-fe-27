import apiClient from "../../../api/api";

export const todoApi = {
  getTodoList: (params?: TodoFilterType) =>
    apiClient.get<ApiResponse<Todo[]>>("/todos", { params }),
  getTodoById: (id: string) => apiClient.get<ApiResponse<Todo>>(`/todos/${id}`),
  createTodo: (body: CreateTodoRequest) =>
    apiClient.post<ApiResponse<Todo>>("/todos", body),
  updateTodo: (id: string, body: CreateTodoRequest) =>
    apiClient.put<ApiResponse<Todo>>(`/todos/${id}`, body),
  deleteTodo: (id: string) =>
    apiClient.delete<ApiResponse<null>>(`/todos/${id}`),
};
