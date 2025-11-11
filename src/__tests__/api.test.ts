import axios from "axios";
import {
  ANOS_INICIO,
  ANOS_TRANSICAO_MODELO_COBRANCA,
  SetorEmpresa,
  SETORES_EMPRESA,
  TIPOLOGIA_FATURAMENTO,
} from "../types/form.types";
import { ExcelOutput } from "../types/graphApi.types";

function generateInputs() {
  return {
    habitantes: Math.floor(Math.random() * 100000) + 5000,
    regiao: randomRegion(),
    modeloCobrancaConcessao: Math.random() < 0.5 ? "Tarifa" : "Taxa",
    taxaColetaResiduos: Math.floor(Math.random() * 50) + 50,
    anoInicio: ANOS_INICIO[Math.floor(Math.random() * ANOS_INICIO.length)],
    habitantesPorResidencia: Math.floor(Math.random() * 6) + 1,
    crescimentoPopulacionalAnual: parseFloat((Math.random() * 5).toFixed(2)),
    modeloInicialCobranca: Math.random() < 0.5 ? "Tarifa" : "Taxa",
    anosTransicaoModeloCobranca:
      ANOS_TRANSICAO_MODELO_COBRANCA[
        Math.floor(Math.random() * ANOS_TRANSICAO_MODELO_COBRANCA.length)
      ],
    receitaRepassada: parseFloat((Math.random() * 100).toFixed(2)),
    setores: generateRandomSetores(),
    tipologiaFaturamento:
      TIPOLOGIA_FATURAMENTO[
        Math.floor(Math.random() * TIPOLOGIA_FATURAMENTO.length)
      ],
    incrementoReceita: parseFloat((Math.random() * 10).toFixed(2)),
    basePrecoMedio:
      Math.random() < 0.5 ? "UVS São Carlos" : "ABLP (Valoriza Resíduos)",
  };
}

function randomRegion() {
  const regions = ["Norte", "Sul", "Sudeste", "Centro-Oeste", "Nordeste"];
  return regions[Math.floor(Math.random() * regions.length)];
}

function generateRandomSetores() {
  let setores: SetorEmpresa[] = [];
  SETORES_EMPRESA.forEach((setor) => {
    if (Math.random() < 0.5) {
      setores.push(setor);
    }
  });
  return setores;
}

describe("Testar concorrência e variação dos resultados da API", () => {
  it("Deve retornar resultados válidos para múltiplas requisições simultâneas", async () => {
    const numRequests = 5;
    const bodies = Array.from({ length: numRequests }, () => generateInputs());

    const responses: ExcelOutput[] = await Promise.all(
      bodies.map(async (body) => {
        const response = await axios
          .post<ExcelOutput>("http://localhost:3000/api/calculate", body)
          .then((res) => res.data);
        return response;
      })
    );

    responses.forEach((data, index) => {
      console.log(`Response ${index + 1}:`, data);
    });

    responses.forEach((data) => {
      expect(data).toBeDefined();
    });

    const ignoredFields = [
      "inadimplenciaMedia",
      "cobrancaENegociacao",
      "cadastroEContratos",
      "controlesEIndicadores",
      "tecnologiaDaInformacao",
      "complianceEAuditoriaInterna",
      "treinamentoEDesenvolvimento",
      "graficos",
    ];

    function stripIgnoredFields(obj: ExcelOutput, ignoredFields: string[]) {
      const clone = { ...obj };
      ignoredFields.forEach((f) => delete clone[f as keyof ExcelOutput]);
      return clone;
    }

    let foundEqual = false;

    for (let i = 0; i < responses.length; i++) {
      for (let j = i + 1; j < responses.length; j++) {
        const ri = stripIgnoredFields(responses[i], ignoredFields);
        const rj = stripIgnoredFields(responses[j], ignoredFields);
        if (JSON.stringify(ri) === JSON.stringify(rj)) {
          foundEqual = true;
          console.log(
            "Respostas idênticas (ignorando campos permitidos) encontradas:",
            i,
            j
          );
        }
      }
    }
    expect(foundEqual).toBe(false);
  }, 30000);
});
