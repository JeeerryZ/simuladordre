import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formSchema, FormValues } from "@/schemas/formSchema";
import {
  ANOS_INICIO,
  ANOS_PROJECAO,
  BASE_PREÇO_MEDIO,
  MODELO_COBRANCA_CONCESSAO,
  MODELO_FINAL_COBRANCA,
  MODELO_INICIAL_COBRANCA,
  REGIOES,
  SETORES_EMPRESA,
  SETORES_LABELS,
  TIPOLOGIA_FATURAMENTO,
} from "@/types/form.types";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Loader2, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FormSelect } from "./formSelect";
import { Slider } from "./ui/slider";

const defaultValues: Partial<FormValues> = {
  habitantes: undefined,
  regiao: undefined,
  modeloCobrancaConcessao: undefined,
  taxaGeracaoResiduos: undefined,
  taxaColetaResiduos: 85,
  anoInicio: undefined,
  crescimentoPopulacionalAnual: 3.0,
  habitantesPorResidencia: undefined,
  modeloInicialCobranca: undefined,
  anosProjecao: undefined,
  modeloFinalCobranca: undefined,
  receitaRepassada: 0.5,
  setores: [],
  tipologiaFaturamento: undefined,
  incrementoReceita: 5.0,
};

export default function Formulario() {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema) as any,
    defaultValues: defaultValues,
  });

  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post("/api/calculate", data);
      sessionStorage.setItem("excelOutput", JSON.stringify(response.data));
      router.push("/resultados");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
      {/* Habitantes */}
      <Card className='bg-white rounded-xl py-3 px-3 shadow border border-green-100'>
        <CardContent className='p-0'>
          <label
            htmlFor='habitantes'
            className='font-semibold text-slate-800 block mb-1 text-[15px]'
          >
            Habitantes
          </label>
          <Controller
            name='habitantes'
            control={control}
            defaultValue={defaultValues.habitantes}
            render={({ field }) => (
              <input
                type='text'
                inputMode='numeric'
                id='habitantes'
                value={
                  field.value !== undefined
                    ? field.value.toLocaleString("pt-BR")
                    : ""
                }
                onChange={(e) => {
                  const raw = e.target.value.replace(/\D/g, "");
                  const num = raw ? parseInt(raw, 10) : undefined;
                  field.onChange(num);
                }}
                className={`w-full rounded-md border border-green-200 px-3 py-2 text-base bg-white focus:ring-green-400 focus:border-green-600 ${
                  errors.habitantes ? "border-red-400" : ""
                }`}
                placeholder='Ex: 32.000'
              />
            )}
          />
          {errors.habitantes && (
            <p className='text-red-600 text-xs mt-1'>
              {errors.habitantes.message}
            </p>
          )}
        </CardContent>
      </Card>

      {/* Região */}
      <Card className='bg-white rounded-xl py-3 px-3 shadow border border-green-100'>
        <CardContent className='p-0'>
          <label
            htmlFor='regiao'
            className='font-semibold text-slate-800 block mb-1 text-[15px]'
          >
            Região
          </label>
          <Controller
            name='regiao'
            control={control}
            render={({ field }) => (
              <FormSelect
                value={field.value ?? ""}
                onChange={field.onChange}
                options={REGIOES}
                error={errors.regiao}
                placeholder={"Selecione uma região"}
              />
            )}
          />
          {errors.regiao && (
            <span className='text-xs text-red-500'>
              {errors.regiao.message}
            </span>
          )}
        </CardContent>
      </Card>

      {/* Modelo de Cobrança da Concessão */}
      <Card className='bg-white rounded-xl py-3 px-3 shadow border border-green-100'>
        <CardContent className='p-0'>
          <label
            htmlFor='cobranca-concessao'
            className='font-semibold text-slate-800 block mb-1 text-[15px]'
          >
            Modelo de Cobrança da Concessão
          </label>
          <Controller
            name='modeloCobrancaConcessao'
            control={control}
            defaultValue={defaultValues.modeloCobrancaConcessao}
            render={({ field }) => (
              <FormSelect
                value={field.value ?? ""}
                onChange={field.onChange}
                options={MODELO_COBRANCA_CONCESSAO}
                error={errors.modeloCobrancaConcessao}
                placeholder={"Selecione um modelo"}
              />
            )}
          />
          {errors.modeloCobrancaConcessao && (
            <p className='text-red-600 text-xs mt-1'>
              {errors.modeloCobrancaConcessao.message}
            </p>
          )}
        </CardContent>
      </Card>

      {/* Taxa de Geração de Resíduos */}
      <Card className='bg-white rounded-xl py-3 px-3 shadow border border-green-100'>
        <CardContent className='p-0'>
          <label
            htmlFor='taxa-geracao-residuos'
            className='font-semibold text-slate-800 block mb-1 text-[15px]'
          >
            Taxa de Geração de Resíduos
          </label>
          <Controller
            name='taxaGeracaoResiduos'
            control={control}
            defaultValue={defaultValues.taxaGeracaoResiduos}
            render={({ field }) => (
              <input
                type='number'
                inputMode='decimal'
                step={0.001}
                pattern='\d+(\.\d{0,3})?'
                id='taxa-geracao-residuos'
                value={field.value ?? ""}
                onChange={(e) => {
                  const val = e.target.value.replace(",", ".");
                  field.onChange(val);
                }}
                className={`w-full rounded-md border border-green-200 px-3 py-2 text-base bg-white focus:ring-green-400 focus:border-green-600 ${
                  errors.taxaGeracaoResiduos ? "border-red-400" : ""
                }`}
                placeholder='Ex: 1,020'
              />
            )}
          />
          {errors.taxaGeracaoResiduos && (
            <p className='text-red-600 text-xs mt-1'>
              {errors.taxaGeracaoResiduos.message}
            </p>
          )}
        </CardContent>
      </Card>

      {/* Taxa de Coleta de Resíduos (Slider) */}
      <Card className='bg-white rounded-xl py-3 px-3 shadow border border-green-100'>
        <CardContent className='p-0'>
          <label
            htmlFor='taxa-coleta'
            className='font-semibold text-slate-800 block mb-1 text-[15px]'
          >
            Taxa de Coleta de Resíduos
          </label>
          <Controller
            name='taxaColetaResiduos'
            control={control}
            defaultValue={defaultValues.taxaColetaResiduos}
            render={({ field }) => {
              const sliderValue =
                field.value ?? defaultValues.taxaColetaResiduos;

              return (
                <>
                  <Slider
                    id='taxa-coleta'
                    className='w-full pt-2'
                    min={50}
                    max={100}
                    step={1}
                    value={[sliderValue]}
                    onValueChange={(value) => field.onChange(value[0])}
                  />
                  <p className='text-slate-700 text-sm mt-2'>{sliderValue}%</p>
                </>
              );
            }}
          />
        </CardContent>
      </Card>

      {/* Ano de Início da Concessão */}
      <Card className='bg-white rounded-xl py-3 px-3 shadow border border-green-100'>
        <CardContent className='p-0'>
          <label
            htmlFor='ano-inicio'
            className='font-semibold text-slate-800 block mb-1 text-[15px]'
          >
            Ano de Início da Concessão
          </label>
          <Controller
            name='anoInicio'
            control={control}
            defaultValue={defaultValues.anoInicio}
            render={({ field }) => (
              <FormSelect
                value={field.value ?? ""}
                onChange={field.onChange}
                options={ANOS_INICIO}
                error={errors.anoInicio}
                placeholder={"Selecione um ano"}
              />
            )}
          />
          {errors.anoInicio && (
            <p className='text-red-600 text-xs mt-1'>
              {errors.anoInicio.message}
            </p>
          )}
        </CardContent>
      </Card>

      {/* Crescimento Populacional Anual */}
      <Card className='bg-white rounded-xl py-3 px-3 shadow border border-green-100'>
        <CardContent className='p-0'>
          <label
            htmlFor='crescimento-populacional-anual'
            className='font-semibold text-slate-800 block mb-1 text-[15px]'
          >
            Crescimento Populacional Anual
          </label>
          <Controller
            name='crescimentoPopulacionalAnual'
            control={control}
            defaultValue={defaultValues.crescimentoPopulacionalAnual}
            render={({ field }) => {
              const sliderValue =
                field.value ?? defaultValues.crescimentoPopulacionalAnual;

              return (
                <>
                  <Slider
                    id='crescimento-populacional-anual'
                    className='w-full pt-2'
                    min={0}
                    max={5}
                    step={0.1}
                    value={[sliderValue]}
                    onValueChange={(value) => field.onChange(value[0])}
                  />
                  <p className='text-slate-700 text-sm mt-2'>{sliderValue}%</p>
                </>
              );
            }}
          />
        </CardContent>
      </Card>

      {/* Habitantes por Residência */}
      <Card className='bg-white rounded-xl py-3 px-3 shadow border border-green-100'>
        <CardContent className='p-0'>
          <label
            htmlFor='habitantes-por-residencia'
            className='font-semibold text-slate-800 block mb-1 text-[15px]'
          >
            Habitantes por Residência
          </label>
          <input
            id='habitantes-por-residencia'
            type='number'
            placeholder='Ex: 3'
            {...register("habitantesPorResidencia")}
            className={`w-full rounded-md border border-green-200 px-3 py-2 text-base bg-white focus:ring-green-400 focus:border-green-600 ${
              errors.habitantesPorResidencia ? "border-red-400" : ""
            }`}
          />
          {errors.habitantesPorResidencia && (
            <p className='text-red-600 text-xs mt-1'>
              {errors.habitantesPorResidencia.message}
            </p>
          )}
        </CardContent>
      </Card>

      {/* Modelo Inicial de Cobrança */}
      <Card className='bg-white rounded-xl py-3 px-3 shadow border border-green-100'>
        <CardContent className='p-0'>
          <label
            htmlFor='modelo-inicial-cobranca'
            className='font-semibold text-slate-800 block mb-1 text-[15px]'
          >
            Modelo Inicial de Cobrança
          </label>
          <Controller
            name='modeloInicialCobranca'
            control={control}
            defaultValue={defaultValues.modeloInicialCobranca}
            render={({ field }) => (
              <FormSelect
                value={field.value ?? ""}
                onChange={field.onChange}
                options={MODELO_INICIAL_COBRANCA}
                error={errors.modeloInicialCobranca}
                placeholder={"Selecione um modelo"}
              />
            )}
          />
          {errors.modeloInicialCobranca && (
            <p className='text-red-600 text-xs mt-1'>
              {errors.modeloInicialCobranca.message}
            </p>
          )}
        </CardContent>
      </Card>

      {/* Anos de Projeção */}
      <Card className='bg-white rounded-xl py-3 px-3 shadow border border-green-100'>
        <CardContent className='p-0'>
          <label
            htmlFor='anos-projecao'
            className='font-semibold text-slate-800 block mb-1 text-[15px]'
          >
            Ano de Projeção
          </label>
          <Controller
            name='anosProjecao'
            control={control}
            defaultValue={defaultValues.anosProjecao}
            render={({ field }) => (
              <FormSelect
                value={field.value ?? ""}
                onChange={field.onChange}
                options={ANOS_PROJECAO}
                error={errors.anosProjecao}
                placeholder={"Selecione um ano"}
              />
            )}
          />
          {errors.anosProjecao && (
            <p className='text-red-600 text-xs mt-1'>
              {errors.anosProjecao.message}
            </p>
          )}
        </CardContent>
      </Card>

      {/* Modelo Final de Cobrança */}
      <Card className='bg-white rounded-xl py-3 px-3 shadow border border-green-100'>
        <CardContent className='p-0'>
          <label
            htmlFor='modelo-final-cobranca'
            className='font-semibold text-slate-800 block mb-1 text-[15px]'
          >
            Modelo Final de Cobrança
          </label>
          <Controller
            name='modeloFinalCobranca'
            control={control}
            defaultValue={defaultValues.modeloFinalCobranca}
            render={({ field }) => (
              <FormSelect
                value={field.value ?? ""}
                onChange={field.onChange}
                options={MODELO_FINAL_COBRANCA}
                error={errors.modeloFinalCobranca}
                placeholder={"Selecione um modelo"}
              />
            )}
          />
          {errors.modeloFinalCobranca && (
            <p className='text-red-600 text-xs mt-1'>
              {errors.modeloFinalCobranca.message}
            </p>
          )}
        </CardContent>
      </Card>

      {/* Receita Repassada */}
      <Card className='bg-white rounded-xl py-3 px-3 shadow border border-green-100'>
        <CardContent className='p-0'>
          <label
            htmlFor='receita-repassada'
            className='font-semibold text-slate-800 block mb-1 text-[15px]'
          >
            Receita Repassada
          </label>
          <Controller
            name='receitaRepassada'
            control={control}
            defaultValue={defaultValues.receitaRepassada}
            render={({ field }) => {
              const sliderValue = field.value ?? defaultValues.receitaRepassada;
              return (
                <>
                  <Slider
                    id='receita-repassada'
                    className='w-full pt-2'
                    min={0}
                    max={5}
                    step={0.1}
                    value={[sliderValue]}
                    onValueChange={(value) => {
                      field.onChange(value);
                    }}
                  />
                  <p className='text-slate-700 text-sm mt-2'>{sliderValue}%</p>
                </>
              );
            }}
          />
        </CardContent>
      </Card>

      {/* Setores da Empresa */}
      <Card className='bg-white rounded-xl py-3 px-3 shadow border border-green-100'>
        <CardContent className='p-0'>
          <label className='font-semibold text-slate-800 mb-2 block text-[15px]'>
            Áreas do Departamento Comercial
          </label>
          <div className='grid grid-cols-1 gap-1'>
            {SETORES_EMPRESA.map((setor) => (
              <Controller
                key={setor}
                name='setores'
                control={control}
                render={({ field }) => (
                  <label className='flex items-center gap-2 px-1 py-1 rounded hover:bg-green-50'>
                    <input
                      type='checkbox'
                      checked={field.value?.includes(setor) || false}
                      onChange={() => {
                        const novaSelecao = field.value?.includes(setor)
                          ? field.value.filter((s) => s !== setor)
                          : [...(field.value || []), setor];
                        field.onChange(novaSelecao);
                      }}
                      className='accent-green-600 w-4 h-4'
                    />
                    <span className='text-slate-700 text-sm'>
                      {SETORES_LABELS[setor]}
                    </span>
                  </label>
                )}
              />
            ))}
          </div>
          {errors.setores && (
            <p className='text-red-600 text-xs mt-1'>
              {errors.setores.message}
            </p>
          )}
        </CardContent>
      </Card>

      {/* Tipologia de Faturamento */}
      <Card className='bg-white rounded-xl py-3 px-3 shadow border border-green-100'>
        <CardContent className='p-0'>
          <label
            htmlFor='tipologia-faturamento'
            className='font-semibold text-slate-800 block mb-1 text-[15px]'
          >
            Tipologia de Faturamento
          </label>
          <Controller
            name='tipologiaFaturamento'
            control={control}
            defaultValue={defaultValues.tipologiaFaturamento}
            render={({ field }) => (
              <FormSelect
                value={field.value ?? ""}
                onChange={field.onChange}
                options={TIPOLOGIA_FATURAMENTO}
                error={errors.tipologiaFaturamento}
                placeholder={"Selecione uma tipologia"}
              />
            )}
          />
          {errors.tipologiaFaturamento && (
            <p className='text-red-600 text-xs mt-1'>
              {errors.tipologiaFaturamento.message}
            </p>
          )}
        </CardContent>
      </Card>

      {/* Base de Preço Médio */}
      <Card className='bg-white rounded-xl py-3 px-3 shadow border border-green-100'>
        <CardContent className='p-0'>
          <label
            htmlFor='base-preco-medio'
            className='font-semibold text-slate-800 block mb-1 text-[15px]'
          >
            Base de Preço Médio
          </label>
          <Controller
            name='basePrecoMedio'
            control={control}
            defaultValue={defaultValues.basePrecoMedio}
            render={({ field }) => (
              <FormSelect
                value={field.value ?? ""}
                onChange={field.onChange}
                options={BASE_PREÇO_MEDIO}
                error={errors.basePrecoMedio}
                placeholder={"Selecione uma base"}
              />
            )}
          />
          {errors.basePrecoMedio && (
            <p className='text-red-600 text-xs mt-1'>
              {errors.basePrecoMedio.message}
            </p>
          )}
        </CardContent>
      </Card>

      {/* Botão Enviar */}
      <Button
        type='submit'
        className={`w-full bg-linear-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3 text-base font-semibold rounded-lg shadow-xl mt-2
        ${isSubmitting ? "cursor-not-allowed opacity-70" : ""}`}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className='animate-spin w-5 h-5 mr-2' />
            Enviando...
          </>
        ) : (
          <>
            <Sparkles className='w-5 h-5 mr-2' />
            Enviar Dados
          </>
        )}
      </Button>
    </form>
  );
}
