"use server";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { generateQuestionsSchema } from "@/lib/validations/schemas";
import { generateQuestions } from "@/lib/ai/generate-questions";
import { Banca, Difficulty, QuestionStyle } from "@prisma/client";

export async function generatePracticeSessionAction(formData: FormData) {
  const { userId } = await auth();

  if (!userId) {
    return { success: false, error: "Usuário não autenticado." };
  }

  const subject = formData.get("subject") as string;
  const topic = formData.get("topic") as string;
  const banca = formData.get("banca") as string;
  const difficulty = formData.get("difficulty") as string;
  const quantity = parseInt(formData.get("quantity") as string, 10);

  const validationResult = generateQuestionsSchema.safeParse({
    subject,
    topic: topic || undefined,
    banca,
    difficulty,
    quantity,
  });

  if (!validationResult.success) {
    return {
      success: false,
      error: validationResult.error.errors[0].message,
    };
  }

  let sessionId = "";

  try {
    // 1. Chamar a IA para gerar as questões
    const generatedData = await generateQuestions(validationResult.data);

    if (!generatedData.questions || generatedData.questions.length === 0) {
      return { success: false, error: "A Inteligência Artificial não conseguiu gerar questões válidas." };
    }

    // 2. Criar a PracticeSession no banco e inserir as questões geradas
    const session = await db.practiceSession.create({
      data: {
        userId,
        subject: validationResult.data.subject,
        topic: validationResult.data.topic,
        banca: validationResult.data.banca as Banca,
        difficulty: validationResult.data.difficulty as Difficulty,
        questions: {
          create: generatedData.questions.map((q) => ({
            subject: validationResult.data.subject,
            topic: validationResult.data.topic,
            banca: validationResult.data.banca as Banca,
            style: q.style as QuestionStyle,
            statement: q.statement,
            options: q.options || [],
            correctAnswer: q.correctAnswer,
            explanation: q.explanation,
            difficulty: q.difficulty as Difficulty,
          })),
        },
      },
    });

    sessionId = session.id;
  } catch (error: any) {
    console.error("Erro na action de gerar questões:", error);
    return { success: false, error: error.message || "Ocorreu um erro inesperado ao tentar gerar as questões." };
  }

  // Se chegou aqui, a sessão foi criada com sucesso, redireciona para a resolução
  redirect(`/praticar/${sessionId}`);
}
