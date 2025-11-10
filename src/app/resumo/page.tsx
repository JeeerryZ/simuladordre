"use client";

import PageTransition from "@/components/anim/PageTransition";
import Insights from "@/components/insights";
import Resumo from "@/components/resumo";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { FormValues } from "@/schemas/formSchema";
import { ExcelOutput } from "@/types/graphApi.types";
import { ArrowLeft, BookText, CirclePlus, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ResumoPage() {
  const [excelOutput, setExcelOutput] = useState<ExcelOutput | null>(null);
  const [formData, setFormData] = useState<FormValues | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function handleReset() {
    setLoading(true);
    sessionStorage.removeItem("excelOutput");
    sessionStorage.removeItem("formData");
    router.push("/simulador");
  }

  useEffect(() => {
    const excelOutput = sessionStorage.getItem("excelOutput");
    const formData = sessionStorage.getItem("formData");

    if (!formData || !excelOutput) {
      router.push("/");
      return;
    }
    if (excelOutput && formData) {
      setFormData(JSON.parse(formData));
      setExcelOutput(JSON.parse(excelOutput));
    }
  }, []);

  if (!excelOutput || !formData) return null;

  return (
    <PageTransition>
      <section className='max-w-5xl mx-auto mt-10 px-3 animate-fade-in-slow'>
        <Card className='bg-linear-to-tr from-emerald-50 via-green-100 to-white shadow-lg border-emerald-200 rounded-2xl p-2 md:p-12 backdrop-blur-xl'>
          <CardHeader>
            <span className='inline-flex mx-auto justify-center items-center gap-2 px-4 py-1 mb-4 rounded-full bg-linear-to-r from-green-200/70 via-emerald-100/70 to-white shadow text-green-700 backdrop-blur font-semibold text-xs'>
              <BookText size={18} className='mx-1 text-green-400' />
              Panorama Geral & Insights Inteligentes
            </span>
            <CardTitle className='text-center text-3xl md:text-4xl font-extrabold text-slate-700 drop-shadow-2xl tracking-tight animate-fade-in-up mb-3'>
              Resumo Técnico e Gerencial
            </CardTitle>
            <p className='text-center text-base md:text-lg text-slate-500 font-medium mb-6'>
              Seus dados integrados e estruturados.
            </p>
          </CardHeader>
          <Resumo formValue={formData} excelOutput={excelOutput} />
          <Insights excelOutput={excelOutput} />
          <div className='flex lg:flex-row flex-col items-center justify-center gap-5 mt-4 mb-10'>
            <Button
              size={"lg"}
              className='cursor-pointer'
              variant='outline'
              onClick={() => router.push("/resultados")}
            >
              <ArrowLeft className='w-4 h-4' />
              Voltar aos Resultados
            </Button>
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
          </div>
        </Card>
      </section>
    </PageTransition>
  );
}
