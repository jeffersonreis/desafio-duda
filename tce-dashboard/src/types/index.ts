export interface CompraEstado {
  Processo: string;
  ValorProcesso: number;
  Objeto: string;
  Afastamento: string;
  AnoProcesso: string;
  DataAprovacao: string;
  EnquadramentoLegal: string;
  Unidade: string;
  FornecedorVencedor: string;
  Item: string;
  Quantidade: string;
  UnidadeMedida: string;
  ValorUnitario: number;
}

export interface CompraMunicipio {
  Periodo: string;
  NumeroInterno: number;
  UnidadeGestora: string;
  ProcessoAdministrativo: string;
  Valor: number;
  DataAto: string;
  NomeRazaoSocial: string;
  Objeto: string;
  // ... outros campos relevantes
}

export interface CompraDetalhes {
  Processo?: string;
  ProcessoAdministrativo?: string;
  ValorProcesso?: number;
  Valor?: number;
  Objeto?: string;
  DataAto?: string;
  DataAprovacao?: string;
  DataPublicacao?: string;
  DataAssinaturaContrato?: string;
  DataSituacao?: string;
  Situacao?: string;
  FornecedorVencedor?: string;
  NomeRazaoSocial?: string;
  CPFCNPJ?: string;
  TipoPessoa?: string;
  Unidade?: string;
  UnidadeGestora?: string;
  NomeOrdenador?: string;
  CPFOrdenador?: string;
  EnquadramentoLegal?: string;
  FundamentacaoLegal?: string;
  Afastamento?: string;
  Tipologia?: string;
  NumeroContrato?: string;
  VeiculoComunicacao?: string;
}
