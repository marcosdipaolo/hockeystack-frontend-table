import { ChangeEvent, FC, useCallback, useMemo, useState } from "react";
import styles from "./Table.module.scss";
import usePagination from "../hooks/usePagination";
import useSorting from "../hooks/useSorting";
import { TableRow } from "../types";
import classnames from "classnames";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const perPage = 10;

const NativeTable: FC<{ data: TableRow[] }> = ({ data }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortingField, setSortingField] = useState<keyof TableRow | "">("");
  const [sortingDirection, setSortingDirection] = useState<"asc" | "desc" | "">("");
  const [isInputPageError, setIsInputPageError] = useState<boolean>(false);
  const sorted = useSorting(data, sortingField, sortingDirection);
  const paginated = usePagination(perPage, currentPage, sorted);

  const changeSortingDirection = useCallback((innerField: string) => {
    if (innerField !== sortingField) {
      setSortingDirection("asc");
      return
    }
    switch (sortingDirection) {
      case "":
        setSortingDirection("asc");
        return;
      case "asc":
        setSortingDirection("desc");
        return;
      case "desc":
      default:
        setSortingDirection("");
    }
  }, [sortingDirection, sortingField])

  const resolveCaret = useCallback(() => {
    return sortingDirection === "asc" ? <KeyboardArrowUpIcon /> : (sortingDirection === "" ? "" : <KeyboardArrowDownIcon />);
  }, [sortingDirection]);

  const totalPages = useMemo(
    () => Math.ceil(sorted.length / perPage),
    [sorted]
  );

  const handlePageInput = (e: ChangeEvent<HTMLInputElement>) => {
    setIsInputPageError(false);
    const value = parseInt(e.target.value);
    if (value > totalPages || !(value >= 1)) {
      setCurrentPage(1);
      if (e.target.value !== "") {
        setIsInputPageError(true);
      }
      return;
    }
    setCurrentPage(value);
  }

  const sortingHandler = useCallback((field: keyof TableRow) => {
    changeSortingDirection(field);
    setSortingField(field);
  }, [setSortingField, changeSortingDirection])

  return (
    <section className={styles.outterContainer}>
      <div className={styles.navControls}>
        <div className={styles.skipToPage}>
          <span style={{ display: isInputPageError ? "inline" : "none" }}>Invalid value. Defaulting to page 1.</span>
          Enter Page &nbsp;
          <input onChange={handlePageInput} type="number" />
        </div>
        <div className={styles.currentPage}>
          <span
            onClick={() => setCurrentPage(currentPage - 1)}
            className={classnames(styles.caretLeft, { [styles.hide]: currentPage <= 1 })}
          >
            &#x2039;
          </span>
          <span className={styles.currentPageValue}>{currentPage}</span>
          <span
            onClick={() => setCurrentPage(currentPage + 1)}
            className={classnames(styles.caretRight, { [styles.hide]: currentPage >= totalPages })}
          >
            &#x203A;
          </span>
        </div>
      </div>
      <main className={styles.tableContainer}>
        <table className={styles.hockeyStack}>
          <thead>
            <tr>
              {(Object.keys(paginated[0]) as (keyof TableRow)[]).map((field, index: number) => (
                <th
                  onClick={() => sortingHandler(field)}
                  className={index === 0 ? styles.url : ""}
                  key={field}
                >
                  {field}
                  <span>{sortingField === field && resolveCaret()}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginated.map((row: TableRow, index: number) => {
              const rowKeys = Object.keys(row) as (keyof TableRow)[];
              return (
                <tr key={`row-${index}`}>
                  {rowKeys.map((field: keyof TableRow, innerIndex: number) => (
                    <td className={innerIndex === 0 ? styles.url : ""} key={field}><div>{row[field]}</div></td>
                  ))}
                </tr>);
            })}
          </tbody>
        </table>
      </main>
    </section>
  )
};

export default NativeTable;