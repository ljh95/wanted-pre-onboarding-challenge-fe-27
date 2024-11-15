import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { TODO_ITEM_SCHEMA } from "../const/todo.const";
import { useTodoQuery } from "./useTodoQuery";

export const useEditTodo = (todo: Todo) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const { useUpdateTodo } = useTodoQuery();
  const { mutateAsync: updateTodo } = useUpdateTodo();

  const form = useForm<TodoEditFormType>({
    resolver: zodResolver(TODO_ITEM_SCHEMA),
    mode: "onChange",
  });

  const startEdit = () => {
    form.setValue("title", todo.title);
    form.setValue("content", todo.content);
    form.setValue("priority", todo.priority);
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
