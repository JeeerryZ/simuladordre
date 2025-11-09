import {
  ANOS_INICIO,
  ANOS_TRANSICAO_MODELO_COBRANCA,
  BASE_PREÇO_MEDIO,
  MODELO_COBRANCA_CONCESSAO,
  MODELO_INICIAL_COBRANCA,
  REGIOES,
  SETORES_EMPRESA,
  TIPOLOGIA_FATURAMENTO,
} from "@/types/form.types";
import { z } from "zod";

export const formSchema = z.object({
  habitantes: z.coerce
    .number("Informe o número de habitantes")
    .int("Informe um número inteiro")
    .min(1, "Mínimo de 1 habitante necessário")
    .positive("O número deve ser positivo"),

  regiao: z.enum(REGIOES, { message: "Selecione uma região válida" }),

  modeloCobrancaConcessao: z.enum(MODELO_COBRANCA_CONCESSAO, {
    message: "Selecione um modelo de cobrança",
  }),

  taxaGeracaoResiduos: z.coerce
    .number("Informe a taxa de geração de resíduos")
    .min(0.1, "Taxa mínima é 0.1 kg/hab.dia")
    .max(1.5, "Taxa máxima é 1.5 kg/hab.dia")
    .positive("A taxa deve ser um número positivo"),

  taxaColetaResiduos: z.coerce
    .number("Informe a taxa de coleta de resíduos")
    .min(50, "Taxa mínima é 50%")
    .max(100, "Taxa máxima é 100%")
    .positive("A taxa deve ser um número positivo"),

  anoInicio: z
    .string("Informe um ano de início")
    .refine((data) => ANOS_INICIO.includes(data), {
      message: "Selecione um ano de início válido",
    }),

  crescimentoPopulacionalAnual: z
    .number("Informe o crescimento populacional anual")
    .min(0, "Crescimento mínimo é 0%")
    .max(5, "Crescimento máximo é 5%"),

  habitantesPorResidencia: z.coerce
    .number("Informe o número de habitantes por residência")
    .min(1, "Mínimo de 1 habitante por residência")
    .max(7, "Máximo de 7 habitantes por residência"),

  modeloInicialCobranca: z.enum(MODELO_INICIAL_COBRANCA, {
    message: "Selecione um modelo de cobrança",
  }),

  anosTransicaoModeloCobranca: z
    .string()
    .refine((data) => ANOS_TRANSICAO_MODELO_COBRANCA.includes(data), {
      message: "Selecione um ano válido",
    }),

  receitaRepassada: z.coerce
    .number("Informe a receita repassada")
    .min(0, "Receita repassada mínima é 0%")
    .max(10, "Receita repassada máxima é 10%"),

  setores: z
    .array(z.enum(SETORES_EMPRESA))
    .min(1, "Selecione ao menos um setor"),

  tipologiaFaturamento: z.enum(TIPOLOGIA_FATURAMENTO, {
    message: "Selecione uma tipologia de faturamento",
  }),

  incrementoReceita: z.coerce
    .number("Informe o incremento de receita")
    .min(0, "Incremento mínimo é 0%")
    .max(10, "Incremento máximo é 20%"),

  basePrecoMedio: z.enum(BASE_PREÇO_MEDIO, {
    message: "Selecione uma base de preço médio",
  }),
});

export type FormValues = z.infer<typeof formSchema>;
