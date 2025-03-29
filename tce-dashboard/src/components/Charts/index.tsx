import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ChartsProps {
  data: any[];
  tipoCompra: 'estado' | 'municipio';
}

export function Charts({ data, tipoCompra }: ChartsProps) {
  const chartData = data.slice(0, 5).map(item => ({
    nome: tipoCompra === 'estado' ? item.Processo : item.AnoProcesso,
    valor: tipoCompra === 'estado' ? item.ValorProcesso : item.ValorTotalCompra
  }));

  return (
    <div style={{ width: '100%', height: 300 }}>
      <h2>Top 5 Compras por Valor</h2>
      <ResponsiveContainer>
        <BarChart
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="nome" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="valor" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
