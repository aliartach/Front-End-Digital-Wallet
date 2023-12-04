import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./promotionsForm.css";

export default function PromotionsForm({ rows }) {
  return (
    <TableContainer className="table" component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="Headers">id</TableCell>
            <TableCell className="Headers" align="right">
              Merchant
            </TableCell>
            <TableCell className="Headers" align="right">
              Description{" "}
            </TableCell>
            <TableCell className="Headers" align="right">
              Percentage
            </TableCell>
            <TableCell className="Headers" align="right">
              Promo Code
            </TableCell>
            <TableCell className="Headers" align="right">
              Start Date{" "}
            </TableCell>
            <TableCell className="Headers" align="right">
              End Date{" "}
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
                {row.id}
              </TableCell>
              <TableCell align="right">{row.user.email}</TableCell>
              <TableCell align="right">{row.description}</TableCell>
              <TableCell align="right">{row.percentage}%</TableCell>
              <TableCell align="right">{row.promoCode}</TableCell>
              <TableCell align="right">{row.startDate}</TableCell>
              <TableCell align="right">{row.endDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
