import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

interface ChartsProps {
  data: any[];
  tipoCompra: 'estado' | 'municipio';
  tipoDados: 'normal' | 'covid';
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export function Charts({ data, tipoCompra, tipoDados }: ChartsProps) {
  const formatCurrency = (value: number) => 
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

  const formatChartData = () => {
    if (tipoDados === 'normal') {
      return data.slice(0, 5).map(item => ({
        nome: tipoCompra === 'estado' ? item.Processo : item.AnoProcesso,
        valor: tipoCompra === 'estado' ? item.ValorProcesso : item.ValorTotalCompra
      }));
    } else {
      const uniqueProcessos = Array.from(new Set(data.map(item => item.ProcessoAdministrativo)));
      return uniqueProcessos.slice(0, 5).map(processo => {
        const itensProcesso = data.filter(item => item.ProcessoAdministrativo === processo);
        const valorTotal = itensProcesso.reduce((sum, item) => sum + (item.Valor || 0), 0);
        return { nome: processo, valor: valorTotal };
      });
    }
  };

  const chartData = formatChartData();

  // Dados para o gráfico de pizza (distribuição por unidade gestora)
  const pieChartData = React.useMemo(() => {
    const unidadeCount = data.reduce((acc, item) => {
      const unidade = item.Unidade || item.UnidadeGestora;
      acc[unidade] = (acc[unidade] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(unidadeCount)
      .map(([name, value]) => ({ name, value: value as number }))
      .sort((a, b) => (b.value as number) - (a.value as number))
      .slice(0, 5);
  }, [data]);

  // Dados para o gráfico de linha (evolução temporal)
  const lineChartData = React.useMemo(() => {
    const dataMap = data.reduce((acc, item) => {
      const date = tipoDados === 'normal' 
        ? item.DataAprovacao || item.DataProcesso
        : item.DataAto;
      const valor = tipoDados === 'normal'
        ? (item.ValorProcesso || item.ValorTotalCompra)
        : item.Valor;
      if (date) {
        const formattedDate = new Date(date).toISOString().split('T')[0];
        acc[formattedDate] = (acc[formattedDate] || 0) + valor;
      }
      return acc;
    }, {});
    return Object.entries(dataMap)
      .map(([date, valor]) => ({ date, valor }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [data, tipoDados]);

  // Dados para o gráfico de barras horizontais (top fornecedores)
  const topFornecedores = React.useMemo(() => {
    const fornecedorMap = data.reduce((acc, item) => {
      const fornecedor = tipoDados === 'normal'
        ? (item.FornecedorVencedor || item.Fornecedor)
        : item.NomeRazaoSocial;
      const valor = tipoDados === 'normal'
        ? (item.ValorProcesso || item.ValorTotalCompra)
        : item.Valor;
      acc[fornecedor] = (acc[fornecedor] || 0) + valor;
      return acc;
    }, {});
    return Object.entries(fornecedorMap)
      .map(([name, value]) => ({ name, value: value as number }))
      .sort((a: { value: number }, b: { value: number }) => b.value - a.value)
      .slice(0, 5);
  }, [data, tipoDados]);

  return (
    <div style={{ width: '100%' }}>
      <h2>Top 5 Compras por Valor</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="nome" tick={{ fontSize: 12 }} interval={0} angle={-45} textAnchor="end" height={100} />
          <YAxis />
          <Tooltip formatter={(value) => formatCurrency(value as number)} />
          <Legend />
          <Bar dataKey="valor" fill="#8884d8" name="Valor" />
        </BarChart>
      </ResponsiveContainer>

      <h2>Distribuição por Unidade Gestora</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={pieChartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {pieChartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>

      <h2>Evolução Temporal das Compras</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={lineChartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip formatter={(value) => formatCurrency(value as number)} />
          <Legend />
          <Line type="monotone" dataKey="valor" stroke="#8884d8" name="Valor Total" />
        </LineChart>
      </ResponsiveContainer>

      <h2>Top 5 Fornecedores</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={topFornecedores} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" width={150} />
          <Tooltip formatter={(value) => formatCurrency(value as number)} />
          <Legend />
          <Bar dataKey="value" fill="#82ca9d" name="Valor Total" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
