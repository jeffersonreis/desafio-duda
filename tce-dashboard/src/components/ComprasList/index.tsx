import { useState } from 'react';
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
  tipoDados: 'normal' | 'covid';
}

export function ComprasList({ data, isLoading, page, rowsPerPage, onPageChange, onRowsPerPageChange, total, tipoCompra, tipoDados }: ComprasListProps) {
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

  const getColumnConfig = () => {
    if (tipoDados === 'normal') {
      return [
        { id: tipoCompra === 'estado' ? 'Processo' : 'AnoProcesso', label: 'Processo/Ano' },
        { id: tipoCompra === 'estado' ? 'ValorProcesso' : 'ValorTotalCompra', label: 'Valor' },
        { id: 'Objeto', label: 'Objeto' },
        { id: tipoCompra === 'estado' ? 'FornecedorVencedor' : 'Fornecedor', label: 'Fornecedor' },
      ];
    } else {
      return [
        { id: 'ProcessoAdministrativo', label: 'Processo' },
        { id: 'Valor', label: 'Valor' },
        { id: 'Objeto', label: 'Objeto' },
        { id: 'NomeRazaoSocial', label: 'Fornecedor' },
      ];
    }
  };

  const columns = getColumnConfig();

  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id}>
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={orderBy === column.id ? order : 'asc'}
                    onClick={() => handleRequestSort(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData.map((row, index) => (
              <TableRow key={index}>
                {columns.map((column) => (
                  <TableCell key={column.id}>
                    {column.id.includes('Valor') 
                      ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(row[column.id])
                      : row[column.id]}
                  </TableCell>
                ))}
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