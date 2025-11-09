import PageTransition from "@/components/anim/PageTransition";
import { ScrollReveal } from "@/components/anim/ScrollReveal";
import { ScrollStagger } from "@/components/anim/ScrollStagger";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BarChart3,
  Calculator,
  FileSpreadsheet,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <PageTransition>
      <div className='min-h-screen bg-linear-to-br from-slate-50 via-green-50 to-slate-50 relative overflow-hidden'>
        {/* Animated background elements */}
        <div className='absolute inset-0 overflow-hidden pointer-events-none'>
          <ScrollReveal animation='scale' duration={0.7}>
            <div className='absolute top-20 left-10 w-72 h-72 bg-green-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse' />
          </ScrollReveal>
          <ScrollReveal animation='scale' duration={0.8} delay={0.3}>
            <div className='absolute top-40 right-10 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-1000' />
          </ScrollReveal>
          <ScrollReveal animation='scale' duration={0.9} delay={0.5}>
            <div className='absolute bottom-20 left-1/2 w-80 h-80 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-2000' />
          </ScrollReveal>
        </div>
        <div className='relative z-10'>
          {/* Hero Section */}
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16'>
            {/* Logo and Title */}
            <ScrollReveal animation='fadeUp' duration={0.6}>
              <div className='text-center mb-12'>
                <div className='inline-flex items-center justify-center w-20 h-20 bg-linear-to-br from-green-600 to-green-700 rounded-2xl shadow-2xl mb-6 transform hover:scale-105 transition-transform duration-300'>
                  <BarChart3 className='w-10 h-10 text-white' />
                </div>
                <h1 className='text-5xl md:text-6xl font-bold text-slate-900 mb-4 tracking-tight'>
                  Simulador{" "}
                  <span className='bg-linear-to-r from-green-600 to-green-700 bg-clip-text text-transparent'>
                    DRE
                  </span>
                </h1>
                <p className='text-xl md:text-2xl text-slate-800 mb-3 font-light'>
                  Projeção e Resultados em Tempo Real
                </p>
                <p className='text-base text-slate-800 max-w-2xl mx-auto'>
                  Preencha os parâmetros financeiros e visualize o impacto
                  direto nos seus resultados com gráficos interativos e insights
                  automáticos
                </p>
              </div>
            </ScrollReveal>
            {/* CTA Button */}
            <ScrollReveal animation='slideUp' duration={0.6} delay={0.2}>
              <div className='flex justify-center mb-20'>
                <Link href='/simulador'>
                  <Button
                    size='lg'
                    className='bg-linear-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 group'
                  >
                    <Sparkles className='w-5 h-5 mr-2 group-hover:rotate-12 transition-transform' />
                    Iniciar Simulação
                    <ArrowRight className='w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform' />
                  </Button>
                </Link>
              </div>
            </ScrollReveal>
            {/* Features Grid */}
            <ScrollStagger animation='fadeUp' staggerDelay={0.1}>
              {[
                {
                  icon: <Calculator className='w-7 h-7 text-green-700' />,
                  title: "Cálculos Automáticos",
                  desc: "Insira os parâmetros e obtenha instantaneamente lucro líquido, margens e indicadores financeiros calculados automaticamente",
                  boxClass: "from-green-100 to-green-200",
                },
                {
                  icon: <TrendingUp className='w-7 h-7 text-green-700' />,
                  title: "Visualização Dinâmica",
                  desc: "Gráficos interativos que mostram receitas, despesas e distribuição por centro de custo de forma clara e visual",
                  boxClass: "from-green-100 to-green-200",
                },
                {
                  icon: <FileSpreadsheet className='w-7 h-7 text-green-700' />,
                  title: "Insights Inteligentes",
                  desc: "Análises automáticas que identificam oportunidades de melhoria e comparam seus resultados com metas estabelecidas",
                  boxClass: "from-green-100 to-green-200",
                },
              ].map(({ icon, title, desc, boxClass }, idx) => (
                <div
                  key={idx}
                  className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-slate-200`}
                >
                  <div
                    className={`w-14 h-14 bg-linear-to-br ${boxClass} rounded-xl flex items-center justify-center mb-4`}
                  >
                    {icon}
                  </div>
                  <h3 className='text-xl font-bold text-slate-900 mb-3'>
                    {title}
                  </h3>
                  <p className='text-slate-600 leading-relaxed'>{desc}</p>
                </div>
              ))}
            </ScrollStagger>
            {/* Additional Info */}
            {/* Additional Info */}
            <ScrollReveal animation='fadeUp' delay={0.2}>
              <div className='mt-14 text-center'>
                <p className='text-slate-500 mb-4'>Ideal para:</p>
                <div className='flex flex-wrap justify-center gap-3'>
                  {[
                    "Apresentações Executivas",
                    "Análise de Cenários",
                    "Planejamento Financeiro",
                    "Tomada de Decisão",
                  ].map((label, idx) => (
                    <span
                      key={label}
                      className='px-4 py-2 bg-white rounded-lg text-sm font-medium text-slate-700 border border-slate-200'
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
