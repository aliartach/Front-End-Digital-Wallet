import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import "../SecoundForm/SecoundForm.css";

const columns = [
  { id: "createdAt", label: "Date", minWidth: 130 },
  { id: "id", label: "TransactionId", minWidth: 130 },
  { id: "amount", label: "Amount", minWidth: 130, align: "right" },
  { id: "moneyType", label: "Type", minWidth: 130, align: "right" },
  { id: "senderEmail", label: "Sender Email", minWidth: 130, align: "right" },
  {
    id: "receiverEmail",
    label: "Receiver Email",
    minWidth: 130,
    align: "right",
  },
  { id: "promotion", label: "Promotion", minWidth: 130, align: "right" },
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [];

export default function StickyHeadTable() {
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
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 400 }}>
        <Table className="Table" stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <div key={row.id} className="table-row">
                          <div className="table-cell">{row.id}</div>
                          <div className="table-cell">{row.amount}</div>
                          <div className="table-cell">{row.moneyType}</div>
                          <div className="table-cell">{row.sender.email}</div>
                          <div className="table-cell">{row.receiver.email}</div>
                          <div className="table-cell">
                            {row.promotion?.promoCode || "N/A"}
                          </div>
                        </div>
                      );
                    })}
                  </TableRow>
                );
              })}
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
