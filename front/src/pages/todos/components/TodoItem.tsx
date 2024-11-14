import { UseFormRegister } from "react-hook-form";
import { useEditTodo } from "../hooks/useEditTodo";
import { useTodoNavigation } from "../hooks/useTodoNavigation";
import { DeleteTodoButton } from "./DeleteTodoButton";

export const TodoItem = ({ todo, idx }: { todo: Todo; idx: number }) => {
  const {
    isEditMode,
    form: {
      register,
      formState: { isValid },
    },
    startEdit,
    cancelEdit,
    saveEdit,
  } = useEditTodo(todo);

  const { goToDetail } = useTodoNavigation();

  const handleEditClick = () => {
    if (isEditMode) {
      saveEdit();
    } else {
      startEdit();
    }
  };

  return (
    <li className="flex gap-[10px] justify-start items-center">
      <span>{idx + 1}. </span>
      {isEditMode ? (
        <TodoEditForm register={register} />
      ) : (
        <TodoDisplay
          title={todo.title}
          content={todo.content}
          onTitleClick={() => goToDetail(todo.id)}
        />
      )}
      <TodoActions
        isEditMode={isEditMode}
        onEditClick={handleEditClick}
        onCancelClick={cancelEdit}
        isDisabled={!isValid}
        todoId={todo.id}
      />
    </li>
  );
};

const TodoEditForm = ({
  register,
}: {
  register: UseFormRegister<TodoEditFormType>;
}) => (
  <>
    <input type="text" placeholder="title" {...register("title")} />
    <input type="text" placeholder="content" {...register("content")} />
  </>
);

const TodoDisplay = ({
  title,
  content,
  onTitleClick,
}: {
  title: string;
  content: string;
  onTitleClick: () => void;
}) => (
  <>
    <span onClick={onTitleClick} className="hover:font-bold cursor-pointer">
      {title}
    </span>
    <span>{content}</span>
  </>
);

const TodoActions = ({
  isEditMode,
  onEditClick,
  onCancelClick,
  isDisabled,
  todoId,
}: {
  isEditMode: boolean;
  onEditClick: () => void;
  onCancelClick: () => void;
  isDisabled: boolean;
  todoId: string;
}) => (
  <>
    <button type="button" onClick={onEditClick} disabled={isDisabled}>
      {isEditMode ? "Save" : "Edit"}
    </button>
    {isEditMode && <button onClick={onCancelClick}>Cancel</button>}
    <DeleteTodoButton id={todoId} />
  </>
);
