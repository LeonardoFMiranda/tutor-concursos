import Link from "next/link";
import { Show } from "@clerk/nextjs";
import {
  Books,
  Target,
  CheckCircle,
  Robot,
  ChartLineUp,
  Faders,
  WarningCircle,
  User,
  ArrowRight,
} from "@phosphor-icons/react/dist/ssr";

export default function LandingPage() {
  return (
    <div className="min-h-dvh flex flex-col font-sans text-gray-800">


      {/* ── Header Principal ───────────────────────────────────────────────── */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between py-6 px-4 sm:px-8">
          <div className="flex items-center gap-3">
            <Books size={32} color="var(--color-primary)" weight="bold" />
            <span className="text-[var(--color-primary)] font-extrabold text-2xl tracking-tight">
              Gabarita.AI
            </span>
          </div>

          <nav className="flex items-center gap-4">
            <Show when="signed-out">
              <Link
                href="/sign-in"
                className="flex items-center gap-2 bg-[#1351b4] text-white font-bold px-6 py-2.5 rounded-full hover:bg-[#0c326f] transition-colors shadow-sm"
              >
                <User size={20} weight="bold" />
                Entrar no sistema
              </Link>
            </Show>
            <Show when="signed-in">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 bg-[#1351b4] text-white font-bold px-6 py-2.5 rounded-full hover:bg-[#0c326f] transition-colors shadow-sm"
              >
                <User size={20} weight="bold" />
                Acessar Painel
              </Link>
            </Show>
          </nav>
        </div>
      </header>

      {/* ── Hero Banner ────────────────────────────────────────────────────── */}
      <main className="flex-1 bg-white">
        <section className="bg-[#1351b4] text-white relative overflow-hidden">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-8 py-16 md:py-24 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Coluna de Texto */}
              <div className="max-w-[600px]">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-[1.1] tracking-tight">
                  Plataforma Inteligente de Estudos para Concursos
                </h1>
                <p className="text-lg md:text-xl opacity-90 mb-10 leading-relaxed font-medium">
                  Acesse questões focadas na sua banca, valide seus conhecimentos
                  com correção automática e tire dúvidas diretamente com a nossa
                  Inteligência Artificial.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Show when="signed-out">
                    <Link
                      href="/sign-up"
                      className="inline-flex items-center justify-center gap-2 bg-[#168821] text-white font-bold text-lg px-8 py-4 rounded-full hover:bg-[#126b1a] transition-colors shadow-lg"
                    >
                      Começar agora
                      <ArrowRight size={20} weight="bold" />
                    </Link>
                  </Show>
                  <Show when="signed-in">
                    <Link
                      href="/praticar"
                      className="inline-flex items-center justify-center gap-2 bg-[#168821] text-white font-bold text-lg px-8 py-4 rounded-full hover:bg-[#126b1a] transition-colors shadow-lg"
                    >
                      Gerar Caderno de Questões
                      <ArrowRight size={20} weight="bold" />
                    </Link>
                  </Show>
                </div>
              </div>

              {/* Coluna Visual (Card de Questão Mockado) */}
              <div className="hidden lg:block relative select-none">
                <div className="absolute inset-0 bg-white/10 rounded-3xl transform rotate-3 scale-105"></div>
                <div className="bg-white text-gray-800 rounded-3xl p-8 shadow-2xl relative transform -rotate-1 hover:rotate-0 transition-transform duration-500">
                  <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
                    <span className="bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      CEBRASPE • Direito Constitucional
                    </span>
                    <span className="text-gray-400 font-bold text-sm">
                      Questão 1
                    </span>
                  </div>
                  <p className="text-lg font-semibold leading-relaxed mb-8 text-gray-700">
                    Julgue o item: A Constituição Federal de 1988 pode ser
                    classificada como promulgada, rígida e analítica.
                  </p>
                  <div className="flex gap-4 mb-6">
                    <div className="flex-1 bg-green-50 border-2 border-green-500 text-green-700 font-bold text-center py-3 rounded-xl flex items-center justify-center gap-2 cursor-default">
                      <CheckCircle size={24} weight="fill" />
                      Certo
                    </div>
                    <div className="flex-1 bg-gray-50 border-2 border-gray-200 text-gray-400 font-bold text-center py-3 rounded-xl flex items-center justify-center gap-2 cursor-default">
                      Errado
                    </div>
                  </div>

                  <div className="bg-blue-50/80 border border-blue-100 rounded-xl p-4 flex gap-4">
                    <div className="text-[#1351b4] mt-1 shrink-0">
                      <Robot size={28} weight="duotone" />
                    </div>
                    <div>
                      <p className="text-sm text-[#1351b4] font-bold mb-1">
                        Feedback do Tutor IA
                      </p>
                      <p className="text-sm text-gray-600 leading-relaxed font-medium">
                        Exatamente! Ela é <strong className="text-gray-800">promulgada</strong> pois
                        derivou de uma Constituinte, <strong className="text-gray-800">rígida</strong> por
                        exigir processo mais árduo, e <strong className="text-gray-800">analítica</strong> pois
                        desce a minúcias.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Funcionalidades (Serviços) ────────────────────────────────────── */}
        <section className="bg-[#f8f9fa] py-16 border-b border-gray-200">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 border-b-2 border-gray-200 pb-4">
              Serviços e Funcionalidades
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature) => (
                <FeatureCard key={feature.title} {...feature} />
              ))}
            </div>
          </div>
        </section>

        {/* ── Instituições ─────────────────────────────────────────────────── */}
        <section className="py-16">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-8">
              Bancas Suportadas
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                "CEBRASPE",
                "FGV",
                "FCC",
                "VUNESP",
                "IBFC",
                "AOCP",
                "CONSULPLAN",
              ].map((banca) => (
                <div
                  key={banca}
                  className="px-6 py-3 border border-gray-300 rounded text-gray-600 font-bold bg-white shadow-sm"
                >
                  {banca}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <footer className="bg-[#0c326f] text-white pt-12 pb-6 border-t-[8px] border-[var(--color-success)]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8 border-b border-white/20 pb-8">
            <div className="flex items-center gap-3">
              <Books size={40} color="white" weight="bold" />
              <span className="font-bold text-2xl">tutor de concursos</span>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between text-sm opacity-80 gap-4">
            <p>Projeto de uso educacional e demonstração.</p>
            <p>
              Aviso: Respostas geradas por IA. Consulte fontes oficiais.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Feature Card Component
// ---------------------------------------------------------------------------

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded p-6 shadow-sm hover:shadow-md transition-shadow group cursor-default flex flex-col h-full">
      <div className="mb-4 text-[var(--color-primary)] group-hover:scale-110 transition-transform origin-left w-max">
        {icon}
      </div>
      <h3 className="font-bold text-lg text-gray-800 mb-2 group-hover:text-[var(--color-primary)] transition-colors">
        {title}
      </h3>
      <p className="text-gray-600 text-sm leading-relaxed flex-1">
        {description}
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Features data
// ---------------------------------------------------------------------------

const features = [
  {
    icon: <Target size={32} weight="duotone" />,
    title: "Questões por instituição",
    description:
      "Suporte às principais bancas organizadoras. O sistema adapta o formato das questões automaticamente.",
  },
  {
    icon: <CheckCircle size={32} weight="duotone" />,
    title: "Correção imediata",
    description:
      "Verifique sua resposta instantaneamente, com acesso ao gabarito oficial e explicação detalhada da resolução.",
  },
  {
    icon: <Robot size={32} weight="duotone" />,
    title: "Suporte Especializado",
    description:
      "Tire dúvidas sobre a questão através de um chat integrado com Inteligência Artificial, disponível 24 horas por dia.",
  },
  {
    icon: <ChartLineUp size={32} weight="duotone" />,
    title: "Painel de Desempenho",
    description:
      "Acompanhe suas estatísticas de acertos por disciplina, histórico de resoluções e evolução geral do seu estudo.",
  },
  {
    icon: <Faders size={32} weight="duotone" />,
    title: "Filtros Personalizados",
    description:
      "Configure cadernos de questões específicos informando o concurso desejado, a banca organizadora e as disciplinas.",
  },
  {
    icon: <WarningCircle size={32} weight="duotone" />,
    title: "Reporte de Inconsistências",
    description:
      "Sinalize questões com falhas estruturais ou gabaritos desatualizados para manter a qualidade da base de dados.",
  },
];
