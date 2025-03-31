import { useQuery } from '@tanstack/react-query';
import { getComprasEstado, getComprasMunicipio, getComprasCovidEstado, getComprasCovidMunicipio } from '../services/api';

export function useCompras(
  tipoCompra: 'estado' | 'municipio',
  tipoDados: 'normal' | 'covid',
  params: { inicio: number; limite: number }
) {
  const { inicio, limite } = params;

  return useQuery({
    queryKey: ['compras', tipoCompra, tipoDados, inicio, limite],
    queryFn: async () => {
      let data;
      if (tipoCompra === 'estado') {
        data = tipoDados === 'normal'
          ? await getComprasEstado(inicio, limite)
          : await getComprasCovidEstado(inicio, limite);
      } else {
        data = tipoDados === 'normal'
          ? await getComprasMunicipio(inicio, limite)
          : await getComprasCovidMunicipio(inicio, limite);
      }
      
      return {
        data: Array.isArray(data) ? data : (data.Compras || []),
        total: Array.isArray(data) ? data.length : (data.Count || 0)
      };
    }
  });
}
