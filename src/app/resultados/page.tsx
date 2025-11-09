"use client";

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
  ArrowBigLeft,
  Banknote,
  BarChart3,
  Coins,
  CreditCard,
  Home,
  House,
  Loader2,
  Monitor,
  NotebookPen,
  NotebookText,
  PiggyBank,
  ShieldCheck,
  TrendingUp,
  UserCog,
  Users,
  Wallet,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
    key: "unidadesHabitacionais",
    label: "Unidades Habitacionais",
    icon: <House className='w-5 h-5' />,
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
    key: "areaTotalUnidadeAtendimento",
    label: "Área Total",
    icon: <Home className='w-5 h-5' />,
    unit: "m²",
  },
  {
    key: "segundasViasProjetadasNoAno",
    label: "2ª Via Anual",
    icon: <NotebookText className='w-5 h-5' />,
    unit: "Projetadas",
  },
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
function formatValue(valor: any, isMoney = false, unit?: string) {
  if (valor === undefined || valor === null || Number(valor) === 0) return null;
  if (isMoney) return formatBRL(Number(valor));
  if (unit) return `${Number(valor).toLocaleString("pt-BR")} ${unit}`;
  if (typeof valor === "number") return valor.toLocaleString("pt-BR");
  return valor?.toString();
}

export default function ResultadosPage() {
  const [excelOutput, setExcelOutput] = useState<ExcelOutput | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function handleReset() {
    setLoading(true);
    sessionStorage.removeItem("excelOutput");
    router.push("/simulador");
  }

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
    <div className='min-h-screen bg-linear-to-br from-green-50 via-green-100 to-green-50 dark:from-slate-950 dark:via-green-950 dark:to-slate-900 p-4 md:p-8'>
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

        {/* Indicadores/Setores */}
        <section className='mb-8'>
          <h1 className='text-xl font-bold mb-5 text-slate-700 drop-shadow-lg'>
            Indicadores e Setores
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

      <div className='flex items-center justify-center'>
        <Button
          className='mb-8 text-lg text-center mt-4 px-10 py-6 cursor-pointer rounded-2xl bg-green-800 text-white font-semibold hover:ring-green-700/50 hover:ring-1 hover:bg-green-700 shadow-2xl transition'
          variant={loading ? "ghost" : "default"}
          onClick={handleReset}
        >
          {loading ? (
            <Loader2 className='animate-spin' />
          ) : (
            <>
              <ArrowBigLeft className='mt-0.5 w-5 h-5' />
              Fazer outra simulação
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
