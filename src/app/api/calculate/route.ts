import { getGraphToken } from "@/lib/getGraphToken";
import { FormValues } from "@/schemas/formSchema";
import { SetorEmpresa } from "@/types/form.types";
import { ExcelInput, ExcelOutput } from "@/types/graphApi.types";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const verifySetor = (
  setores: FormValues["setores"],
  setor: SetorEmpresa
): string => {
  return setores.includes(setor) ? "Sim" : "Não";
};

export async function POST(req: NextRequest) {
  const token = await getGraphToken();

  const formInputs = (await req.json()) as FormValues;

  const user_id = process.env.AZURE_USER_ID;

  const path = encodeURIComponent("Formulário DRE/planilhadre.xlsx");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const sessionResponse = await axios.post(
    `https://graph.microsoft.com/v1.0/users/${user_id}/drive/root:/${path}:/workbook/createSession`,
    { persistChanges: true },
    { headers: headers }
  );

  const sessionId = sessionResponse.data.id;
  const sessionHeaders = { ...headers, "workbook-session-id": sessionId };

  const inputsRange = "C6:C27";
  const valores: ExcelInput = {
    habitantes: formInputs.habitantes,
    regiao: formInputs.regiao,
    modeloCobrancaConcessao: formInputs.modeloCobrancaConcessao,
    taxaGeracaoResiduos: formInputs.taxaGeracaoResiduos,
    taxaColetaResiduos: formInputs.taxaColetaResiduos / 100,
    anoInicio: formInputs.anoInicio,
    crescimentoPopulacionalAnual: formInputs.crescimentoPopulacionalAnual / 100,
    habitantesPorResidencia: formInputs.habitantesPorResidencia,
    modeloInicialCobranca: formInputs.modeloInicialCobranca,
    anosProjecao: formInputs.anosTransicaoModeloCobranca,
    modeloFinalCobranca: "Tarifa",
    receitaRepassada: formInputs.receitaRepassada / 100,
    atendimentoComercial: verifySetor(
      formInputs.setores,
      "atendimento-comercial"
    ),
    faturamentoLeituraMedicao: verifySetor(
      formInputs.setores,
      "faturamento-leitura-medicao"
    ),
    cobrancaNegociacao: verifySetor(formInputs.setores, "cobranca-negociacao"),
    cadastroContratos: verifySetor(formInputs.setores, "cadastro-contratos"),
    controlesIndicadores: verifySetor(
      formInputs.setores,
      "controles-indicadores"
    ),
    tecnologiaInformacao: verifySetor(
      formInputs.setores,
      "tecnologia-informacao"
    ),
    complianceAuditoriaInterna: verifySetor(
      formInputs.setores,
      "compliance-auditoria-interna"
    ),
    treinamentoDesenvolvimento: verifySetor(
      formInputs.setores,
      "treinamento-desenvolvimento"
    ),
    tipologiaFaturamento: formInputs.tipologiaFaturamento,
    basePrecoMedio: formInputs.basePrecoMedio,
  };

  axios.patch(
    `https://graph.microsoft.com/v1.0/users/${user_id}/drive/root:/${path}:/workbook/worksheets('CONFIGURAÇÃO_CONCESSÃO')/range(address='${inputsRange}')`,
    {
      values: Object.values(valores).map((value) => [value]),
    },
    { headers: sessionHeaders }
  );

  const outputRanges: Array<[keyof ExcelOutput, string, string]> = [
    ["quantidadesDeFatura", "INPUTS GERAIS", "AU56"],
    ["faturasPorUnidadeAtendimento", "INPUTS GERAIS", "AU57"],
    ["rsuColetadoETratado", "CONFIGURAÇÃO_CONCESSÃO", "C18"],
    ["unidadesHabitacionais", "CONFIGURAÇÃO_CONCESSÃO", "C37"],
    ["segundasViasProjetadasNoAno", "INPUTS GERAIS", "AU55"],
    ["unidadesDeAtendimento", "CONFIGURAÇÃO_PORTE", "D56"],
    ["areaPorUnidadeAtendimento", "CONFIGURAÇÃO_PORTE", "D46"],
    ["areaTotalUnidadeAtendimento", "CONFIGURAÇÃO_PORTE", "D66"],
    ["clientesPorUnidadeAtendimento", "CONFIGURAÇÃO_PORTE", "E56"],
    ["investimentoPorUnidadeAtendimento", "CONFIGURAÇÃO_PORTE", "F56"],
    ["investimentoEstruturaCivil", "CAPEX", "V33"],
    ["investimentoAquisicaoAreas", "CAPEX", "V34"],
    ["investimentoInicialDeImplantacao", "CAPEX", "V9"],
    ["investimentoMedioAnual", "CAPEX", "AZ9"],
    ["inadimplenciaMedia", "CONFIGURAÇÃO_PORTE", "F13"],
    ["comercial", "ORGANOGRAMA", "K18"],
    ["faturamentoLeituraEMedicao", "ORGANOGRAMA", "K30"],
    ["cobrancaENegociacao", "ORGANOGRAMA", "K43"],
    ["cadastroEContatos", "ORGANOGRAMA", "K55"],
    ["controlesEIndicadores", "ORGANOGRAMA", "K65"],
    ["tecnologiaDaInformacao", "ORGANOGRAMA", "K75"],
    ["complianceEAuditoriaInterna", "ORGANOGRAMA", "K83"],
    ["treinamentoEDesenvolvimento", "ORGANOGRAMA", "K92"],
  ];

  const outputGraphRanges: Array<
    [keyof ExcelOutput["graficos"], string, string]
  > = [
    ["custoUnitarioGeralAnualPorUH", "P6:AC6", "P25:AC25"],
    ["custoUnitarioGeralAnualPorHabitante", "P6:AC6", "P26:AC26"],
    ["custoUnitarioGeralPorTonelada", "P6:AC6", "P27:AC27"],
  ];

  const outputs: Partial<ExcelOutput> = {};

  for (const [key, sheetName, cellAddress] of outputRanges) {
    const rangeResponse = await axios.get(
      `https://graph.microsoft.com/v1.0/users/${user_id}/drive/root:/${path}:/workbook/worksheets('${sheetName}')/range(address='${cellAddress}')`,
      { headers: sessionHeaders }
    );

    if (
      Array.isArray(rangeResponse.data.values) &&
      rangeResponse.data.values.length === 1 &&
      rangeResponse.data.values[0].length === 1 &&
      key !== "graficos"
    ) {
      if (typeof rangeResponse.data.values[0][0] === "number") {
        outputs[key] =
          key === "investimentoInicialDeImplantacao" ||
          key === "investimentoMedioAnual"
            ? Math.round(rangeResponse.data.values[0][0] * 100) / 100
            : Math.round(rangeResponse.data.values[0][0]);
      }
    } else {
      outputs[key] = rangeResponse.data.values.flat();
    }
  }

  for (const [graphKey, xAddr, yAddr] of outputGraphRanges) {
    // x axis (labels)
    const labelsResp = await axios.get(
      `https://graph.microsoft.com/v1.0/users/${user_id}/drive/root:/${path}:/workbook/worksheets('INPUTS%20GERAIS')/range(address='${xAddr}')`,
      { headers: sessionHeaders }
    );
    const labels = labelsResp.data.values[0].flat();

    // y axis (values)
    const valuesResp = await axios.get(
      `https://graph.microsoft.com/v1.0/users/${user_id}/drive/root:/${path}:/workbook/worksheets('INPUTS%20GERAIS')/range(address='${yAddr}')`,
      { headers: sessionHeaders }
    );
    const values = valuesResp.data.values[0].flat();

    if (!outputs.graficos) {
      outputs.graficos = {
        custoUnitarioGeralAnualPorUH: [[]],
        custoUnitarioGeralAnualPorHabitante: [[]],
        custoUnitarioGeralPorTonelada: [[]],
      };
    }

    outputs.graficos![graphKey] = [labels, values];
  }
  return NextResponse.json(outputs);
}
