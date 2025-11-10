import { FormValues } from "@/schemas/formSchema";
import { ExcelOutput } from "@/types/graphApi.types";
import {
  AlertTriangle,
  AreaChart,
  BadgePercent,
  Banknote,
  BookText,
  Coins,
  FileText,
  Home,
  NotebookPen,
  PiggyBank,
  Receipt,
  ShieldCheck,
  Users,
  Wallet,
} from "lucide-react";

const infoConfig = [
  { key: "habitantes", icon: Users, label: "Habitantes", color: "emerald" },
  {
    key: "unidadesHabitacionais",
    icon: Home,
    label: "Unid. Habitacionais",
    color: "sky",
  },
  {
    key: "porteDaConcessao",
    icon: BadgePercent,
    label: "Porte da Concessão",
    color: "green",
  },
  {
    key: "areaTotalUnidadeAtendimento",
    icon: AreaChart,
    label: "Área Total (m²)",
    color: "yellow",
  },
  {
    key: "investimentoInicialDeImplantacao",
    icon: Wallet,
    label: "Invest. Inicial de Implantação",
    color: "amber",
  },
  {
    key: "investimentoMedioAnual",
    icon: PiggyBank,
    label: "Invest. Médio Anual",
    color: "green",
  },
  {
    key: "investimentoEstruturaCivil",
    icon: Banknote,
    label: "Invest. Estrut. Civil",
    color: "pink",
  },
  {
    key: "investimentoAquisicaoAreas",
    icon: BookText,
    label: "Invest. em aquisição de áreas",
    color: "fuchsia",
  },
  {
    key: "quantidadesDeFatura",
    icon: FileText,
    label: "Faturas/Ano",
    color: "indigo",
  },
  {
    key: "faturasPorUnidadeAtendimento",
    icon: Receipt,
    label: "Faturas/Unidade",
    color: "violet",
  },
  {
    key: "rsuColetadoETratadoPorMes",
    icon: NotebookPen,
    label: "RSU Coletado/mês (ton/mês)",
    color: "lime",
  },
  {
    key: "clientesPorUnidadeAtendimento",
    icon: Users,
    label: "Clientes/Unidade",
    color: "teal",
  },
  {
    key: "unidadesDeAtendimento",
    icon: Home,
    label: "Unidades de Atendimento",
    color: "blue",
  },
  {
    key: "totalColaboradores",
    icon: Users,
    label: "Total de Colaboradores",
    color: "cyan",
  },
  {
    key: "precoMedioColetaResiduos",
    icon: Banknote,
    label: "Preço Médio da Coleta e Destinação de Resíduos (R$/ton)",
    color: "purple",
  },
  {
    key: "precoMedioTratamentoEDestinacaoResiduos",
    icon: Banknote,
    label: "Preço Médio do Tratamento e Destinação Resíduos (R$/ton)",
    color: "purple",
  },
  {
    key: "custoColetaRSU",
    icon: Banknote,
    label: "Custo Coleta RSU (R$/ton)",
    color: "purple",
  },
  {
    key: "custoTratamentoEDestinacaoRSU",
    icon: Banknote,
    label: "Custo Tratamento e Destinação RSU (R$/ton)",
    color: "purple",
  },
  {
    key: "inadimplenciaMedia",
    icon: ShieldCheck,
    label: "Inadimplência média",
    color: "red",
  },
  {
    key: "segundasViasProjetadasNoAno",
    icon: FileText,
    label: "2ª vias/ano",
    color: "rose",
  },
  {
    key: "custoDepartamentoPorCustoGeral",
    icon: AlertTriangle,
    label: "Custo Depto/Custo Geral",
    color: "orange",
  },
  {
    key: "custoDepartamentoPorReceitaBruta",
    icon: Coins,
    label: "Custo Depto/Receita Bruta",
    color: "amber",
  },
];

function formatValue(key: string, val: any) {
  if (val === undefined || val === null) return "-";
  if (
    [
      "investimentoInicialDeImplantacao",
      "investimentoMedioAnual",
      "investimentoEstruturaCivil",
      "investimentoAquisicaoAreas",
      "custoColetaRSU",
      "custoTratamentoEDestinacaoRSU",
      "precoMedioColetaResiduos",
      "precoMedioTratamentoEDestinacaoResiduos",
    ].includes(key)
  )
    return "R$ " + val.toLocaleString("pt-BR", { minimumFractionDigits: 2 });
  if (key === "inadimplenciaMedia" || key.includes("custo"))
    return parseFloat(val).toFixed(1) + "%";
  if (typeof val === "number") return val.toLocaleString("pt-BR");
  return val.toString();
}

type ReviewProps = {
  formValue: FormValues;
  excelOutput: ExcelOutput;
};

export default function Review({ formValue, excelOutput }: ReviewProps) {
  const get = (key: string) =>
    formValue[key as keyof FormValues] ?? excelOutput[key as keyof ExcelOutput];

  return (
    <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 mb-6 animate-fade-in-up'>
      {infoConfig.map(({ key, icon: Icon, label, color }, idx) => {
        const value = get(key);
        return typeof value === "number" && value == 0 ? null : (
          <div
            key={label + idx}
            className={`flex items-center flex-wrap gap-2 px-3 py-3 rounded-lg bg-linear-to-tr from-${color}-50 to-white border border-green-800/50 shadow min-w-[140px] transition-all hover:scale-105`}
          >
            <Icon className={`w-5 h-5 text-${color}-600`} />
            <div>
              <div className={`text-xs font-semibold text-${color}-700 mb-0.5`}>
                {label}
              </div>
              <div className='font-semibold text-[1.10rem]  text-slate-800'>
                {formatValue(key, value)}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
