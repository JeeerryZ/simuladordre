"use client";

import PageTransition from "@/components/anim/PageTransition";
import { ScrollReveal } from "@/components/anim/ScrollReveal";
import {
  CardGrafico,
  CardGraficoArea,
  CardGraficoMinimal,
} from "@/components/cardGraphic";
import { Button } from "@/components/ui/button";
import { ExcelOutput } from "@/types/graphApi.types";
import clsx from "clsx";
import {
  BadgePercent,
  Banknote,
  BarChart3,
  Book,
  CirclePlus,
  Coins,
  CreditCard,
  Home,
  House,
  Loader2,
  Monitor,
  NotebookPen,
  NotebookText,
  PiggyBank,
  Receipt,
  SaveIcon,
  Scan,
  ShieldCheck,
  TrendingUp,
  UserCog,
  Users,
  Wallet,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";

// Cards principais (operacional)
const metricsMain = [
  {
    key: "clientesPorUnidadeAtendimento",
    label: "Clientes/Unidade",
    icon: <Users className='w-5 h-5' />,
  },
  {
    key: "unidadesDeAtendimento",
    label: "Unidades de Atendimento",
    icon: <Home className='w-5 h-5' />,
  },
  {
    key: "quantidadesDeFatura",
    label: "Faturas Processadas/Ano",
    icon: <TrendingUp className='w-5 h-5' />,
  },

  {
    key: "segundasViasProjetadasNoAno",
    label: "2ª Via Anual",
    icon: <NotebookText className='w-5 h-5' />,
    unit: "Projetadas",
  },
];

// Cards financeiros
const metricsFinance = [
  {
    key: "investimentoMedioAnual",
    label: "Investimento Médio Anual",
    icon: <Wallet className='w-6 h-6 text-green-600' />,
  },
  {
    key: "investimentoAquisicaoAreas",
    label: "Aquisição de Áreas",
    icon: <Banknote className='w-6 h-6 text-green-700' />,
  },
  {
    key: "investimentoEstruturaCivil",
    label: "Estrutura Civil",
    icon: <Coins className='w-6 h-6 text-green-600' />,
  },
  {
    key: "investimentoInicialDeImplantacao",
    label: "Investimento Total Inicial",
    icon: <PiggyBank className='w-6 h-6 text-green-500' />,
  },
];

// Cards secundários
const metricsSecondary = [
  {
    key: "comercial",
    label: "Unidades Comerciais",
    icon: <Users className='w-5 h-5' />,
    unit: "Colaborador(es)",
  },
  {
    key: "cobrancaENegociacao",
    label: "Cobrança & Negociação",
    icon: <CreditCard className='w-5 h-5' />,
    unit: "Colaborador(es)",
  },
  {
    key: "cadastroEContatos",
    label: "Cadastro & Contatos",
    icon: <NotebookPen className='w-5 h-5' />,
    unit: "Colaborador(es)",
  },
  {
    key: "controlesEIndicadores",
    label: "Controles & Indicadores",
    icon: <BarChart3 className='w-5 h-5' />,
    unit: "Colaborador(es)",
  },
  {
    key: "tecnologiaDaInformacao",
    label: "Tecnologia da Informação",
    icon: <Monitor className='w-5 h-5' />,
    unit: "Colaborador(es)",
  },
  {
    key: "complianceEAuditoriaInterna",
    label: "Compliance & Auditoria",
    icon: <ShieldCheck className='w-5 h-5' />,
    unit: "Colaborador(es)",
  },
  {
    key: "treinamentoEDesenvolvimento",
    label: "Treinamento & Desenvolvimento",
    icon: <UserCog className='w-5 h-5' />,
    unit: "Colaborador(es)",
  },
];

// Cards infraestrutura
const metricsInfraestructure = [
  {
    key: "unidadesHabitacionais",
    label: "Unidades Habitacionais",
    icon: <House className='w-5 h-5' />,
  },
  {
    key: "areaTotalUnidadeAtendimento",
    label: "Área Total",
    icon: <Scan className='w-5 h-5' />,
    unit: "m²",
  },
  {
    key: "porteDaConcessao",
    label: "Porte da Concessão",
    icon: <BadgePercent className='w-5 h-5' />,
  },
];

// Cards impacto dos custos do departamento
const metricsImpactoCustosDepartamento = [
  {
    key: "custoDepartamentoPorCustoGeral",
    label: "Custo Departamento por Custo Geral",
    unit: "%",
    decimals: 2,
    icon: <CreditCard className='w-6 h-6 text-green-600' />,
  },
  {
    key: "custoDepartamentoPorReceitaBruta",
    label: "Custo Departamento por Receita Bruta",
    unit: "%",
    decimals: 2,
    icon: <Receipt className='w-6 h-6 text-green-700' />,
  },
];

// Helpers
function getValue<T extends object>(obj: T, key: keyof T) {
  return obj[key];
}
function formatBRL(valor: number) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });
}
function formatValue(
  valor: any,
  isMoney = false,
  unit?: string,
  decimals?: number
) {
  if (valor === undefined || valor === null || Number(valor) === 0) return null;
  if (isMoney) return formatBRL(Number(valor));
  if (decimals !== undefined && typeof valor === "number") {
    return `${Number(valor).toLocaleString("pt-BR", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })}${unit ? ` ${unit}` : ""}`;
  }
  if (unit) return `${Number(valor).toLocaleString("pt-BR")} ${unit}`;
  if (typeof valor === "number") return valor.toLocaleString("pt-BR");
  return valor?.toString();
}

