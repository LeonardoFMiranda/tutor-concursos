import type { Metadata } from "next";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import PerformanceChart from "./performance-chart";
import SubjectAccuracyChart from "./subject-accuracy-chart";
import RecentSessions from "./recent-sessions";
import { format, subDays } from "date-fns";
import Link from "next/link";
import {
  CheckCircle,
  Target,
  CalendarCheck,
  ChartLineUp,
  Lightbulb,
  ArrowRight,
} from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = {
  title: "Dashboard de Evolução | Tutor de Concursos",
};

/** Cor semântica do acerto global */
function globalAccuracyColor(accuracy: number): string {
  if (accuracy >= 70) return "#16a34a";
  if (accuracy >= 40) return "#d97706";
  return "#dc2626";
}

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  // ── Tentativas ────────────────────────────────────────────────────────────
  const allAttempts = await db.attempt.findMany({
    where: { userId },
    include: {
      question: {
        select: { subject: true },
      },
    },
  });

  const totalAttemptsCount = allAttempts.length;

  // Estado vazio geral
  if (totalAttemptsCount === 0) {
    return (
      <div
        className="gov-container flex flex-col items-center justify-center min-h-[60vh] text-center"
        style={{ padding: "64px var(--space-4)" }}
      >
        <ChartLineUp size={72} weight="duotone" className="text-gray-300 mb-6" />
        <h1 className="text-3xl font-bold mb-4 text-gray-900">
          Bem-vindo ao seu Dashboard
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto">
          Aqui você acompanhará sua evolução, taxas de acerto e histórico de
          estudos. Comece a praticar agora para gerar seus primeiros relatórios!
        </p>
        <Link href="/praticar" className="gov-btn-primary text-lg px-8 py-3">
          Começar a Praticar
        </Link>
      </div>
    );
  }

  // ── KPIs ──────────────────────────────────────────────────────────────────
  const correctAttempts = allAttempts.filter((a) => a.isCorrect).length;
  const globalAccuracy = Math.round((correctAttempts / totalAttemptsCount) * 100);

  // Sessões esta semana
  const sevenDaysAgo = subDays(new Date(), 7);
  const sessionsThisWeek = await db.practiceSession.count({
    where: { userId, createdAt: { gte: sevenDaysAgo } },
  });

  // ── Gráfico de evolução (30 dias) ─────────────────────────────────────────
  const thirtyDaysAgo = subDays(new Date(), 30);
  const recentAttempts = allAttempts.filter((a) => a.createdAt >= thirtyDaysAgo);

  const attemptsByDate = recentAttempts.reduce(
    (acc, attempt) => {
      const dateStr = format(new Date(attempt.createdAt), "dd/MM");
      if (!acc[dateStr]) acc[dateStr] = { correct: 0, total: 0 };
      acc[dateStr].total += 1;
      if (attempt.isCorrect) acc[dateStr].correct += 1;
      return acc;
    },
    {} as Record<string, { correct: number; total: number }>
  );

  const performanceData = Object.entries(attemptsByDate)
    .sort(([a], [b]) => {
      const [dayA, monthA] = a.split("/").map(Number);
      const [dayB, monthB] = b.split("/").map(Number);
      return (
        new Date(2020, monthA - 1, dayA).getTime() -
        new Date(2020, monthB - 1, dayB).getTime()
      );
    })
    .map(([date, stats]) => ({
      date,
      total: stats.total,
      accuracy: Math.round((stats.correct / stats.total) * 100),
    }));

  // ── Gráfico por matéria ───────────────────────────────────────────────────
  const attemptsBySubject = allAttempts.reduce(
    (acc, attempt) => {
      const subject = attempt.question.subject;
      if (!acc[subject]) acc[subject] = { correct: 0, total: 0 };
      acc[subject].total += 1;
      if (attempt.isCorrect) acc[subject].correct += 1;
      return acc;
    },
    {} as Record<string, { correct: number; total: number }>
  );

  const subjectData = Object.entries(attemptsBySubject)
    .map(([subject, stats]) => ({
      subject,
      total: stats.total,
      accuracy: Math.round((stats.correct / stats.total) * 100),
    }))
    .sort((a, b) => b.accuracy - a.accuracy);

  // ── Sugestão de próxima ação ──────────────────────────────────────────────
  const weakestSubject = subjectData.find((s) => s.accuracy < 50);

  // ── Últimas sessões ───────────────────────────────────────────────────────
  const rawSessions = await db.practiceSession.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 5,
    include: {
      questions: {
        include: {
          attempts: { where: { userId } },
        },
      },
    },
  });

  const recentSessionsData = rawSessions.map((session) => {
    let sessionCorrect = 0;
    let sessionAttempts = 0;

    session.questions.forEach((q) => {
      if (q.attempts.length > 0) {
        sessionAttempts += 1;
        const latestAttempt = [...q.attempts].sort(
          (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
        )[0];
        if (latestAttempt.isCorrect) sessionCorrect += 1;
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
    <div className="gov-container" style={{ padding: "64px var(--space-4) 48px" }}>

      {/* ── Título ────────────────────────────────────────────────────────── */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-1">
          Dashboard de Evolução
        </h1>
        <p className="text-gray-500 text-base">
          Acompanhe seu desempenho e direcione seus estudos.
        </p>
      </div>

      {/* ── KPIs ──────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {/* Questões Resolvidas */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex items-center gap-4">
          <div className="bg-blue-50 rounded-lg p-2.5 shrink-0">
            <CheckCircle size={28} weight="duotone" className="text-[var(--color-primary)]" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-0.5">
              Questões Resolvidas
            </p>
            <p className="text-2xl font-extrabold text-gray-900">
              {totalAttemptsCount}
            </p>
          </div>
        </div>

        {/* Acerto Global */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex items-center gap-4">
          <div className="bg-green-50 rounded-lg p-2.5 shrink-0">
            <Target size={28} weight="duotone" className="text-green-600" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-0.5">
              Acerto Global
            </p>
            <p
              className="text-2xl font-extrabold"
              style={{ color: globalAccuracyColor(globalAccuracy) }}
            >
              {globalAccuracy}%
            </p>
          </div>
        </div>

        {/* Sessões esta semana */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex items-center gap-4">
          <div className="bg-purple-50 rounded-lg p-2.5 shrink-0">
            <CalendarCheck size={28} weight="duotone" className="text-purple-600" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-0.5">
              Sessões Esta Semana
            </p>
            <p className="text-2xl font-extrabold text-gray-900">
              {sessionsThisWeek}
            </p>
          </div>
        </div>
      </div>

      {/* ── Sugestão de Próxima Ação ──────────────────────────────────────── */}
      <div className="mb-8 bg-blue-50 border border-blue-200 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <Lightbulb
            size={28}
            weight="duotone"
            className="text-[var(--color-primary)] shrink-0 mt-0.5"
          />
          <div>
            <p className="font-bold text-gray-900 text-sm mb-0.5">
              {weakestSubject
                ? `Você está com dificuldade em ${weakestSubject.subject}`
                : "Que tal fazer uma nova sessão?"}
            </p>
            <p className="text-gray-600 text-sm">
              {weakestSubject
                ? `Sua taxa de acerto em ${weakestSubject.subject} está em ${weakestSubject.accuracy}%. Um pouco mais de prática vai ajudar!`
                : "Mantenha o ritmo de estudos e acompanhe sua evolução aqui."}
            </p>
          </div>
        </div>
        <Link
          href="/praticar"
          className="inline-flex items-center gap-2 bg-[var(--color-primary)] text-white font-bold text-sm px-5 py-2.5 rounded-full hover:bg-[#0c326f] transition-colors whitespace-nowrap shrink-0"
        >
          Praticar agora
          <ArrowRight size={16} weight="bold" />
        </Link>
      </div>

      {/* ── Gráficos ──────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div>
          <h2 className="text-base font-bold text-gray-800 mb-3">
            Desempenho nos últimos 30 dias
          </h2>
          <PerformanceChart data={performanceData} />
        </div>
        <div>
          <h2 className="text-base font-bold text-gray-800 mb-3">
            Taxa de Acerto por Matéria
          </h2>
          <SubjectAccuracyChart data={subjectData} />
        </div>
      </div>

      {/* ── Últimas Sessões ───────────────────────────────────────────────── */}
      <div>
        <h2 className="text-base font-bold text-gray-800 mb-3">
          Suas Últimas Sessões
        </h2>
        <RecentSessions sessions={recentSessionsData} />
      </div>
    </div>
  );
}
