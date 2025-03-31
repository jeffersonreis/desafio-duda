import axios from 'axios';

const api = axios.create({
  // baseURL: 'https://dados.tcerj.tc.br/api/v1' // URL da API do TCE-RJ (Com problema de Cors)
  baseURL: 'http://localhost:3001/api' // Servidor local criado para bater na API do TCE-RJ e resolver o problema de Cors
});

export const getComprasEstado = async (inicio = 0, limite = 10) => {
  const response = await api.get(`/compras_diretas_estado?inicio=${inicio}&limite=${limite}`);
  return response.data;
};

export const getComprasMunicipio = async (inicio = 0, limite = 10) => {
  const response = await api.get(`/compras_diretas_municipio?inicio=${inicio}&limite=${limite}`);
  return response.data;
};

export const getComprasCovidEstado = async (inicio = 0, limite = 10) => {
  const response = await api.get(`/compras_covid_estado?inicio=${inicio}&limite=${limite}`);
  return response.data;
};

export const getComprasCovidMunicipio = async (
  ano: number,
  inicio = 0,
  limite = 10,
  municipio?: string
) => {
  const response = await api.get(`/compras_covid_municipio`, {
    params: { ano, inicio, limite, municipio }
  });
  return response.data;
};

export const getCompraDetails = async (id: string) => {
  const response = await api.get(`/compras_diretas_estado/${id}`);
  return response.data;
};
