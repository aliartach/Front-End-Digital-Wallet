import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./usersForm.css";


export default function UsersForm({ rows }) {
  return (
    <TableContainer className="table" component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="Headers">id</TableCell>
            <TableCell className="Headers" align="right">
              First Name
            </TableCell>
            <TableCell className="Headers" align="right">
              Last Name
            </TableCell>
            <TableCell className="Headers" align="right">
              Email
            </TableCell>
            <TableCell className="Headers" align="right">
              Phone
            </TableCell>
            <TableCell className="Headers" align="right">
              Balance USD
            </TableCell>
            <TableCell className="Headers" align="right">
              Balance USDT
            </TableCell>
            <TableCell className="Headers" align="right">
              Verified
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
              <TableCell align="right">{row.firstName}</TableCell>
              <TableCell align="right">{row.lastName}</TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.phone}</TableCell>
              <TableCell align="right">{row.balanceUSD}</TableCell>
              <TableCell align="right">{row.balanceUSDT}</TableCell>
              <TableCell align="right">
                {row.verified ? "Verified" : "Not Verified"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
