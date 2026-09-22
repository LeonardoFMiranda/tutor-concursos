"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export async function submitAnswerAction(questionId: string, selectedAnswer: string) {
  const { userId } = await auth();

  if (!userId) {
    return { success: false, error: "Não autorizado." };
  }

  try {
    const question = await db.question.findUnique({
      where: { id: questionId },
    });

    if (!question) {
      return { success: false, error: "Questão não encontrada." };
    }

    const isCorrect = question.correctAnswer === selectedAnswer;

    await db.attempt.create({
      data: {
        userId,
        questionId,
        selectedAnswer,
        isCorrect,
      },
    });

    // Não revalidar aqui — o router.refresh() no cliente
    // faz isso somente quando o usuário clica em "Próxima Questão",
    // evitando re-render imediato que apaga o state do componente.

    return { success: true, isCorrect };
  } catch (error: any) {
    console.error("Erro ao submeter resposta:", error);
    return { success: false, error: "Falha ao salvar a resposta." };
  }
}

export async function reportQuestionAction(questionId: string) {
  const { userId } = await auth();

  if (!userId) {
    return { success: false, error: "Não autorizado." };
  }

  try {
    const question = await db.question.update({
      where: { id: questionId },
      data: { reported: true },
    });

    return { success: true };
  } catch (error) {
    console.error("Erro ao reportar questão:", error);
    return { success: false, error: "Falha ao reportar a questão." };
  }
}
