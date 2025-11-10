import { Job } from "bullmq";
import { processExcelGraphSession } from "./excelQueue";

export async function syncJobProcessor(job: Job) {
  try {
    const result = await processExcelGraphSession(job.data);
    return result;
  } catch (e) {
    console.error("Erro no processamento do Job Excel:", e);
    throw e;
  }
}
