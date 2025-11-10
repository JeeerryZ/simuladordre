"use client";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Calculator,
  FileSpreadsheet,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ScrollReveal } from "./anim/ScrollReveal";
import { ScrollStagger } from "./anim/ScrollStagger";
import { Button } from "./ui/button";

export default function Intro() {
  const [stage, setStage] = useState(0);

  const handleStageAdvance = () => {
    setStage((lastStage) => {
      if (lastStage < 4) {
        return lastStage + 1;
      }
      return lastStage;
    });
  };

  useEffect(() => {
    const timers = [
      setTimeout(() => handleStageAdvance(), 800), // Solvi aparece
      setTimeout(() => handleStageAdvance(), 3800), // Transição
      setTimeout(() => handleStageAdvance(), 4500), // Aion aparece
      setTimeout(() => handleStageAdvance(), 7300), // Título do projeto
    ];

    return () => timers.forEach((timer) => clearTimeout(timer));
  }, []);

  const handleSkip = (e: React.MouseEvent) => {
    setStage(4);
    e.stopPropagation();
  };

  return (
    <div className='min-h-screen bg-white relative overflow-hidden flex items-center justify-center'>
      {/* Efeitos de fundo sutis */}
      <motion.div
        className='absolute inset-0'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        {/* Gradiente sutil */}
        <div className='absolute inset-0 bg-linear-to-br from-slate-50 via-white to-slate-50' />

        {/* Luz verde suave (Solvi) */}
        <motion.div
          className='absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-emerald-100/40 rounded-full blur-3xl'
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 5, repeat: Infinity }}
        />

        {/* Luz azul suave (Aion) */}
        <motion.div
          className='absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-slate-200/40 rounded-full blur-3xl'
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 5, repeat: Infinity, delay: 2.5 }}
        />
      </motion.div>

      {/* Grid sutil de fundo */}
      <div className='absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-size-[60px_60px] mask-[radial-gradient(ellipse_at_center,black_30%,transparent_70%)]' />

      {/* Conteúdo */}
      <div className='relative z-10 w-full max-w-5xl px-8'>
        <AnimatePresence mode='wait'>
          {/* Stage 1: Solvi */}
          {stage === 1 && (
            <motion.div
              key='solvi'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 1 }}
              className='text-center'
            >
              {/* Logo Solvi */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 150,
                  damping: 15,
                  delay: 0.2,
                }}
                className='inline-block mb-10'
              >
                <motion.div className='relative' whileHover={{ scale: 1.05 }}>
                  {/* Sombra suave */}
                  <motion.div
                    className='absolute -inset-4 bg-emerald-100 rounded-3xl blur-2xl'
                    animate={{ opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />

                  {/* Container do logo */}
                  <div className='relative bg-white rounded-3xl shadow-2xl shadow-emerald-200/50 p-8 w-48 h-48 flex items-center justify-center'>
                    <img
                      src='solvi-logo.png'
                      alt='Solvi Logo'
                      className='w-full h-full object-contain'
                    />
                  </div>
                </motion.div>
              </motion.div>

              {/* Nome e tagline */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 1 }}
              >
                <motion.h1
                  className='text-7xl md:text-8xl font-bold mb-5 tracking-tight text-emerald-700'
                  initial={{ letterSpacing: "0.3em", opacity: 0 }}
                  animate={{ letterSpacing: "0em", opacity: 1 }}
                  transition={{ duration: 1, delay: 0.8 }}
                >
                  Solví
                </motion.h1>

                <motion.div
                  className='h-1 w-40 mx-auto bg-linear-to-r from-transparent via-emerald-400 to-transparent mb-6 rounded-full'
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1.3, duration: 0.8 }}
                />

                <motion.p
                  className='text-slate-600 text-xl tracking-[0.2em] uppercase font-light'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.6, duration: 0.8 }}
                >
                  Soluções para a vida
                </motion.p>
              </motion.div>
            </motion.div>
          )}

          {/* Stage 2: Transição elegante */}
          {stage === 2 && (
            <motion.div
              key='transition'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className='text-center'
            >
              <motion.div
                className='flex items-center justify-center gap-4'
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
              >
                <motion.div
                  className='w-3 h-3 rounded-full bg-emerald-400'
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.4, 1, 0.4],
                  }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                />
                <motion.div
                  className='w-3 h-3 rounded-full bg-slate-400'
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.4, 1, 0.4],
                  }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: 0.3 }}
                />
                <motion.div
                  className='w-3 h-3 rounded-full bg-emerald-400'
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.4, 1, 0.4],
                  }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: 0.6 }}
                />
              </motion.div>
            </motion.div>
          )}

          {/* Stage 3: Aion */}
          {stage === 3 && (
            <motion.div
              key='aion'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 1 }}
              className='text-center'
            >
              {/* Logo Aion */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 150,
                  damping: 15,
                  delay: 0.2,
                }}
                className='inline-block mb-10'
              >
                <motion.div className='relative' whileHover={{ scale: 1.05 }}>
                  {/* Sombra suave */}
                  <motion.div
                    className='absolute -inset-4 bg-slate-200 rounded-3xl blur-2xl'
                    animate={{ opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />

                  {/* Container do logo */}
                  <div className='relative bg-white rounded-3xl shadow-2xl shadow-slate-300/50 p-8 w-48 h-48 flex items-center justify-center'>
                    {/* SUBSTITUA O SRC PELO PATH CORRETO DA SUA IMAGEM */}
                    <img
                      src='aion-logo.png'
                      alt='Aion Logo'
                      className='w-full h-full object-contain'
                    />
                  </div>
                </motion.div>
              </motion.div>

              {/* Nome e tagline */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 1 }}
              >
                <motion.h1
                  className='text-7xl md:text-8xl font-bold mb-5 tracking-tight text-slate-700'
                  initial={{ letterSpacing: "0.3em", opacity: 0 }}
                  animate={{ letterSpacing: "0em", opacity: 1 }}
                  transition={{ duration: 1, delay: 0.8 }}
                >
                  Aion
                </motion.h1>

                <motion.div
                  className='h-1 w-40 mx-auto bg-linear-to-r from-transparent via-slate-400 to-transparent mb-6 rounded-full'
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1.3, duration: 0.8 }}
                />

                <motion.p
                  className='text-slate-600 text-base tracking-[0.15em] uppercase font-light leading-relaxed'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.6, duration: 0.8 }}
                >
                  Analytics, Intelligence
                  <br />
                  Optimization & Networks
                </motion.p>
              </motion.div>
            </motion.div>
          )}

          {/* Stage 4: Título do Projeto */}
          {stage === 4 && (
            <div className='min-h-screen bg-linear-to-br from-slate-50 via-green-50 to-slate-50 relative overflow-hidden'>
              {/* Animated background elements */}
              <div className='absolute inset-0 overflow-hidden pointer-events-none'>
                <ScrollReveal animation='scale' duration={0.7}>
                  <div className='absolute top-20 left-10 w-72 h-72 bg-green-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse' />
                </ScrollReveal>
                <ScrollReveal animation='scale' duration={0.8} delay={0.3}>
                  <div className='absolute top-40 right-10 w-96 h-96 bg-green-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-1000' />
                </ScrollReveal>
                <ScrollReveal animation='scale' duration={0.9} delay={0.5}>
                  <div className='absolute bottom-20 left-1/2 w-80 h-80 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-2000' />
                </ScrollReveal>
              </div>
              <div className='relative z-10'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16'>
                  {/* Logo and Title */}
                  <ScrollReveal animation='fadeUp' duration={0.6}>
                    <div className='text-center mb-12'>
                      <div className='inline-flex items-center justify-center w-20 h-20 bg-linear-to-br from-green-600 to-green-700 rounded-2xl shadow-2xl mb-6 transform hover:scale-105 transition-transform duration-300'>
                        <BarChart3 className='w-10 h-10 text-white' />
                      </div>
                      <h1 className='text-5xl md:text-6xl font-bold text-slate-900 mb-4 tracking-tight'>
                        Simulador Setor Comercial{" "}
                        <span className='bg-linear-to-r from-green-600 to-green-700 bg-clip-text text-transparent'>
                          Concessão
                        </span>
                      </h1>
                      <p className='text-xl md:text-2xl text-slate-800 mb-3 font-light'>
                        Projeção e Resultados em Tempo Real
                      </p>
                      <p className='text-base text-slate-800 max-w-2xl mx-auto'>
                        Preencha as premissas e visualize os recursos
                        necessários para a implantação do setor comercial em
                        concessões, e seus impactos.
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
                        desc: "Insira os inputs e obtenha instantaneamente os recursos necessários para a implantação do setor comercial",
                        boxClass: "from-green-100 to-green-200",
                      },
                      {
                        icon: <TrendingUp className='w-7 h-7 text-green-700' />,
                        title: "Visualização Dinâmica",
                        desc: "Gráficos interativos que mostram os recursos, custos e impactos no negócio",
                        boxClass: "from-green-100 to-green-200",
                      },
                      {
                        icon: (
                          <FileSpreadsheet className='w-7 h-7 text-green-700' />
                        ),
                        title: "Insights Inteligentes",
                        desc: "Análises automáticas que identificam oportunidades de melhoria e comparam seus resultados",
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
          )}
        </AnimatePresence>
      </div>

      {/* Botão de pular */}
      {stage < 4 && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.5, y: 0 }}
          whileHover={{
            opacity: 1,
            scale: 1.05,
            boxShadow: "0 10px 30px rgba(16, 185, 129, 0.2)",
          }}
          transition={{ delay: 1 }}
          className='absolute bottom-8 right-8 px-6 py-3 rounded-full bg-green-300 border-2 border-slate-200 text-slate-600 text-sm font-medium tracking-wide hover:border-emerald-400 hover:text-green-600 transition-all shadow-lg'
          onClick={handleSkip}
        >
          Pular Intro →
        </motion.button>
      )}
    </div>
  );
}
