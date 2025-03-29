import { useParams, useNavigate } from 'react-router-dom';
import { 
  Paper, 
  Grid, 
  Typography, 
  Box, 
  Chip, 
  Button,
  Divider,
  CircularProgress
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { ArrowBack } from '@mui/icons-material';
import { getCompraDetails } from '../../services/api';
import { DetailCard } from './components/DetailCard';
import { ProcessTimeline } from './components/ProcessTimeline';
import { DocumentsList } from './components/DocumentsList';
import { CompraDetalhes } from '../../types';

export function ComprasDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery<CompraDetalhes>({
    queryKey: ['compra', id],
    queryFn: () => getCompraDetails(id as string)
  });

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (!data) {
    return (
      <Box>
        <Typography>Compra não encontrada</Typography>
        <Button onClick={() => navigate('/')}>Voltar</Button>
      </Box>
    );
  }

  return (
    <Box>
      <Box display="flex" alignItems="center" gap={2} mb={3}>
        <Button 
          startIcon={<ArrowBack />} 
          onClick={() => navigate('/')}
        >
          Voltar
        </Button>
        <Typography variant="h5">Detalhes da Compra</Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Informações Principais */}
        <Grid size={12}>
          <Paper sx={{ p: 3 }}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="h6" gutterBottom>
                  {data.Objeto}
                </Typography>
                <Chip 
                  label={data.Situacao} 
                  color={data.Situacao === 'Aprovado' ? 'success' : 'default'}
                  sx={{ mb: 2 }}
                />
                <Typography variant="body1" color="text.secondary">
                  Processo: {data.Processo || data.ProcessoAdministrativo}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Box textAlign="right">
                  <Typography variant="h4" color="primary">
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    }).format(data.ValorProcesso || data.Valor || 0)}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Data de Aprovação: {(data.DataAprovacao || data.DataAto) ? new Date(data.DataAprovacao || data.DataAto as string).toLocaleDateString() : 'N/A'}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Cards de Detalhes */}
        <Grid size={{ xs: 12, md: 4 }}>
          <DetailCard
            title="Fornecedor"
            content={{
              Nome: data.FornecedorVencedor || data.NomeRazaoSocial || '',
              CNPJ: data.CPFCNPJ || '',
              Tipo: data.TipoPessoa || ''
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <DetailCard
            title="Unidade Gestora"
            content={{
              Nome: data.Unidade || data.UnidadeGestora || '',
              Ordenador: data.NomeOrdenador || '',
              'CPF Ordenador': data.CPFOrdenador || ''
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <DetailCard
            title="Informações Legais"
            content={{
              'Enquadramento Legal': data.EnquadramentoLegal || data.FundamentacaoLegal || '',
              Afastamento: data.Afastamento || '',
              Tipologia: data.Tipologia || ''
            }}
          />
        </Grid>

        {/* Timeline do Processo */}
        <Grid size={{ xs: 12 }}>
          <ProcessTimeline data={data} />
        </Grid>

        {/* Lista de Documentos */}
        <Grid size={{ xs: 12 }}>
          <DocumentsList data={data} />
        </Grid>
      </Grid>
    </Box>
  );
}
