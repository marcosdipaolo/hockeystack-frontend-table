import { TableRow } from "../types";

const usePagination = (
  perPage: number,
  currentPage: number,
  tableData: TableRow[],
) => {
  const startIndex = (currentPage - 1) * perPage;
  return tableData.slice(startIndex, startIndex + perPage);
}

export default usePagination;