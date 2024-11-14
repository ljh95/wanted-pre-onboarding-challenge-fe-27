import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TodoService } from "../services/todo.service";
import { TODO_QUERY_KEYS } from "../const/todo.const";

export const useTodoQuery = () => {
  const queryClient = useQueryClient();
  const todoService = TodoService.getInstance();

  return {
    useGetTodos: () => {
      return useQuery({
        queryKey: TODO_QUERY_KEYS.lists(),
        queryFn: () => todoService.getTodoList(),
      });
    },

    useGetTodoById: (id: string) => {
      return useQuery({
        queryKey: TODO_QUERY_KEYS.detail(id),
        queryFn: () => todoService.getTodoById(id),
        enabled: !!id,
      });
    },

    useCreateTodo: () => {
      return useMutation({
        mutationFn: (todo: CreateTodoRequest) => todoService.createTodo(todo),
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: TODO_QUERY_KEYS.lists(),
          });
        },
      });
    },

    useUpdateTodo: () => {
      return useMutation({
        mutationFn: (todo: UpdateTodoRequest) =>
          todoService.updateTodo(todo.id, todo),
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: TODO_QUERY_KEYS.lists(),
          });
        },
      });
    },

    useDeleteTodo: () => {
      return useMutation({
        mutationFn: (id: string) => todoService.deleteTodo(id),
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: TODO_QUERY_KEYS.lists(),
          });
        },
      });
    },
  };
};
