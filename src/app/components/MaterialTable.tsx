import * as React from 'react';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { TableRow } from '../types';
import styles from "./Table.module.scss";

const MaterialTable: React.FC<{ data: TableRow[] }> = ({ data }) => {
  if (!data?.length) return;
  const rows: GridRowsProp<TableRow> = data.map((row, index) => {
    let innerRow = {
      id: index + 1,
      ...row,
    }
    return innerRow;
  });

  const columns: GridColDef[] = Object.keys(data[0]).map((key) => {
    let column: GridColDef = {
      field: key,
      headerName: key.toUpperCase(),
      flex: 1,
      sortable: true,
    }
    if (key === 'url') {
      column = {
        ...column,
        flex: 3,
        renderCell: (params) => (
          <a href={`https://${params.row.url.props.href}`} target='_blank'>{params.row.url.props.href}</a>
        ),
        cellClassName: styles.materialUrl,
        sortComparator: (a, b) => {
          let leftValue: JSX.Element = a.props.href;
          let rightValue: JSX.Element = b.props.href;
          const sorted = [leftValue, rightValue].sort();
          return sorted[0] === leftValue ? -1 : 1;
        }
      }
    }
    if (key === 'scroll' || key === 'bounce') {
      column = {
        ...column,
        sortComparator: (a, b) => parseInt(a.replace("%", "")) - parseInt(b.replace("%", ""))
      }
    }
    return column;
  });

  return (
    <div style={{ marginTop: '2.8rem' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10, 20, 50, 100]}
      />
    </div>
  );
}

export default MaterialTable;