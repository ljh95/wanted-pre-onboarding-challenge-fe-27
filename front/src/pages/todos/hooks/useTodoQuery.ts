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
        staleTime: 1000 * 60 * 5,
      });
    },

    useGetTodoById: (id: string | null) => {
      return useQuery({
        queryKey: TODO_QUERY_KEYS.detail(id as string),
        queryFn: () => todoService.getTodoById(id as string),
        enabled: !!id,
        staleTime: 1000 * 60 * 5,
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
        onSuccess: (_, variables) => {
          queryClient.invalidateQueries({
            queryKey: TODO_QUERY_KEYS.lists(),
          });
          queryClient.invalidateQueries({
            queryKey: TODO_QUERY_KEYS.detail(variables.id),
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
