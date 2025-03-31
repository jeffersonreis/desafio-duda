import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ChartsProps {
  data: any[];
  tipoCompra: 'estado' | 'municipio';
  tipoDados: 'normal' | 'covid';
}

export function Charts({ data, tipoCompra, tipoDados }: ChartsProps) {
  const formatChartData = () => {
    if (tipoDados === 'normal') {
      return data.slice(0, 5).map(item => ({
        nome: tipoCompra === 'estado' ? item.Processo : item.AnoProcesso,
        valor: tipoCompra === 'estado' ? item.ValorProcesso : item.ValorTotalCompra
      }));
    } else {
      // Para dados COVID
      const uniqueProcessos = Array.from(new Set(data.map(item => item.ProcessoAdministrativo)));
      return uniqueProcessos.slice(0, 5).map(processo => {
        const itensProcesso = data.filter(item => item.ProcessoAdministrativo === processo);
        const valorTotal = itensProcesso.reduce((sum, item) => sum + (item.Valor || 0), 0);
        
        return {
          nome: processo,
          valor: valorTotal
        };
      });
    }
  };

  const chartData = formatChartData();

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
          <XAxis 
            dataKey="nome"
            tick={{ fontSize: 12 }}
            interval={0}
            angle={-45}
            textAnchor="end"
            height={100}
          />
          <YAxis />
          <Tooltip
            formatter={(value: number) => 
              new Intl.NumberFormat('pt-BR', { 
                style: 'currency', 
                currency: 'BRL' 
              }).format(value)
            }
          />
          <Legend />
          <Bar 
            dataKey="valor" 
            fill="#8884d8"
            name="Valor"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
