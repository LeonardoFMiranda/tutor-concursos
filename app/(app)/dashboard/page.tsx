import type { Metadata } from "next";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import PerformanceChart from "./performance-chart";
import SubjectAccuracyChart from "./subject-accuracy-chart";
import RecentSessions from "./recent-sessions";
import { format, subDays } from "date-fns";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dashboard de Evolução | Tutor de Concursos",
};

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  // Busca todas as tentativas do usuário
  const allAttempts = await db.attempt.findMany({
    where: { userId },
    include: {
      question: {
        select: { subject: true },
      },
    },
  });

  const totalAttemptsCount = allAttempts.length;

  if (totalAttemptsCount === 0) {
    return (
      <div className="gov-container flex flex-col items-center justify-center min-h-[60vh] text-center" style={{ padding: "48px var(--space-4)" }}>
        <h1 className="text-3xl font-bold mb-4 text-gray-900">
          Bem-vindo ao seu Dashboard
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto">
          Aqui você acompanhará sua evolução, taxas de acerto e histórico de estudos. 
          Comece a praticar agora para gerar seus primeiros relatórios!
        </p>
        <Link href="/praticar" className="gov-btn-primary text-lg px-8 py-3">
          Começar a Praticar
        </Link>
      </div>
    );
  }

  // 1. Acerto Geral
  const correctAttempts = allAttempts.filter((a) => a.isCorrect).length;
  const globalAccuracy = Math.round((correctAttempts / totalAttemptsCount) * 100);

  // 2. Evolução 30 dias
  const thirtyDaysAgo = subDays(new Date(), 30);
  const recentAttempts = allAttempts.filter((a) => a.createdAt >= thirtyDaysAgo);
  
  // Agrupar por data (DD/MM)
  const attemptsByDate = recentAttempts.reduce((acc, attempt) => {
    const dateStr = format(new Date(attempt.createdAt), "dd/MM");
    if (!acc[dateStr]) {
      acc[dateStr] = { correct: 0, total: 0 };
    }
    acc[dateStr].total += 1;
    if (attempt.isCorrect) acc[dateStr].correct += 1;
    return acc;
  }, {} as Record<string, { correct: number; total: number }>);

  // Preencher dias vazios ou apenas mapear os existentes (mapeando apenas existentes para simplificar no MVP)
  const performanceData = Object.entries(attemptsByDate)
    .sort(([a], [b]) => {
      // Ordenação simples (isso pode falhar na virada do ano se não tivermos o ano, mas para MVP 30 dias atende)
      const [dayA, monthA] = a.split('/').map(Number);
      const [dayB, monthB] = b.split('/').map(Number);
      return new Date(2020, monthA - 1, dayA).getTime() - new Date(2020, monthB - 1, dayB).getTime();
    })
    .map(([date, stats]) => ({
      date,
      total: stats.total,
      accuracy: Math.round((stats.correct / stats.total) * 100),
    }));

  // 3. Por matéria
  const attemptsBySubject = allAttempts.reduce((acc, attempt) => {
    const subject = attempt.question.subject;
    if (!acc[subject]) {
      acc[subject] = { correct: 0, total: 0 };
    }
    acc[subject].total += 1;
    if (attempt.isCorrect) acc[subject].correct += 1;
    return acc;
  }, {} as Record<string, { correct: number; total: number }>);

  const subjectData = Object.entries(attemptsBySubject)
    .map(([subject, stats]) => ({
      subject,
      total: stats.total,
      accuracy: Math.round((stats.correct / stats.total) * 100),
    }))
    .sort((a, b) => b.accuracy - a.accuracy); // Ordena da maior para menor precisão

  // 4. Últimas sessões
  const rawSessions = await db.practiceSession.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 5,
    include: {
      questions: {
        include: {
          attempts: {
            where: { userId },
          }
        }
      }
    }
  });

  const recentSessionsData = rawSessions.map((session) => {
    let sessionCorrect = 0;
    let sessionAttempts = 0;
    
    session.questions.forEach(q => {
      if (q.attempts.length > 0) {
        sessionAttempts += 1;
        // Pega a última tentativa da questão para saber se acertou
        const latestAttempt = [...q.attempts].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())[0];
        if (latestAttempt.isCorrect) {
          sessionCorrect += 1;
        }
      }
    });

    return {
      id: session.id,
      subject: session.subject,
      createdAt: session.createdAt,
      totalQuestions: session.questions.length,
      totalAttempts: sessionAttempts,
      correctAttempts: sessionCorrect,
    };
  });

  return (
    <div className="gov-container" style={{ padding: "48px var(--space-4)" }}>
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h1 style={{ fontSize: "var(--font-size-2xl)", fontWeight: 700, marginBottom: 8, color: "#111827" }}>
            Dashboard de Evolução
          </h1>
          <p style={{ color: "var(--color-text-muted)" }}>
            Acompanhe seu desempenho e direcione seus estudos.
          </p>
        </div>
        <div className="flex items-center gap-6 bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="text-center">
            <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">Questões Resolvidas</p>
            <p className="text-2xl font-bold text-gray-900">{totalAttemptsCount}</p>
          </div>
          <div className="w-px h-10 bg-gray-200"></div>
          <div className="text-center">
            <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">Acerto Global</p>
            <p className="text-2xl font-bold text-[var(--color-primary)]">{globalAccuracy}%</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div>
          <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            Desempenho nos últimos 30 dias
          </h2>
          <PerformanceChart data={performanceData} />
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            Taxa de Acerto por Matéria
          </h2>
          <SubjectAccuracyChart data={subjectData} />
        </div>
      </div>

      <div>
        <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          Suas Últimas Sessões
        </h2>
        <RecentSessions sessions={recentSessionsData} />
      </div>
    </div>
  );
}
