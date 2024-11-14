export const TODO_QUERY_KEYS = {
  all: ["todos"] as const,
  lists: () => [...TODO_QUERY_KEYS.all, "list"] as const,
  detail: (id: string) => [...TODO_QUERY_KEYS.all, "detail", id] as const,
};
