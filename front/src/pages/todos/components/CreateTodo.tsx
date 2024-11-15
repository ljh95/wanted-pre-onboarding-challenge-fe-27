import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { TODO_ITEM_SCHEMA } from "../const/todo.const";
import { useTodoQuery } from "../hooks/useTodoQuery";
import { TodoFormItems } from "./TodoItem";

export const CreateTodo = () => {
  const {
    register,
    formState: { isValid },
    handleSubmit,
    reset,
  } = useForm<CreateTodoRequest>({
    resolver: zodResolver(TODO_ITEM_SCHEMA),
    mode: "onChange",
  });

  const { useCreateTodo } = useTodoQuery();
  const { mutateAsync: createTodo } = useCreateTodo();

  const onSubmit = handleSubmit(async (e) => {
    await createTodo(e);
    reset();
  });

  return (
    <form
      className="flex gap-[20px] [&>input]:border [&>input]:rounded-[4px] [&>input]:p-[4px]"
      onSubmit={onSubmit}
    >
      <TodoFormItems register={register} />

      <button
        type="submit"
        disabled={isValid === false}
        className="disabled:bg-[rgba(0,0,0,0.1)] disabled:border-0 disabled:text-[white]"
      >
        create todo
      </button>
    </form>
  );
};
