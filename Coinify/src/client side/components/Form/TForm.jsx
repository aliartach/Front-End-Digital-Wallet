import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import '../TransactionForm/TForm.css';

function createData(Date, TransactionId, Amount, Type, ReferenceAccount, Reference, Status) {
  return { Date, TransactionId, Amount, Type, ReferenceAccount, Reference, Status };
}

const rows = [
  createData('28/11/2023', 159, 6.0, 24, 4.0, 'Sample Reference', 'Approved'),
  createData('28/11/2023', 237, 9.0, 37, 4.3, 'Sample Reference', 'Pending'),
  createData('28/11/2023', 262, 16.0, 24, 6.0, 'Sample Reference', 'Rejected'),
  createData('28/11/2023', 305, 3.7, 67, 4.3, 'Sample Reference', 'Approved'),
  createData('28/11/2023', 356, 16.0, 49, 3.9, 'Sample Reference', 'Pending'),
  createData('28/11/2023', 356, 16.0, 49, 3.9, 'Sample Reference', 'Rejected'),
  createData('28/11/2023', 356, 16.0, 49, 3.9, 'Sample Reference', 'Approved'),
];

export default function TransactionForm() {
  return (
    <TableContainer className='table' component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow >
            <TableCell className='Headers'>Date</TableCell>
            <TableCell className='Headers' align="right">TransactionId</TableCell>
            <TableCell className='Headers'align="right">Amount</TableCell>
            <TableCell className='Headers' align="right">Type</TableCell>
            <TableCell className='Headers' align="right">ReferenceAccount</TableCell>
            <TableCell className='Headers' align="right">Reference</TableCell>
            <TableCell className='Headers' align="right">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.Date} // Assuming 'Date' is unique
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.Date}
              </TableCell>
              <TableCell  align="right">{row.TransactionId}</TableCell>
              <TableCell  align="right">{row.Amount}</TableCell>
              <TableCell  align="right">{row.Type}</TableCell>
              <TableCell  align="right">{row.ReferenceAccount}</TableCell>
              <TableCell  align="right">{row.Reference}</TableCell>
              <TableCell  align="right">{row.Status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
