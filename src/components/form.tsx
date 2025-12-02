import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogOverlay } from "@/components/ui/dialog";
import useAvatar from "@/hooks/useAvatar";
import { formSchema, FormValues } from "@/schemas/formSchema";
import {
  ANOS_INICIO,
  ANOS_TRANSICAO_MODELO_COBRANCA,
  BASE_PREÇO_MEDIO,
  LOCACAO_OU_CONSTRUCAO,
  MODELO_COBRANCA_CONCESSAO,
  MODELO_INICIAL_COBRANCA,
  REGIOES,
  SETORES_EMPRESA,
  SETORES_LABELS,
  TIPOLOGIA_FATURAMENTO,
} from "@/types/form.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogTitle } from "@radix-ui/react-dialog";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FormSelect } from "./formSelect";
import LoadingAnimation from "./loadingAnimation";
import { Slider } from "./ui/slider";

const defaultValues: Partial<FormValues> = {
  habitantes: undefined,
  regiao: undefined,
  modeloCobrancaConcessao: undefined,
  taxaColetaResiduos: 85,
  anoInicio: undefined,
  crescimentoPopulacionalAnual: 3.0,
  habitantesPorResidencia: undefined,
  modeloInicialCobranca: undefined,
  anosTransicaoModeloCobranca: undefined,
  receitaRepassada: 0.5,
  setores: [],
  tipologiaFaturamento: undefined,
  basePrecoMedio: undefined,
  locacaoOuConstrucao: undefined,
  incrementoReceita: 5.0,
};

