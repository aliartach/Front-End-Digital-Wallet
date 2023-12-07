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

export default function StickyHeadTable({ rows }) {
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
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  {columns.map((column) => (
                    <TableCell key={column.id} align={column.align}>
                      {column.id === "senderEmail"
                        ? row.sender?.email || "N/A" // Accessing nested sender email property
                        : column.id === "receiverEmail"
                        ? row.receiver?.email || "N/A"
                        : column.id === "promotion"
                        ? row.promotion?.promoCode || "N/A"
                        : row[column.id] || "N/A"}
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