export default function ResultadosPage() {
  const [excelOutput, setExcelOutput] = useState<ExcelOutput | null>(null);
  const [loading, setLoading] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  function handleReset() {
    setLoading(true);
    sessionStorage.removeItem("formData");
    sessionStorage.removeItem("excelOutput");
    router.push("/simulador");
  }

  const handlePrint = useReactToPrint({
    contentRef: contentRef,
    documentTitle: "relatorio-resultados.pdf",
  });

  useEffect(() => {
    const storedData = sessionStorage.getItem("excelOutput");
    if (storedData) {
      setExcelOutput(JSON.parse(storedData));
    } else {
      router.push("/");
    }
  }, []);

  if (!excelOutput) return null;

  return (
    <PageTransition
      motionProps={{
        initial: { opacity: 0, x: -80 },
        animate: { opacity: 1, x: 0 },
        transition: { duration: 0.4 },
      }}
    >
      <div
        ref={contentRef}
        className='min-h-screen bg-linear-to-br from-green-50 via-green-100 to-green-50 dark:from-slate-950 dark:via-green-950 dark:to-slate-900 p-4 md:p-8'
      >
        <header className='relative z-10 overflow-visible mb-12'>
          {/* Glow e blobs animados */}
          <div className='absolute inset-0 pointer-events-none flex justify-center items-center select-none'>
            <div
              className='w-40 h-40 bg-green-400/30 rounded-full blur-[68px] animate-pulse
        absolute left-0 top-0 -z-10'
            />
            <div
              className='w-56 h-48 bg-emerald-400/25 rounded-full blur-[80px]
        absolute right-0 top-8 -z-10'
            />
            <div className='w-24 h-24 bg-green-400/30 rounded-full blur-3xl absolute right-28 top-10 -z-10' />
            <div className='w-44 h-32 bg-purple-400/20 rounded-full blur-2xl absolute left-7 bottom-0 -z-10' />
          </div>
          <div className='relative flex flex-col items-center pt-7 pb-4'>
            <span className='inline-flex items-center gap-2 px-4 py-1 mb-4 rounded-full bg-linear-to-tr from-green-200/60 via-emerald-100/60 to-white/60 shadow-lg text-slate-600 backdrop-blur-md font-semibold text-xs'>
              <BarChart3 size={18} className='text-green-400 mx-1' />
              Resultados da Simulação
            </span>
            <h1 className='text-4xl md:text-5xl font-extrabold text-slate-700 drop-shadow-2xl tracking-tight animate-fade-in-up mb-3'>
              Dashboard Analítico&nbsp;
              <span className='bg-linear-to-tr from-emerald-400 via-green-400 to-green-500 bg-clip-text text-transparent animate-gradient-x'>
                Interativo
              </span>
            </h1>
            <p className='text-base md:text-lg text-slate-500 font-medium text-center px-2 mt-5 animate-fade-in-slow'>
              Visualização dinâmica de métricas e gráficos operacionais
              <br />
            </p>
          </div>
        </header>
        <div className='max-w-6xl mx-auto'>
          {/* Operacional */}
          <section className='mb-10'>
            <h1 className='text-xl font-bold mb-5 text-green-600 drop-shadow-lg'>
              Operacional
            </h1>
            <ScrollReveal duration={0.7}>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {metricsMain.map((meta, idx) => {
                  const valorFormatado = formatValue(
                    getValue(excelOutput, meta.key as keyof ExcelOutput)
                  );
                  if (!valorFormatado) return null;
                  return (
                    <ScrollReveal
                      key={meta.key}
                      duration={0.6}
                      delay={idx * 0.15}
                    >
                      <div
                        className={clsx(
                          "group relative rounded-2xl p-6 transition-all duration-300 hover:scale-[1.04]",
                          "backdrop-blur-2xl bg-white/60 dark:bg-slate-900/30 shadow-xl border border-green-100 border-opacity-30 hover:border-green-400 cursor-pointer"
                        )}
                      >
                        <div className='flex items-start justify-between mb-3'>
                          <div className='p-3 rounded-lg bg-green-100 text-green-600 dark:text-green-400 group-hover:bg-green-200 transition-colors'>
                            {meta.icon}
                          </div>
                        </div>
                        <p className='text-slate-500 text-sm mb-1'>
                          {meta.label}
                        </p>
                        <p className='text-[1.85rem] font-semibold text-slate-800 drop-shadow'>
                          {valorFormatado}
                        </p>
                      </div>
                    </ScrollReveal>
                  );
                })}
              </div>
            </ScrollReveal>
          </section>
          {/* Infraestrutura */}
          <section className='mb-10'>
            <h1 className='text-xl font-semibold mb-5 text-green-800 drop-shadow-lg'>
              Infraestrutura
            </h1>
            <ScrollReveal duration={0.7}>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {metricsInfraestructure.map((meta, idx) => {
                  const valorFormatado = formatValue(
                    getValue(excelOutput, meta.key as keyof ExcelOutput),
                    false,
                    meta.unit
                  );
                  if (!valorFormatado) return null;
                  return (
                    <ScrollReveal
                      key={meta.key}
                      duration={0.6}
                      delay={idx * 0.15}
                    >
                      <div
                        className={clsx(
                          "group relative rounded-2xl p-6 transition-all duration-300 hover:scale-[1.04]",
                          "backdrop-blur-2xl bg-white/60 shadow-xl border border-green-100 border-opacity-30 hover:border-green-400 cursor-pointer"
                        )}
                      >
                        <div className='flex items-start justify-between mb-3'>
                          <div className='p-3 rounded-lg bg-green-100 text-green-800 group-hover:bg-green-200 transition-colors'>
                            {meta.icon}
                          </div>
                        </div>
                        <p className='text-slate-500 text-sm mb-1'>
                          {meta.label}
                        </p>
                        <p className='text-[1.85rem] font-semibold text-slate-800 drop-shadow'>
                          {valorFormatado}
                        </p>
                      </div>
                    </ScrollReveal>
                  );
                })}
              </div>
            </ScrollReveal>
          </section>
          {/* Investimentos/CAPEX */}
          <section className='mb-12'>
            <h1 className='text-xl font-semibold mb-5 text-green-800 drop-shadow-lg'>
              Investimentos/CAPEX
            </h1>
            <ScrollReveal duration={0.7}>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7'>
                {metricsFinance.map((meta, idx) => {
                  const valorFormatado = formatValue(
                    getValue(excelOutput, meta.key as keyof ExcelOutput),
                    true
                  );
                  if (!valorFormatado) return null;
                  return (
                    <ScrollReveal
                      key={meta.key}
                      duration={0.6}
                      delay={idx * 0.14}
                    >
                      <div
                        className={clsx(
                          "rounded-2xl p-8 flex flex-col items-center font-semibold shadow-lg transition hover:scale-[1.055]",
                          "bg-white/60",
                          "border-green-100 border hover:border-green-600/40",
                          "ring-2 ring-green-200/20"
                        )}
                      >
                        <div className='mb-1'>{meta.icon}</div>
                        <div className='text-lg font-medium text-green-900 mb-1 text-center drop-shadow'>
                          {meta.label}
                        </div>
                        <div className='lg:text-xl text-[2.1rem] font-semibold text-slate-800 drop-shadow-xl'>
                          {valorFormatado}
                        </div>
                      </div>
                    </ScrollReveal>
                  );
                })}
              </div>
            </ScrollReveal>
          </section>
          {/* Dimensionamento de Pessoas */}
          <section className='mb-8'>
            <h1 className='text-xl font-bold mb-5 text-slate-700 drop-shadow-lg'>
              Dimensionamento de Pessoas
            </h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
              {metricsSecondary.map((meta, idx) => {
                const valorFormatado = formatValue(
                  getValue(excelOutput, meta.key as keyof ExcelOutput),
                  false,
                  meta.unit
                );
                if (!valorFormatado) return null;
                return (
                  <div
                    key={meta.key}
                    className='rounded-2xl p-5 bg-white/55 dark:bg-slate-900/35 shadow-lg backdrop-blur-lg flex flex-col items-center'
                  >
                    {meta.icon && <div className='mb-2'>{meta.icon}</div>}
                    <p className='text-slate-500 text-center text-md mb-2'>
                      {meta.label}
                    </p>
                    <p className='text-2xl font-medium text-slate-700 mb-1 drop-shadow'>
                      {valorFormatado}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>
          {/* Impacto dos Custos do Departamento */}
          <section className='mb-12'>
            <h1 className='text-xl font-semibold mb-5 text-green-800 drop-shadow-lg'>
              Impacto dos Custos do Departamento
            </h1>
            <ScrollReveal duration={0.7}>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7'>
                {metricsImpactoCustosDepartamento.map((meta, idx) => {
                  const valorFormatado = formatValue(
                    getValue(excelOutput, meta.key as keyof ExcelOutput),
                    false,
                    meta.unit,
                    meta.decimals
                  );
                  if (!valorFormatado) return null;
                  return (
                    <ScrollReveal
                      key={meta.key}
                      duration={0.6}
                      delay={idx * 0.14}
                    >
                      <div
                        className={clsx(
                          "rounded-2xl p-8 flex flex-col items-center font-semibold shadow-lg transition hover:scale-[1.055]",
                          "bg-white/60",
                          "border-green-100 border hover:border-green-600/40",
                          "ring-2 ring-green-200/20"
                        )}
                      >
                        <div className='mb-1'>{meta.icon}</div>
                        <div className='text-lg font-medium text-green-900 mb-1 text-center drop-shadow'>
                          {meta.label}
                        </div>
                        <div className='lg:text-xl text-[2.1rem] font-semibold text-slate-800 drop-shadow-xl'>
                          {valorFormatado}
                        </div>
                      </div>
                    </ScrollReveal>
                  );
                })}
              </div>
            </ScrollReveal>
          </section>
        </div>
        {/* Gráficos */}
        <section className='flex items-center justify-center flex-col gap-4'>
          <h1 className='text-xl font-bold mb-5 text-slate-700 drop-shadow-lg'>
            Gráfico de Custos
          </h1>
          <CardGrafico
            title='Custo unitário geral anual por UH (R$/UH)'
            chartData={excelOutput.graficos.custoUnitarioGeralAnualPorUH}
          />
          <CardGraficoMinimal
            title='Custo unitário geral anual por Habitante (R$/Hab)'
            chartData={excelOutput.graficos.custoUnitarioGeralAnualPorHabitante}
            color='rgba(34,197,94,1)' // verde
          />
          <CardGraficoArea
            title='Custo unitário geral anual por Tonelada (R$/Ton)'
            chartData={excelOutput.graficos.custoUnitarioGeralPorTonelada}
            color='rgba(234,88,12,1)' // laranja
          />
        </section>
        {/* Footer */}
        <div className='flex lg:flex-row lg:gap-x-10 gap-y-6 flex-col align-center items-center justify-center'>
          <Button
            size={"lg"}
            className='cursor-pointer text-md'
            onClick={handleReset}
          >
            {loading ? (
              <Loader2 className='animate-spin' />
            ) : (
              <>
                <CirclePlus className='mt-0.5 w-5 h-5' />
                Nova Simulação
              </>
            )}
          </Button>
          <Button
            size={"lg"}
            className='cursor-pointer'
            variant='outline'
            onClick={() => router.push("/resumo")}
          >
            <Book className='w-4 h-4' />
            Ver Resumo
          </Button>
          <Button
            size={"lg"}
            className='cursor-pointer'
            variant={"outline"}
            onClick={handlePrint}
          >
            <SaveIcon className='w-4 h-4' />
            Salvar resultado em PDF
          </Button>
        </div>
      </div>
    </PageTransition>
  );
}
