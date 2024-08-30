'use client';

import { FC, useState } from "react";
import { TableRow } from "../types";
import { Switch } from "@mui/material";
import MaterialTable from "./MaterialTable";
import NativeTable from "./NativeTable";

const TableWrapper: FC<{ data: TableRow[] }> = ({ data }) => {
  const [isMaterialTable, setIsMaterialTable] = useState<boolean>(false);
  if (!data?.length) {
    return <div>No data available</div>;
  }
  return (
    <div>
      <Switch onChange={(e) => { setIsMaterialTable(!isMaterialTable) }} /> <span>Material UI Table</span>
      {isMaterialTable ? <MaterialTable data={data} /> : <NativeTable data={data} />}
    </div>
  )
};

export default TableWrapper;
