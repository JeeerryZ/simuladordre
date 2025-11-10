import {
  AnosInicio,
  AnosTransicaoModeloCobranca,
  BasePrecoMedio,
  ModeloCobranca,
  ModeloFinalCobranca,
  ModeloInicialCobranca,
  Regiao,
} from "./form.types";

export interface ExcelOutput {
  quantidadesDeFatura: number;
  faturasPorUnidadeAtendimento: number;
  investimentoInicialDeImplantacao: number;
  investimentoMedioAnual: number;
  comercial: number;
  faturamentoLeituraEMedicao: number;
  rsuColetadoETratadoPorMes: number;
  unidadesHabitacionais: number;
  segundasViasProjetadasNoAno: number;
  unidadesDeAtendimento: number;
  areaPorUnidadeAtendimento: number;
  areaTotalUnidadeAtendimento: number;
  clientesPorUnidadeAtendimento: number;
  investimentoPorUnidadeAtendimento: number;
  investimentoEstruturaCivil: number;
  investimentoAquisicaoAreas: number;
  inadimplenciaMedia: number;
  cobrancaENegociacao: number;
  cadastroEContatos: number;
  controlesEIndicadores: number;
  tecnologiaDaInformacao: number;
  complianceEAuditoriaInterna: number;
  treinamentoEDesenvolvimento: number;
  totalColaboradores: number;
  custoDepartamentoPorCustoGeral: number;
  custoDepartamentoPorReceitaBruta: number;
  precoMedioColetaResiduos: number;
  precoMedioTratamentoEDestinacaoResiduos: number;
  custoColetaRSU: number;
  custoTratamentoEDestinacaoRSU: number;
  porteDaConcessao: string;
  graficos: {
    custoUnitarioGeralAnualPorUH: number[][];
    custoUnitarioGeralAnualPorHabitante: number[][];
    custoUnitarioGeralPorTonelada: number[][];
  };
}

export type ExcelInput = {
  habitantes: number;
  regiao: Regiao;
  modeloCobrancaConcessao: ModeloCobranca;
  taxaGeracaoResiduos: number;
  taxaColetaResiduos: number;
  anoInicio: AnosInicio;
  crescimentoPopulacionalAnual: number;
  habitantesPorResidencia: number;
  modeloInicialCobranca: ModeloInicialCobranca;
  anosTransicaoModeloCobranca: AnosTransicaoModeloCobranca;
  modeloFinalCobranca: ModeloFinalCobranca;
  receitaRepassada: number;
  atendimentoComercial: string;
  faturamentoLeituraMedicao: string;
  cobrancaNegociacao: string;
  cadastroContratos: string;
  controlesIndicadores: string;
  tecnologiaInformacao: string;
  complianceAuditoriaInterna: string;
  treinamentoDesenvolvimento: string;
  tipologiaFaturamento: string;
  basePrecoMedio: BasePrecoMedio;
};

export const ExcelOutputLabels = {
  quantidadesDeFatura: "Quantidades de Fatura",
  segundasViasProjetadasNoAno: "Segundas vias Projetadas no Ano",
  investimentoInicialDeImplantacao: "Investimento Inicial de Implantação (R$)",
  investimentoMedioAnual: "Investimento Médio Anual",
  comercial: "Comercial",
  faturamentoLeituraEMedicao: "Faturamento Leitura e Medição",
  cobrancaENegociacao: "Cobrança e Negociação",
  cadastroEContatos: "Cadastro e Contatos",
  controlesEIndicadores: "Controles e Indicadores",
  tecnologiaDaInformacao: "Tecnologia da Informação",
  complianceEAuditoriaInterna: "Compliance e Auditoria Interna",
  treinamentoEDesenvolvimento: "Treinamento e Desenvolvimento",
} as const;
