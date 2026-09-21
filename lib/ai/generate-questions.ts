import { generateObject } from "ai";
import { getAIModel } from "./providers";
import {
  GenerateQuestionsInput,
  generatedQuestionsResponseSchema,
  GeneratedQuestionsResponse,
} from "../validations/schemas";

/**
 * Motor de IA para gerar questões
 */
export async function generateQuestions(
  input: GenerateQuestionsInput
): Promise<GeneratedQuestionsResponse> {
  const model = getAIModel();

  // Se a banca for CEBRASPE, forçamos o estilo CERTO_ERRADO. Caso contrário, MULTIPLE_CHOICE.
  const isCebraspe = input.banca === "CEBRASPE";
  const questionStyle = isCebraspe ? "CERTO_ERRADO" : "MULTIPLE_CHOICE";

  const systemPrompt = `Você é um elaborador sênior de questões de concursos públicos brasileiros.
Seu objetivo é gerar ${input.quantity} questões originais, inéditas e difíceis na disciplina de "${input.subject}".
${input.topic ? `O assunto específico da questão deve ser focado em: "${input.topic}".` : ""}

**REGRAS CRÍTICAS DA BANCA (${input.banca}):**
- Dificuldade desejada: ${input.difficulty}.
${
  isCebraspe
    ? `- O estilo da questão DEVE ser "CERTO_ERRADO" (Julgue o item).
- O \`statement\` (enunciado) deve conter uma afirmação clara.
- As \`options\` DEVEM ser um array vazio: [].
- O \`correctAnswer\` DEVE ser estritamente "CERTO" ou "ERRADO".`
    : `- O estilo da questão DEVE ser "MULTIPLE_CHOICE".
- O \`statement\` deve conter o enunciado completo da questão.
- As \`options\` DEVEM conter EXATAMENTE 5 alternativas (chaves "A", "B", "C", "D", "E").
- O \`correctAnswer\` DEVE ser estritamente a letra correta (ex: "A", "B", "C", "D", "E").`
}

**REGRAS DE EXPLICAÇÃO (Obrigatório):**
- Forneça um campo \`explanation\` muito detalhado (mínimo de 3 linhas) explicando o motivo do gabarito.
- Cite a lei aplicável, o artigo, a súmula ou a regra doutrinária/gramatical correta. Não invente jurisprudência.

**FORMATO DE SAÍDA ESPERADO:**
Você deve retornar estritamente um JSON respeitando o schema fornecido.
O JSON deve ter a raiz \`questions\`, contendo a lista das questões geradas.
Não retorne Markdown (como \`\`\`json), retorne puramente o objeto JSON.`;

  try {
    const { object } = await generateObject({
      model,
      system: systemPrompt,
      prompt: `Gere as ${input.quantity} questões de ${input.subject} para a banca ${input.banca}.`,
      schema: generatedQuestionsResponseSchema,
      maxRetries: 2,
    });

    return object;
  } catch (error) {
    console.error("Erro na geração de questões via LLM:", error);
    throw new Error("Falha ao gerar as questões. A Inteligência Artificial pode estar indisponível no momento.");
  }
}
