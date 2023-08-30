import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./datatable.css";

export default function DataTable({ rows, columns }) {
  return (
    <div className="table">
      <DataGrid
        sx={{
          width: { xs: "300px", sm: "500px", md: "600px", lg: "100%" },
         
        }}
        rows={rows}
        columns={columns}
        pcapacitySize={[10]}
        // checkboxSelection
        disableSelectionOnClick
        getRowId={(row) => row.id}
        autoHeight
        {...rows}
        // rowsPerPageOptions={[10]}
      />
    </div>
  );
}
