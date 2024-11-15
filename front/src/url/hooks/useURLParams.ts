import { useCallback, useMemo } from "react";
import { URLParamService } from "../services/URLParam.service";
import { useSearchParams } from "react-router-dom";

export const useURLParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = useMemo(() => {
    const service = new URLParamService(searchParams);
    return service.getTodoFilters();
  }, [searchParams]);

  const updateFilter = useCallback(
    <K extends keyof TodoFilterType>(key: K, value: TodoFilterType[K]) => {
      setSearchParams((prev) => {
        // 빈 값이나 undefined는 파라미터에서 제거
        if (value === undefined || value === "" || value === false) {
          prev.delete(key);
        } else {
          prev.set(key, String(value));
        }
        return prev;
      });
    },
    [setSearchParams]
  );

  return {
    searchParams,
    setSearchParams,
    filters,
    updateFilter,
  };
};
