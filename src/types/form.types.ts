export const REGIOES = [
  "Norte",
  "Nordeste",
  "Centro-Oeste",
  "Sudeste",
  "Sul",
] as const;

export type Regiao = (typeof REGIOES)[number];

export const MODELO_COBRANCA_CONCESSAO = [
  "Cobrança Direta",
  "Cobrança com Cofaturamento",
] as const;

export type ModeloCobranca = (typeof MODELO_COBRANCA_CONCESSAO)[number];

export const MODELO_INICIAL_COBRANCA = ["Taxa", "Tarifa"] as const;

export type ModeloInicialCobranca = (typeof MODELO_INICIAL_COBRANCA)[number];

export const MODELO_FINAL_COBRANCA = ["Taxa", "Tarifa"] as const;

export type ModeloFinalCobranca = (typeof MODELO_FINAL_COBRANCA)[number];

export const ANOS_TRANSICAO_MODELO_COBRANCA = Array.from(
  { length: 20 },
  (_, i) => (i + 1).toString() + "º ano"
);

export type AnosTransicaoModeloCobranca =
  (typeof ANOS_TRANSICAO_MODELO_COBRANCA)[number];

export const ANOS_INICIO = Array.from({ length: 20 }, (_, i) =>
  (2026 + i).toString()
);

export type AnosInicio = (typeof ANOS_INICIO)[number];

export const TIPOLOGIA_FATURAMENTO = [
  "Fatura Física",
  "Fatura Digital",
  "Ambas",
] as const;

export type TipologiaFaturamento = (typeof TIPOLOGIA_FATURAMENTO)[number];

export const SETORES_EMPRESA = [
  "atendimento-comercial",
  "faturamento-leitura-medicao",
  "cobranca-negociacao",
  "cadastro-contratos",
  "controles-indicadores",
  "tecnologia-informacao",
  "compliance-auditoria-interna",
  "treinamento-desenvolvimento",
] as const;
export type SetorEmpresa = (typeof SETORES_EMPRESA)[number];

export const SETORES_LABELS: Record<SetorEmpresa, string> = {
  "atendimento-comercial": "Atendimento Comercial",
  "faturamento-leitura-medicao": "Faturamento, Leitura e Medição",
  "cobranca-negociacao": "Cobrança e Negociação",
  "cadastro-contratos": "Cadastro e Contratos",
  "controles-indicadores": "Controles e Indicadores",
  "tecnologia-informacao": "Tecnologia de Informação",
  "compliance-auditoria-interna": "Compliance e Auditoria Interna",
  "treinamento-desenvolvimento": "Treinamento e Desenvolvimento",
};

export const BASE_PREÇO_MEDIO = [
  "ABLP (Valoriza Resíduos)",
  "UVS São Carlos",
] as const;

export type BasePrecoMedio = (typeof BASE_PREÇO_MEDIO)[number];
