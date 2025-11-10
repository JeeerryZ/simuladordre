import { ExcelOutput } from "@/types/graphApi.types";
import { BadgePercent, BarChart3, PiggyBank, TrendingUp } from "lucide-react";
import { CardContent } from "./ui/card";

type Insight = {
  icon: React.ReactNode;
  title: string;
  text: string;
  detail: string;
};

type InsightProps = {
  excelOutput: ExcelOutput;
};

function formatValue(
  value: number | string | undefined,
  isMoney = false
): string {
  if (typeof value === "number" || typeof value === "string") {
    return value.toLocaleString("pt-BR", {
      minimumFractionDigits: isMoney ? 2 : 0,
    });
  }
  return value ?? "";
}

export default function Insights({ excelOutput }: InsightProps) {
  const insights: Insight[] = [
    {
      icon: <TrendingUp className='w-6 h-6 text-emerald-600' />,
      title: "Faturamento & Volume",
      text: `No período analisado, foram geradas ${formatValue(
        excelOutput.quantidadesDeFatura
      )} faturas ao longo de ${
        excelOutput.unidadesDeAtendimento
      } unidades, mostrando o alcance operacional do projeto.`,
      detail: `Cada unidade de atendimento processou em média ${
        formatValue(excelOutput.faturasPorUnidadeAtendimento) ?? 0
      } faturas ao ano.`,
    },
    {
      icon: <PiggyBank className='w-6 h-6 text-green-500' />,
      title: "Investimento & Estrutura",
      text: `O investimento total planejado é de R$ ${formatValue(
        excelOutput.investimentoInicialDeImplantacao,
        true
      )} distribuído em estruturas civis, aquisição de áreas e evolução tecnológica.`,
      detail: `Destacam-se R$ ${
        formatValue(excelOutput.investimentoEstruturaCivil, true) || "0"
      } aplicados em estruturas e R$ ${
        formatValue(excelOutput.investimentoAquisicaoAreas, true) || "0"
      } na expansão física do atendimento.`,
    },
    {
      icon: <BarChart3 className='w-6 h-6 text-green-600' />,
      title: "Performance Operacional",
      text: `Foram atendidas ${
        formatValue(excelOutput.unidadesHabitacionais) || "0"
      } residências, refletindo na coleta/tratamento de ${
        formatValue(excelOutput.rsuColetadoETratadoPorMes) || "0"
      } toneladas por mês de resíduos sólidos urbanos.`,
      detail: `A área total coberta no momento é ${
        formatValue(excelOutput.areaTotalUnidadeAtendimento) || "0"
      } m², permitindo um atendimento com excelência.`,
    },
    {
      icon: <BadgePercent className='w-6 h-6 text-green-700' />,
      title: "Gestão Comercial",
      text: `A inadimplência média foi reportada em ${formatValue(
        excelOutput.inadimplenciaMedia
      )}%.`,
      detail:
        excelOutput.inadimplenciaMedia > 10
          ? "O valor recomenda atenção à renegociação e estratégias de incentivo ao pagamento."
          : "O índice está dentro da faixa saudável para o segmento.",
    },
  ];

  return (
    <CardContent>
      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8'>
        {insights.map((ins, idx) => (
          <div
            key={idx}
            className='flex flex-col gap-2 bg-white/80 border-emerald-100 border backdrop-blur rounded-xl shadow-lg px-6 py-5 transition-all duration-300 hover:scale-[1.035] group'
          >
            <div className='flex items-center gap-3'>
              {ins.icon}
              <span className='font-semibold text-emerald-700 drop-shadow'>
                {ins.title}
              </span>
            </div>
            <div className='text-slate-800 font-medium text-[1.1rem] mb-1 mt-2'>
              {ins.text}
            </div>
            {ins.detail && (
              <span className='text-[0.97rem] text-slate-500 ml-1'>
                {ins.detail}
              </span>
            )}
          </div>
        ))}
      </div>
    </CardContent>
  );
}
