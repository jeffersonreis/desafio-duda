const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

app.use(cors());

const API_BASE_URL = 'https://dados.tcerj.tc.br/api/v1';

const makeApiRequest = async (url, params, res) => {
  try {
    const response = await axios.get(url, { params });
    res.json(response.data);
  } catch (error) {
    console.error('Erro na requisição:', error.message);
    res.status(500).json({ error: 'Erro ao acessar a API' });
  }
};

app.get('/api/compras_diretas_estado', (req, res) => {
  const url = `${API_BASE_URL}/compras_diretas_estado`;
  makeApiRequest(url, req.query, res);
});

app.get('/api/compras_diretas_municipio', (req, res) => {
  const url = `${API_BASE_URL}/compras_diretas_municipio`;
  makeApiRequest(url, req.query, res);
});

app.get('/api/compras_covid_estado', (req, res) => {
  const url = `${API_BASE_URL}/compras_covid_estado`;
  makeApiRequest(url, req.query, res);
});

app.get('/api/compras_covid_municipio', (req, res) => {
  const url = `${API_BASE_URL}/compras_covid_municipio`;
  makeApiRequest(url, req.query, res);
});

app.get('/', (req, res) => {
  res.send('Servidor proxy está funcionando!');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor proxy rodando na porta ${PORT}`);
});
