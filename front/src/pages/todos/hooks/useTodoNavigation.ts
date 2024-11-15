import { useNavigate, useSearchParams } from "react-router-dom";
import { ROUTES } from "../../../router/const/routes.const";

export const useTodoNavigation = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const goToDetail = (todoId: string) => {
    const newSearchParams = new URLSearchParams(searchParams);

    newSearchParams.set("id", todoId);

    navigate(`${ROUTES.TODOS}?${newSearchParams.toString()}`);
  };

  return {
    goToDetail,
  };
};
