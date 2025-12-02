import { FormValues } from "@/schemas/formSchema";
import { ExcelOutput } from "./graphApi.types";

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export type ResponseBody = {
  messages: ChatMessage[];
  excelOutput: ExcelOutput;
  formValues: FormValues;
};
