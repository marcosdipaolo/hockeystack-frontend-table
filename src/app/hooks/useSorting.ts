import { TableRow } from "../types";

const sort = (
  left: string | number,
  right: string | number,
  direction: string,
) => {
  if (direction === "asc") {
    return parseInt(String(left)) - parseInt(String(right));
  }
  return parseInt(String(right)) - parseInt(String(left));
}

const useSorting = (
  tableData: TableRow[],
  sortingField: keyof TableRow | "",
  sortDirection: "asc" | "desc" | ""
): TableRow[] => {
  if (!sortingField || sortDirection === "" || sortingField === "url") return tableData;

  return [...tableData].sort((a, b) => {
    let leftValue: string | number = a[sortingField];
    let rightValue: string | number = b[sortingField];

    if (
      new Set<string>(["scroll", "bounce"]).has(sortingField) &&
      typeof leftValue === "string" &&
      typeof rightValue === "string"
    ) {
      leftValue = parseInt(leftValue.replace("%", ""));
      rightValue = parseInt(rightValue.replace("%", ""));
    }

    return sort(leftValue, rightValue, sortDirection);
  });
};

export default useSorting;
