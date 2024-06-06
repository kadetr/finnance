import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Trade } from '../types/trade';

interface SymbolDataTableProps {
  wsData: Trade | null | undefined;
}

const SymbolDataTable: React.FC<SymbolDataTableProps> = ({
  wsData,
}: SymbolDataTableProps) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <TableContainer component={Paper} sx={{ width: 600, display: 'flex' }}>
        <Table
          sx={{ maxWidth: 600 }}
          size='small'
          aria-label='live symbol table'
        >
          <TableHead>
            <TableRow>
              <TableCell align='center'>Symbol</TableCell>
              <TableCell align='center'>Price</TableCell>
              <TableCell align='center'>Volume</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {wsData && (
              <TableRow
                key={wsData.symbol}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align='center'>{wsData.symbol}</TableCell>
                <TableCell align='center'>{wsData.price}</TableCell>
                <TableCell align='center'>{wsData.volume}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default SymbolDataTable;
