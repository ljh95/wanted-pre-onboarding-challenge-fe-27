import { useState } from "react";
import { DeleteTodoButton } from "./DeleteTodoButton";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTodoQuery } from "../hooks/useTodoQuery";

const schema = z.object({
  title: z.string().min(1, "title is required"),
  content: z.string().min(1, "content is required"),
});

type FormType = {
  title: string;
  content: string;
};

export const TodoItem = ({ todo, idx }: { todo: Todo; idx: number }) => {
  const [isEditMode, setIsEditMode] = useState(false);

  const {
    register,
    formState: { isValid },
    getValues,
    setValue,
  } = useForm<FormType>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const { useUpdateTodo } = useTodoQuery();
  const { mutateAsync: updateTodo } = useUpdateTodo();

  const onClickEditButton = async () => {
    if (isEditMode) {
      await updateTodo({ id: todo.id, ...getValues() });
      setIsEditMode((prev) => !prev);
    } else {
      setIsEditMode((prev) => !prev);
      setValue("title", todo.title);
      setValue("content", todo.content);
    }
  };

  const onCancel = () => {
    setIsEditMode(false);
  };

  const disabled = isEditMode ? !isValid : false;

  return (
    <li key={todo.id} className="flex gap-[10px] justify-start items-center">
      <span>{idx + 1}. </span>
      {isEditMode ? (
        <>
          <input type="text" placeholder="title" {...register("title")} />
          <input type="text" placeholder="content" {...register("content")} />
        </>
      ) : (
        <>
          <span>{todo.title}</span>
          <span>{todo.content}</span>
        </>
      )}
      <button type="button" onClick={onClickEditButton} disabled={disabled}>
        {isEditMode ? "Edit todo" : "Edit"}
      </button>
      {isEditMode && <button onClick={onCancel}>Cancel</button>}
      <DeleteTodoButton id={todo.id} />
    </li>
  );
};
