/**
 * AI Provider Factory
 *
 * Lê a variável de ambiente AI_MODEL no formato "provider/model-name"
 * e retorna o LanguageModelV1 correspondente.
 *
 * Exemplos:
 *   AI_MODEL=openai/gpt-4o-mini
 *   AI_MODEL=openai/gpt-4o
 *   AI_MODEL=anthropic/claude-3-5-haiku-20241022
 */

import { createOpenAI } from "@ai-sdk/openai";
import { createGroq } from "@ai-sdk/groq";

export function getAIModel() {
  const raw = process.env.AI_MODEL;

  if (!raw) {
    throw new Error(
      "Variável de ambiente AI_MODEL não definida. " +
        "Defina no formato 'provider/model-name' (ex: openai/gpt-4o-mini)."
    );
  }

  const slashIdx = raw.indexOf("/");
  if (slashIdx === -1) {
    throw new Error(
      `AI_MODEL inválido: "${raw}". Use o formato "provider/model-name".`
    );
  }

  const provider = raw.slice(0, slashIdx).toLowerCase();
  const modelName = raw.slice(slashIdx + 1);

  switch (provider) {
    case "openai": {
      const openai = createOpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });
      return openai(modelName);
    }

    case "groq": {
      const groq = createGroq({
        apiKey: process.env.GROQ_API_KEY,
      });
      return groq(modelName);
    }

    default:
      throw new Error(
        `Provider "${provider}" não suportado. Providers disponíveis: openai, groq`
      );
  }
}
