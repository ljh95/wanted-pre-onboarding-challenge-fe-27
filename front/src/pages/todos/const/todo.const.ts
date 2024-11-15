import { z } from "zod";

export const TODO_QUERY_KEYS = {
  all: ["todos"] as const,
  lists: () => [...TODO_QUERY_KEYS.all, "list"] as const,
  detail: (id: string) => [...TODO_QUERY_KEYS.all, "detail", id] as const,
};

export const TODO_ITEM_SCHEMA = z.object({
  title: z.string().min(1, "title is required"),
  content: z.string().min(1, "content is required"),
  priority: z.union([
    z.literal("urgent"),
    z.literal("normal"),
    z.literal("low"),
  ]),
});
