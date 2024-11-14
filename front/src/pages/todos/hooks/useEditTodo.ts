import { useState } from "react";
import { useTodoQuery } from "./useTodoQuery";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  title: z.string().min(1, "title is required"),
  content: z.string().min(1, "content is required"),
});

export const useEditTodo = (todo: Todo) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const { useUpdateTodo } = useTodoQuery();
  const { mutateAsync: updateTodo } = useUpdateTodo();

  const form = useForm<TodoEditFormType>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const startEdit = () => {
    form.setValue("title", todo.title);
    form.setValue("content", todo.content);
    setIsEditMode(true);
  };

  const cancelEdit = () => {
    setIsEditMode(false);
    form.reset();
  };

  const saveEdit = async () => {
    if (!form.formState.isValid) return;

    await updateTodo({
      id: todo.id,
      ...form.getValues(),
    });
    setIsEditMode(false);
  };

  return {
    isEditMode,
    form,
    startEdit,
    cancelEdit,
    saveEdit,
  };
};
