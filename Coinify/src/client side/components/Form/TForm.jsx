import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./TForm.css";

export default function TransactionForm({ rows }) {
  return (
    <TableContainer className="table" component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="Headers">Date</TableCell>
            <TableCell className="Headers" align="right">
              TransactionId
            </TableCell>
            <TableCell className="Headers" align="right">
              Amount
            </TableCell>
            <TableCell className="Headers" align="right">
              Type
            </TableCell>
            <TableCell className="Headers" align="right">
              Sender Email
            </TableCell>
            <TableCell className="Headers" align="right">
              Receiver Email
            </TableCell>
            <TableCell className="Headers" align="right">
              Promotion
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id} // Assuming 'Date' is unique
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.createdAt.slice(0, 10)}
              </TableCell>
              <TableCell align="right">{row.id}</TableCell>
              <TableCell align="right">{row.amount}</TableCell>
              <TableCell align="right">{row.moneyType}</TableCell>
              <TableCell align="right">{row.sender.email}</TableCell>
              <TableCell align="right">{row.receiver.email}</TableCell>
              <TableCell align="right">
                {row.promotion?.promoCode || "N/A"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
