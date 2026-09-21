import { auth } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";
import { db } from "@/lib/db";
import QuestionView from "./question-view";
import ResultsView from "./results-view";

export const metadata = {
  title: "Resolução | Tutor de Concursos",
};

export default async function PracticeSessionPage({
  params,
}: {
  params: Promise<{ sessionId: string }>;
}) {
  const { userId } = await auth();
  const { sessionId } = await params;

  if (!userId) {
    redirect("/sign-in");
  }

  // Busca a sessão e as questões associadas a ela
  const session = await db.practiceSession.findUnique({
    where: { id: sessionId },
    include: {
      questions: {
        orderBy: { createdAt: "asc" },
      },
    },
  });

  if (!session || session.userId !== userId) {
    notFound();
  }

  // Busca as tentativas do usuário para as questões desta sessão
  const questionIds = session.questions.map((q) => q.id);
  const attempts = await db.attempt.findMany({
    where: {
      userId,
      questionId: { in: questionIds },
    },
  });

  const totalQuestions = session.questions.length;
  const answeredQuestionIds = new Set(attempts.map((a) => a.questionId));

  // Encontra a primeira questão não respondida
  const currentQuestionIndex = session.questions.findIndex(
    (q) => !answeredQuestionIds.has(q.id)
  );

  const isFinished = currentQuestionIndex === -1;

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      {!isFinished ? (
        <QuestionView
          question={session.questions[currentQuestionIndex]}
          currentIndex={currentQuestionIndex + 1}
          totalQuestions={totalQuestions}
        />
      ) : (
        <ResultsView total={totalQuestions} attempts={attempts} />
      )}
    </div>
  );
}
