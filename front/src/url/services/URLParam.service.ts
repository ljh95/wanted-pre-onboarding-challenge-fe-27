export class URLParamService {
  constructor(private params: URLSearchParams) {}

  getTodoFilters(): TodoFilterType {
    const filters = {
      sort: (this.params.get("sort") as TodoFilterType["sort"]) || "",
      order: (this.params.get("order") as TodoFilterType["order"]) || "",
      priorityFilter:
        (this.params.get(
          "priorityFilter"
        ) as TodoFilterType["priorityFilter"]) || "",
      keyword: this.params.get("keyword") || undefined,
      countOnly:
        this.params.get("countOnly") === "true"
          ? true
          : this.params.get("countOnly") === "false"
          ? false
          : undefined,
    };

    return Object.fromEntries(
      Object.entries(filters).filter(([, value]) => {
        if (value === undefined || value === "") {
          return false;
        }
        return true;
      })
    ) as Partial<TodoFilterType>;
  }
}
