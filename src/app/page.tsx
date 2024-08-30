import styles from "./page.module.scss";
import { RawDataRow, TableRow } from "@/app/types";
import { transformRawDataToTable } from "./utils";
import Table from "./components/Table";

export default async function Home() {
  const response = await fetch("http://localhost:3000/api/table-data");
  const data: RawDataRow[] = await response.json();
  const transformedData: TableRow[] = transformRawDataToTable(data);
  return (
    <div className={styles.container}>
      <h1>HockeyStack Test Table</h1>
      <Table data={transformedData} />
    </div>
  );
}
