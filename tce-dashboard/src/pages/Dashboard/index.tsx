import { useState } from 'react';
import { Grid, Paper, Box } from '@mui/material';
import { ComprasList } from '../../components/ComprasList';
import { Filters } from '../../components/Filters';
import { Charts } from '../../components/Charts';
import { useCompras } from '../../hooks/useCompras';

export function Dashboard() {
  const [tipoCompra, setTipoCompra] = useState<'estado' | 'municipio'>('estado');
  const [tipoDados, setTipoDados] = useState<'normal' | 'covid'>('normal');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { data, isLoading } = useCompras(tipoCompra, tipoDados, {
    inicio: page * rowsPerPage,
    limite: rowsPerPage,
  });

  const comprasData = data?.data || [];
  const total = data?.total || 0;

  const handleTipoCompraChange = (novoTipo: 'estado' | 'municipio') => {
    setTipoCompra(novoTipo);
    setPage(0);
  };

  const handleTipoDadosChange = (novoTipo: 'normal' | 'covid') => {
    setTipoDados(novoTipo);
    setPage(0);
  };

  return (
    <Box 
      sx={{ 
        width: '100%', 
        padding: 3,
        marginTop: 2,
      }}
    >
      <Paper sx={{ width: '100%', mb: 3, p: 2 }}>
        <Filters
          tipoCompra={tipoCompra}
          tipoDados={tipoDados}
          onTipoCompraChange={handleTipoCompraChange}
          onTipoDadosChange={handleTipoDadosChange}
        />
      </Paper>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper sx={{ width: '100%', mb: 3 }}>
          <ComprasList
            data={comprasData}
            isLoading={isLoading}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={setPage}
            onRowsPerPageChange={setRowsPerPage}
            total={total}
            tipoCompra={tipoCompra}
            tipoDados={tipoDados}
          />
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ width: '100%', mb: 3, p: 2 }}>
            <Charts 
              data={comprasData} 
              tipoCompra={tipoCompra}
              tipoDados={tipoDados}
            />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