export default function Formulario() {
  const {
    control,
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema) as any,
    defaultValues: defaultValues,
  });

  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isAnimationFinished, setIsAnimationFinished] = useState(false);

  const [modeloInicialCobranca, setModeloInicialCobranca] = useState<
    string | undefined
  >(defaultValues.modeloInicialCobranca);

  const { showTip } = useAvatar();

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    const response = await axios.post("/api/calculate", data);
    sessionStorage.setItem("formData", JSON.stringify(data));
    sessionStorage.setItem("excelOutput", JSON.stringify(response.data));
    setIsSubmitted(true);
  };

  useEffect(() => {
    if (isSubmitted && isAnimationFinished) {
      router.push("/resultados");
    }
  }, [isSubmitted, isAnimationFinished, router]);

  useEffect(() => {
    const id = setTimeout(() => {
      showTip({
        id: "welcome",
        message:
          "Preencha o formulário para simular os resultados do setor comercial.",
        duration: 8000,
      });
    }, 2000);

    return () => {
      clearTimeout(id);
    };
  }, [showTip]);

  return (
    <>
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
                  onBlur={() => {
                    const v = Number(getValues("habitantes"));
                    if (!v || Number.isNaN(v)) return;
                    if (v < 100000) {
                      showTip({
                        id: "habitantes-low",
                        message:
                          "Para cidades menores, modelos mais simples de cobrança costumam funcionar melhor.",
                        duration: 7000,
                      });
                    } else if (v > 100000 && v <= 1000000) {
                      showTip({
                        id: "habitantes-medium",
                        message:
                          "Cidades de médio porte podem se beneficiar de modelos híbridos de cobrança.",
                        duration: 7000,
                      });
                    } else if (v > 1000000) {
                      showTip({
                        id: "habitantes-high",
                        message:
                          "Grandes cidades geralmente exigem modelos de cobrança mais complexos e robustos.",
                        duration: 7000,
                      });
                    }
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
                  label='regiao'
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
                  onBlur={() => {
                    showTip({
                      id: "modelo-cobranca",
                      message:
                        "O modelo de cobrança define como os valores serão arrecadados ao longo da concessão. Escolha o que mais se aproxima da realidade do município.",
                      duration: 7000,
                    });
                  }}
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
                      onValueChange={(value) => {
                        field.onChange(value[0]);
                        showTip({
                          id: "taxa-coleta",
                          message:
                            "Taxas de coleta acima de 80% são ótimas, mas avalie se são viáveis para sua cidade. Bons indicadores refletem eficiência operacional.",
                          duration: 7000,
                        });
                      }}
                    />
                    <p className='text-slate-700 text-sm mt-2'>
                      {sliderValue}%
                    </p>
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
                  label='ano-inicio'
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  onBlur={() => {
                    showTip({
                      id: "ano-inicio",
                      message:
                        "O ano de início impacta todas as projeções, especialmente com crescimento populacional relevante. Certifique-se de que essa data esteja correta.",
                      duration: 7000,
                    });
                  }}
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
                      onValueChange={(value) => {
                        field.onChange(value[0]);
                        showTip({
                          id: "crescimento-pop",
                          message:
                            "Projeções de crescimento populacional acima de 3% podem alterar significativamente o resultado da simulação ao longo dos anos.",
                          duration: 7000,
                        });
                      }}
                    />
                    <p className='text-slate-700 text-sm mt-2'>
                      {sliderValue}%
                    </p>
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
                  label='modelo-inicial-cobranca'
                  value={field.value ?? ""}
                  onChange={(e) => {
                    field.onChange(e);
                    setModeloInicialCobranca(e);
                  }}
                  onBlur={() => {
                    showTip({
                      id: "modelo-inicial",
                      message:
                        "O modelo inicial de cobrança pode ser alterado depois dos primeiros anos. Confira se sua escolha se encaixa no contexto local.",
                      duration: 7000,
                    });
                  }}
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

        {/* Anos de Transição Modelo de Cobrança */}
        <AnimatePresence>
          {modeloInicialCobranca === "Taxa" && (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className='bg-white rounded-xl shadow border border-green-100'
            >
              <Card
                className={`bg-white rounded-xl py-3 px-3 shadow border border-green-100`}
              >
                <CardContent className='p-0'>
                  <label
                    htmlFor='anos-transicao-modelo-cobranca'
                    className='font-semibold text-slate-800 block mb-1 text-[15px]'
                  >
                    Ano de transição entre modelos de cobrança
                  </label>
                  <Controller
                    name='anosTransicaoModeloCobranca'
                    control={control}
                    defaultValue={defaultValues.anosTransicaoModeloCobranca}
                    render={({ field }) => (
                      <FormSelect
                        label='anos-transicao-modelo-cobranca'
                        value={field.value ?? ""}
                        onChange={field.onChange}
                        onBlur={() => {
                          showTip({
                            id: "anos-transicao",
                            message:
                              "Definir o tempo de transição garante adaptação dos usuários e stakeholders. Períodos curtos podem exigir campanhas de divulgação.",
                            duration: 7000,
                          });
                        }}
                        options={ANOS_TRANSICAO_MODELO_COBRANCA}
                        error={errors.anosTransicaoModeloCobranca}
                        placeholder={"Selecione um ano"}
                      />
                    )}
                  />
                  {errors.anosTransicaoModeloCobranca && (
                    <p className='text-red-600 text-xs mt-1'>
                      {errors.anosTransicaoModeloCobranca.message}
                    </p>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* % de Repasse para a Agência Reguladora*/}
        <Card className='bg-white rounded-xl py-3 px-3 shadow border border-green-100'>
          <CardContent className='p-0'>
            <label
              htmlFor='receita-repassada'
              className='font-semibold text-slate-800 block mb-1 text-[15px]'
            >
              % de Repasse para a Agência Reguladora
            </label>
            <Controller
              name='receitaRepassada'
              control={control}
              defaultValue={defaultValues.receitaRepassada}
              render={({ field }) => {
                const sliderValue =
                  field.value ?? defaultValues.receitaRepassada;
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
                        showTip({
                          id: "repasse-agencia",
                          message:
                            "A porcentagem repassada impacta a margem financeira do setor. Ajuste conforme exigências legais e acordos de concessão.",
                          duration: 7000,
                        });
                      }}
                    />
                    <p className='text-slate-700 text-sm mt-2'>
                      {sliderValue}%
                    </p>
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
                          showTip({
                            id: "setores-comercial",
                            message:
                              "Selecione todas as áreas envolvidas para garantir que os cálculos reflitam a estrutura real do setor comercial.",
                            duration: 7000,
                          });
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
                  label='tipologia-faturamento'
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  onBlur={() => {
                    showTip({
                      id: "tipologia-faturamento",
                      message:
                        "Tipologias diferentes podem trazer regras específicas para cobrança e faturamento. Certifique-se de selecionar corretamente.",
                      duration: 7000,
                    });
                  }}
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
                  label='base-preco-medio'
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

        {/* Locação ou Construção */}
        <Card className='bg-white rounded-xl py-3 px-3 shadow border border-green-100'>
          <CardContent className='p-0'>
            <label
              htmlFor='locacao-ou-construcao'
              className='font-semibold text-slate-800 block mb-1 text-[15px]'
            >
              Locação ou Construção
            </label>
            <Controller
              name='locacaoOuConstrucao'
              control={control}
              defaultValue={defaultValues.locacaoOuConstrucao}
              render={({ field }) => (
                <FormSelect
                  label='locacao-ou-construcao'
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  options={LOCACAO_OU_CONSTRUCAO}
                  error={errors.locacaoOuConstrucao}
                  placeholder={"Selecione uma opção"}
                />
              )}
            />
            {errors.locacaoOuConstrucao && (
              <p className='text-red-600 text-xs mt-1'>
                {errors.locacaoOuConstrucao.message}
              </p>
            )}
          </CardContent>
        </Card>

        {/* Botão Enviar */}
        <Button
          type='submit'
          className={`cursor-pointer w-full bg-linear-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3 text-base font-semibold rounded-lg shadow-xl mt-2
        ${isSubmitting ? "cursor-not-allowed opacity-70" : ""}`}
          disabled={isSubmitting}
        >
          <Sparkles className='w-5 h-5 mr-2' />
          Enviar Dados
        </Button>
      </form>

      {/* Dialog de Envio de Dados de Teste */}
      <Dialog open={isSubmitting}>
        <DialogOverlay className='bg-black/40 backdrop-blur-md' />
        <DialogContent
          className='transition-all duration-300 p-3 w-auto max-w-[600px] overflow-hidden rounded-3xl shadow-2xl bg-linear-to-br from-green-900/80 via-emerald-800/85 to-teal-900/80 backdrop-blur-xl border-2 border-emerald-400/30'
          showCloseButton={false}
        >
          <DialogTitle className='sr-only'>
            Simulando seus resultados...
          </DialogTitle>
          <LoadingAnimation
            onComplete={() => setIsAnimationFinished(true)}
            region={getValues("regiao")}
            habitantes={getValues("habitantes")}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
