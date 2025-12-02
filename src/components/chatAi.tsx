import { FormValues } from "@/schemas/formSchema";
import { ChatMessage } from "@/types/chatAi.types";
import { ExcelOutput } from "@/types/graphApi.types";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bot,
  Loader2,
  MessageCircle,
  Send,
  Sparkles,
  User,
} from "lucide-react";
import { useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { Textarea } from "./ui/textarea";

type ChatAIProps = {
  formData: FormValues;
  excelOutput: ExcelOutput;
};

export default function ChatAI({ formData, excelOutput }: ChatAIProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      const viewport = scrollRef.current.querySelector(
        "[data-radix-scroll-area-viewport]"
      );
      if (viewport) {
        setTimeout(() => {
          viewport.scrollTo({
            top: viewport.scrollHeight,
            behavior: "smooth",
          });
        }, 100);
      }
    }
  };

  async function handleSend(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage: ChatMessage = {
      role: "user",
      content: input.trim(),
    };

    const newMessages = [...messages, newMessage];
    setMessages(newMessages);
    scrollToBottom();
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post("/api/aichat", {
        messages: newMessages,
        excelOutput,
        formData,
      });
      const data = res.data;

      if (data.reply) {
        setMessages((msgs) => [
          ...msgs,
          { role: "assistant", content: data.reply },
        ]);
      } else if (data.error) {
        setMessages((msgs) => [
          ...msgs,
          {
            role: "assistant",
            content:
              "Tive um problema ao processar sua pergunta. Tente novamente em alguns instantes.",
          },
        ]);
      }
    } catch (err) {
      console.error(err);
      setMessages((msgs) => [
        ...msgs,
        {
          role: "assistant",
          content:
            "Erro de comunicação com o servidor. Verifique sua conexão e tente novamente.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className='bg-linear-to-br from-emerald-50/50 via-green-50/30 to-white shadow-lg border-emerald-200/60 rounded-2xl backdrop-blur-sm'>
      <CardHeader>
        <div className='flex items-center gap-2 mb-2'>
          <div className='p-2 rounded-full bg-linear-to-r from-green-200/70 via-emerald-100/70 to-white shadow'>
            <Sparkles className='w-5 h-5 text-green-600' />
          </div>
          <Badge
            variant='outline'
            className='bg-green-50 text-green-700 border-green-200'
          >
            Beta
          </Badge>
        </div>

        <CardTitle className='text-2xl font-bold text-slate-700 tracking-tight'>
          Chat IA – Concessões & Tarifas
        </CardTitle>

        <CardDescription className='text-slate-600 text-sm leading-relaxed'>
          Faça perguntas em linguagem natural sobre o cenário calculado.
          <br />
          <span className='text-xs text-slate-500 italic mt-1 block'>
            Ex: "Se eu reduzir a tarifa em 5%, o que muda no equilíbrio?"
          </span>
        </CardDescription>
      </CardHeader>

      <CardContent className='space-y-4'>
        {/* Área de mensagens */}
        <div ref={scrollRef}>
          <ScrollArea className='h-80 w-full rounded-lg border border-emerald-100 bg-white/40 p-4 shadow-inner'>
            <AnimatePresence mode='popLayout'>
              {messages.length === 0 && (
                <motion.div
                  key={"empty-state"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className='flex flex-col items-center justify-center h-full text-center'
                >
                  <MessageCircle className='w-12 h-12 text-green-300 mb-3' />
                  <p className='text-slate-500 text-sm'>
                    Nenhuma mensagem ainda.
                    <br />
                    <span className='text-xs'>
                      Comece perguntando algo sobre o cenário.
                    </span>
                  </p>
                </motion.div>
              )}
              <div className='flex flex-col gap-3'>
                {messages.map((m, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className={`flex gap-2 ${
                      m.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {m.role === "assistant" && (
                      <div className='shrink-0 w-8 h-8 rounded-full bg-linear-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-md'>
                        <Bot className='w-4 h-4 text-white' />
                      </div>
                    )}
                    <div
                      className={`max-w-[75%] rounded-2xl px-4 py-3 shadow-sm ${
                        m.role === "user"
                          ? "bg-linear-to-br from-green-500 to-emerald-600 text-white"
                          : "bg-white border border-emerald-100 text-slate-700"
                      }`}
                    >
                      <div className='text-xs font-semibold mb-1 opacity-70'>
                        {m.role === "user" ? "Você" : "IA Concessões"}
                      </div>
                      {/* Renderiza Markdown para IA, texto simples para user */}
                      {m.role === "assistant" ? (
                        <div className='prose prose-sm prose-green max-w-none text-sm leading-relaxed'>
                          <ReactMarkdown
                            components={{
                              code: ({ node, ...props }) =>
                                node && (node as any).inline ? (
                                  <code
                                    className='bg-green-50 text-green-800 px-1 py-0.5 rounded text-xs font-mono'
                                    {...props}
                                  />
                                ) : (
                                  <code
                                    className='block bg-slate-800 text-white p-2 rounded text-xs font-mono overflow-x-auto'
                                    {...props}
                                  />
                                ),
                              // Links
                              a: (props) => (
                                <a
                                  className='text-green-600 underline hover:text-green-700'
                                  {...props}
                                />
                              ),
                              // Listas
                              ul: (props) => (
                                <ul
                                  className='list-disc ml-4 space-y-0.5'
                                  {...props}
                                />
                              ),
                              ol: (props) => (
                                <ol
                                  className='list-decimal ml-4 space-y-0.5'
                                  {...props}
                                />
                              ),
                              // Parágrafos
                              p: (props) => (
                                <p className='mb-2 last:mb-0' {...props} />
                              ),
                              // Headers menores
                              h1: (props) => (
                                <h1
                                  className='text-base font-bold mb-1'
                                  {...props}
                                />
                              ),
                              h2: (props) => (
                                <h2
                                  className='text-sm font-bold mb-1'
                                  {...props}
                                />
                              ),
                              h3: (props) => (
                                <h3
                                  className='text-sm font-semibold mb-1'
                                  {...props}
                                />
                              ),
                            }}
                          >
                            {m.content}
                          </ReactMarkdown>
                        </div>
                      ) : (
                        <div className='text-sm leading-relaxed whitespace-pre-wrap'>
                          {m.content}
                        </div>
                      )}
                    </div>
                    {m.role === "user" && (
                      <div className='shrink-0 w-8 h-8 rounded-full bg-linear-to-br from-slate-400 to-slate-600 flex items-center justify-center shadow-md'>
                        <User className='w-4 h-4 text-white' />
                      </div>
                    )}
                  </motion.div>
                ))}
                {loading && (
                  <motion.div
                    key='loading'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className='flex gap-2 items-center'
                  >
                    <div className='shrink-0 w-8 h-8 rounded-full bg-linear-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-md'>
                      <Bot className='w-4 h-4 text-white' />
                    </div>
                    <div className='bg-white border border-emerald-100 rounded-2xl px-4 py-3 shadow-sm'>
                      <div className='flex gap-1'>
                        <span className='w-2 h-2 bg-green-500 rounded-full animate-bounce' />
                        <span
                          className='w-2 h-2 bg-green-500 rounded-full animate-bounce'
                          style={{ animationDelay: "0.2s" }}
                        />
                        <span
                          className='w-2 h-2 bg-green-500 rounded-full animate-bounce'
                          style={{ animationDelay: "0.4s" }}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </AnimatePresence>
          </ScrollArea>
        </div>

        {/* Form de input */}
        <form onSubmit={handleSend} className='flex flex-col gap-3'>
          <Textarea
            className='min-h-20 resize-none border-emerald-200 focus-visible:ring-green-500 bg-white/60 text-sm'
            placeholder='Descreva sua dúvida ou cenário em suas palavras...'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
          />

          <Button
            type='submit'
            disabled={loading || !input.trim()}
            className='self-end bg-linear-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-md transition-all hover:shadow-lg disabled:opacity-50'
          >
            {loading ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Loader2 className='w-4 h-4' />
                </motion.div>
                Analisando...
              </>
            ) : (
              <>
                <Send className='w-4 h-4 mr-2' />
                Perguntar à IA
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
