import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../router/const/routes.const";

export const useTodoNavigation = () => {
  const navigate = useNavigate();

  const goToDetail = (todoId: string) => {
    const searchParams = new URLSearchParams();
    searchParams.append("id", todoId);
    navigate(`${ROUTES.TODOS}?${searchParams.toString()}`);
  };

  return {
    goToDetail,
  };
};
