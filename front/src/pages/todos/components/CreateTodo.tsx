import { z } from "zod";
import { useTodoQuery } from "../hooks/useTodoQuery";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  title: z.string().min(1, "title is required"),
  content: z.string().min(1, "content is required"),
});

type FormType = {
  title: string;
  content: string;
};

export const CreateTodo = () => {
  const {
    register,
    formState: { isValid },
    handleSubmit,
    reset,
  } = useForm<FormType>({
    resolver: zodResolver(schema),
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
      <input type="text" placeholder="title" {...register("title")} />
      <input type="text" placeholder="content" {...register("content")} />

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
