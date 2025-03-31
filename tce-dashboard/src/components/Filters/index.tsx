import { FormControl, InputLabel, Select, MenuItem, Grid } from '@mui/material';

interface FiltersProps {
  tipoCompra: 'estado' | 'municipio';
  tipoDados: 'normal' | 'covid';
  onTipoCompraChange: (tipo: 'estado' | 'municipio') => void;
  onTipoDadosChange: (tipo: 'normal' | 'covid') => void;
}

export function Filters({ tipoCompra, tipoDados, onTipoCompraChange, onTipoDadosChange }: FiltersProps) {
  return (
    <Grid container spacing={2} alignItems="flex-end">
      <Grid size={{ xs: 12, md: 6 }}>
        <FormControl fullWidth>
          <InputLabel id="tipo-compra-label">Tipo de Compra</InputLabel>
          <Select
            labelId="tipo-compra-label"
            value={tipoCompra}
            onChange={(e) => onTipoCompraChange(e.target.value as 'estado' | 'municipio')}
          >
            <MenuItem value="estado">Estado</MenuItem>
            <MenuItem value="municipio">Município</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <FormControl fullWidth>
          <InputLabel id="tipo-dados-label">Tipo de Dados</InputLabel>
          <Select
            labelId="tipo-dados-label"
            value={tipoDados}
            onChange={(e) => onTipoDadosChange(e.target.value as 'normal' | 'covid')}
          >
            <MenuItem value="normal">Normal</MenuItem>
            <MenuItem value="covid">COVID</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
}
