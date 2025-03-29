import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, TableSortLabel } from '@mui/material';

interface ComprasListProps {
  data: any[];
  isLoading: boolean;
  page: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rowsPerPage: number) => void;
  total: number;
  tipoCompra: 'estado' | 'municipio';
}

export function ComprasList({ data, isLoading, page, rowsPerPage, onPageChange, onRowsPerPageChange, total, tipoCompra }: ComprasListProps) {
  const [orderBy, setOrderBy] = useState<string>('');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (!data || data.length === 0) {
    return <div>Nenhum dado encontrado.</div>;
  }

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedData = orderBy
    ? [...data].sort((a, b) => {
        const aValue = a[orderBy];
        const bValue = b[orderBy];
        if (aValue < bValue) return order === 'asc' ? -1 : 1;
        if (aValue > bValue) return order === 'asc' ? 1 : -1;
        return 0;
      })
    : data;

  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={orderBy === (tipoCompra === 'estado' ? 'Processo' : 'AnoProcesso')}
                  direction={orderBy === (tipoCompra === 'estado' ? 'Processo' : 'AnoProcesso') ? order : 'asc'}
                  onClick={() => handleRequestSort(tipoCompra === 'estado' ? 'Processo' : 'AnoProcesso')}
                >
                  Processo/Ano
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === (tipoCompra === 'estado' ? 'ValorProcesso' : 'ValorTotalCompra')}
                  direction={orderBy === (tipoCompra === 'estado' ? 'ValorProcesso' : 'ValorTotalCompra') ? order : 'asc'}
                  onClick={() => handleRequestSort(tipoCompra === 'estado' ? 'ValorProcesso' : 'ValorTotalCompra')}
                >
                  Valor
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'Objeto'}
                  direction={orderBy === 'Objeto' ? order : 'asc'}
                  onClick={() => handleRequestSort('Objeto')}
                >
                  Objeto
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === (tipoCompra === 'estado' ? 'FornecedorVencedor' : 'Fornecedor')}
                  direction={orderBy === (tipoCompra === 'estado' ? 'FornecedorVencedor' : 'Fornecedor') ? order : 'asc'}
                  onClick={() => handleRequestSort(tipoCompra === 'estado' ? 'FornecedorVencedor' : 'Fornecedor')}
                >
                  Fornecedor
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{tipoCompra === 'estado' ? row.Processo : row.AnoProcesso}</TableCell>
                <TableCell>
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
                    .format(tipoCompra === 'estado' ? row.ValorProcesso : row.ValorTotalCompra)}
                </TableCell>
                <TableCell>{row.Objeto}</TableCell>
                <TableCell>{tipoCompra === 'estado' ? row.FornecedorVencedor : row.Fornecedor}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={total}
        page={page}
        onPageChange={(_, newPage) => onPageChange(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(event) => onRowsPerPageChange(parseInt(event.target.value, 10))}
      />
    </Paper>
  );
}
