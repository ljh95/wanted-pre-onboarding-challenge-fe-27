import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useURLParams } from "../../../url/hooks/useURLParams";
import { TODO_QUERY_KEYS } from "../const/todo.const";

const schema = z.object({
  sort: z
    .union([
      z.literal(""),
      z.literal("createdAt"),
      z.literal("updatedAt"),
      z.literal("priority"),
    ])
    .optional(),
  order: z
    .union([z.literal(""), z.literal("asc"), z.literal("desc")])
    .optional(),
  priorityFilter: z
    .union([
      z.literal(""),
      z.literal("urgent"),
      z.literal("normal"),
      z.literal("low"),
    ])
    .optional(),
  keyword: z.string().optional(),
  countOnly: z
    .union([z.literal(""), z.literal("true"), z.literal("false")])
    .optional(),
});

export const TodoFilter = () => {
  const { searchParams, setSearchParams } = useURLParams();

  const { register, handleSubmit } = useForm<TodoFilterType>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      sort: (searchParams.get("sort") as TodoFilterType["sort"]) || "",
      order: (searchParams.get("order") as TodoFilterType["order"]) || "",
      priorityFilter:
        (searchParams.get(
          "priorityFilter"
        ) as TodoFilterType["priorityFilter"]) || "",
      keyword: searchParams.get("keyword") || undefined,
      countOnly: searchParams.get("countOnly") === "true",
    },
  });

  const queryClient = useQueryClient();

  const onSubmit = handleSubmit((data) => {
    setSearchParams((prev) => {
      // 기존의 모든 파라미터를 객체로 변환
      const currentParams = Object.fromEntries(prev.entries());

      // 새로운 데이터에서 빈 값 필터링
      const newParams = Object.fromEntries(
        Object.entries(data)
          .filter(([, value]) => value !== "" && value !== undefined)
          .map(([key, value]) => [
            key,
            typeof value === "boolean" ? value.toString() : value,
          ])
      );

      // 기존 파라미터와 새로운 파라미터 합치기
      const mergedParams = {
        ...currentParams,
        ...newParams,
      };

      return mergedParams;
    });

    queryClient.invalidateQueries({ queryKey: TODO_QUERY_KEYS.lists() });
  });

  return (
    <div>
      <p>Filter: </p>

      <form className="flex gap-[10px] items-center" onSubmit={onSubmit}>
        <select {...register("sort")}>
          <option value="">none</option>
          <option value="createAt">createAt</option>
          <option value="updatedAt">updatedAt</option>
          <option value="priority">priority</option>
        </select>

        <select {...register("order")}>
          <option value="">none</option>
          <option value="asc">asc</option>
          <option value="desc">desc</option>
        </select>

        <select {...register("priorityFilter")}>
          <option value="">none</option>
          <option value="urgent">urgent</option>
          <option value="normal">normal</option>
          <option value="low">low</option>
        </select>

        <input
          {...register("keyword")}
          placeholder="keyword"
          className="p-1 pl-2 border rounded-[4px]"
        />

        <select {...register("countOnly")}>
          <option value="">none</option>
          <option value="true">true</option>
          <option value="false">false</option>
        </select>

        <button type="submit">filter</button>
      </form>
    </div>
  );
};
