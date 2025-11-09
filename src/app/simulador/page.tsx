"use client";
import PageTransition from "@/components/anim/PageTransition";
import { ScrollReveal } from "@/components/anim/ScrollReveal";
import Formulario from "@/components/form";
import { Card } from "@/components/ui/card";
import { BarChart3, Sparkles } from "lucide-react";
import Link from "next/link";

export default function SimuladorPage() {
  return (
    <PageTransition>
      <div className='min-h-screen bg-linear-to-br from-slate-50 via-green-50 to-slate-50 relative overflow-hidden'>
        <div className='absolute inset-0 pointer-events-none z-0'>
          <ScrollReveal animation='scale' duration={0.7}>
            <div className='absolute top-10 left-4 w-48 h-48 bg-green-400 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-pulse' />
          </ScrollReveal>
          <ScrollReveal animation='scale' duration={0.8} delay={0.2}>
            <div className='absolute top-36 right-1 w-72 h-72 bg-green-400 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-pulse delay-1000' />
          </ScrollReveal>
          <ScrollReveal animation='scale' duration={0.8} delay={0.4}>
            <div className='absolute bottom-10 left-10 w-56 h-56 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-pulse delay-2000' />
          </ScrollReveal>
        </div>
        <div className='relative z-10 flex flex-col items-center py-8 px-2'>
          <header className='text-center mb-5 w-full'>
            <ScrollReveal animation='fadeUp' duration={0.7}>
              <Link href={"/"}>
                <div className='mt-4 flex items-center justify-center gap-3'>
                  <div className='inline-flex items-center justify-center p-3 bg-linear-to-br from-green-600 to-green-700 rounded-2xl shadow-2xl'>
                    <BarChart3 className='w-7 h-7 text-white' />
                  </div>
                  <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight'>
                    Simulador{" "}
                    <span className='bg-linear-to-r from-green-600 to-green-700 bg-clip-text text-transparent'>
                      DRE
                    </span>
                  </h1>
                  <Sparkles className='w-6 h-6 text-green-400 animate-bounce' />
                </div>
              </Link>
            </ScrollReveal>
            <p className='text-base sm:text-lg text-slate-800 mt-2'>
              Projeção e resultados em tempo real. Preencha os parâmetros para
              simular!
            </p>
          </header>
          <section className='w-full max-w-md mx-auto sm:max-w-lg lg:max-w-xl mb-6'>
            <Card className='bg-white rounded-2xl p-5 shadow-lg border border-green-200'>
              <Formulario />
            </Card>
          </section>
          {/* Extra info */}
          <footer className='w-full text-center mt-6 mb-2'>
            <ScrollReveal animation='fadeUp' duration={0.6} delay={0.3}>
              <div className='flex flex-wrap justify-center gap-2 text-xs text-slate-600 font-medium'>
                <span className='px-3 py-1 bg-white rounded-lg border border-slate-200'>
                  Apresentações Executivas
                </span>
                <span className='px-3 py-1 bg-white rounded-lg border border-slate-200'>
                  Análise de Cenários
                </span>
                <span className='px-3 py-1 bg-white rounded-lg border border-slate-200'>
                  Planejamento Financeiro
                </span>
                <span className='px-3 py-1 bg-white rounded-lg border border-slate-200'>
                  Tomada de Decisão
                </span>
              </div>
            </ScrollReveal>
          </footer>
        </div>
      </div>
    </PageTransition>
  );
}
