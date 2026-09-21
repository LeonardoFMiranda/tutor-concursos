import { z } from "zod";

// ---------------------------------------------------------------------------
// Enums compartilhados
// ---------------------------------------------------------------------------

export const bancaSchema = z.enum([
  "CEBRASPE",
  "FGV",
  "FCC",
  "VUNESP",
  "IBFC",
  "OUTRA",
]);

export const difficultySchema = z.enum(["FACIL", "MEDIO", "DIFICIL"]);

export const questionStyleSchema = z.enum([
  "MULTIPLE_CHOICE",
  "CERTO_ERRADO",
]);

// ---------------------------------------------------------------------------
// Schema do Onboarding
// ---------------------------------------------------------------------------

export const onboardingSchema = z.object({
  targetExam: z
    .string()
    .min(3, "Informe o concurso-alvo (mínimo 3 caracteres)")
    .max(200),
  banca: bancaSchema,
  subjects: z
    .array(z.string().min(1).max(100))
    .min(1, "Selecione pelo menos uma matéria")
    .max(20),
});

export type OnboardingInput = z.infer<typeof onboardingSchema>;

// ---------------------------------------------------------------------------
// Schema de geração de questões
// ---------------------------------------------------------------------------

export const generateQuestionsSchema = z.object({
  subject: z.string().min(2, "Informe a matéria").max(100),
  topic: z.string().max(200).optional(),
  banca: bancaSchema,
  difficulty: difficultySchema,
  quantity: z.number().int().min(3).max(10),
});

export type GenerateQuestionsInput = z.infer<typeof generateQuestionsSchema>;

// ---------------------------------------------------------------------------
// Schema de uma opção de resposta (múltipla escolha)
// ---------------------------------------------------------------------------

export const optionSchema = z.object({
  key: z.enum(["A", "B", "C", "D", "E"]),
  text: z.string().min(1),
});

// ---------------------------------------------------------------------------
// Schema de uma questão gerada pela IA
// ---------------------------------------------------------------------------

export const generatedQuestionSchema = z.object({
  statement: z.string().min(10, "Enunciado muito curto"),
  style: questionStyleSchema,
  options: z.array(optionSchema),
  correctAnswer: z.string(),
  explanation: z.string().min(20, "Explicação muito curta"),
  difficulty: difficultySchema,
});

export const generatedQuestionsResponseSchema = z.object({
  questions: z.array(generatedQuestionSchema),
});

export type GeneratedQuestion = z.infer<typeof generatedQuestionSchema>;
export type GeneratedQuestionsResponse = z.infer<
  typeof generatedQuestionsResponseSchema
>;
