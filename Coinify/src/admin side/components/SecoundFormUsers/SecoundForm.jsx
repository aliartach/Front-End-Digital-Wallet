import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import "./SecoundForm.css";

const columns = [
  { id: "firstName", label: "First Name", minWidth: 130 },
  { id: "lastName", label: "Last Name", minWidth: 130 },
  { id: "email", label: "Email", minWidth: 130, align: "right" },
  { id: "phone", label: "Phone Number", minWidth: 130, align: "right" },
  { id: "balanceUSD", label: "Balance USD", minWidth: 130, align: "right" },
  {
    id: "balanceUSDT",
    label: "Balance USDT",
    minWidth: 130,
    align: "right",
  },
  { id: "verified", label: "Verified", minWidth: 130, align: "right" },
];

export default function StickyHeadTableUSers({ rows }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className="Paper" sx={{ width: "95%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 690 }}>
        <Table className="Table" stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow className="Cloumns"  hover role="checkbox" tabIndex={-1}>
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id} className="TableBodyRow">
                  {columns.map((column) => (
                    <TableCell key={column.id} align={column.align}>
                      {column.id === "firstName"
                        ? row.firstName || "N/A" 
                        : column.id === "lastName"
                        ? row.lastName || "N/A"
                        : column.id === "email"
                        ? row.email || "N/A"
                        : column.id === "phone"
                        ? row.phone || "N/A"
                        : column.id === "balanceUSD"
                        ? row.balanceUSD || "N/A"
                        : column.id === "balanceUSDT"
                        ? row.balanceUSDT || "N/A"
                        : column.id === "verified"
                        ? row.verified ? "Verified" : "N/A"
                        : row[column.id] || "N/A" 
                  }
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
