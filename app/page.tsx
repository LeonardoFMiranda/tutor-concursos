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
  Sparkle,
  Lightning,
} from "@phosphor-icons/react/dist/ssr";

export default function LandingPage() {
  return (
    <div className="min-h-dvh flex flex-col font-sans text-gray-800">

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between py-4 px-4 sm:px-8">
          <div className="flex items-center gap-2.5">
            <Books size={28} color="var(--color-primary)" weight="bold" />
            <span className="text-[var(--color-primary)] font-extrabold text-xl tracking-tight">
              Gabarita<span className="text-[#168821]">.AI</span>
            </span>
          </div>

          <nav className="flex items-center gap-3">
            <Show when="signed-out">
              <Link
                href="/sign-in"
                className="text-sm font-semibold text-gray-600 hover:text-[var(--color-primary)] transition-colors px-3 py-2"
              >
                Entrar
              </Link>
              <Link
                href="/sign-up"
                className="inline-flex items-center gap-1.5 bg-[var(--color-primary)] text-white font-bold text-sm px-5 py-2.5 rounded-full hover:bg-[#0c326f] transition-colors shadow-sm"
              >
                <User size={16} weight="bold" />
                Criar conta
              </Link>
            </Show>
            <Show when="signed-in">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-1.5 bg-[var(--color-primary)] text-white font-bold text-sm px-5 py-2.5 rounded-full hover:bg-[#0c326f] transition-colors shadow-sm"
              >
                <User size={16} weight="bold" />
                Acessar Painel
              </Link>
            </Show>
          </nav>
        </div>
      </header>

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <main className="flex-1 bg-white">
        <section className="bg-[#1351b4] text-white relative overflow-hidden">
          {/* Gradiente decorativo de fundo */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 70% 60% at 85% 20%, rgba(255,255,255,0.07) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 10% 90%, rgba(12,50,111,0.6) 0%, transparent 60%)",
            }}
          />

          <div className="max-w-[1200px] mx-auto px-4 sm:px-8 pt-14 pb-0 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

              {/* ── Coluna de Texto ─── */}
              <div className="max-w-[560px]">

                {/* Badge IA */}
                <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/90 text-xs font-semibold px-3.5 py-1.5 rounded-full mb-6 backdrop-blur-sm">
                  <Sparkle size={14} weight="fill" className="text-[#7dd3fc]" />
                  Gerado por IA em segundos
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold mb-5 leading-[1.1] tracking-tight">
                  Estude para Concursos com{" "}
                  <span className="text-[#4ade80]">Inteligência Artificial</span>
                </h1>

                <p className="text-[1.1rem] md:text-xl text-white/85 mb-9 leading-relaxed font-medium">
                  Questões focadas na sua banca, correção automática e um tutor
                  de IA disponível 24&nbsp;h para tirar todas as suas dúvidas.
                </p>

                {/* CTAs */}
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <Show when="signed-out">
                    <Link
                      href="/sign-up"
                      className="inline-flex items-center justify-center gap-2 bg-[#168821] text-white font-bold text-base px-7 py-3.5 rounded-full hover:bg-[#126b1a] transition-colors shadow-lg"
                    >
                      Começar agora
                      <ArrowRight size={18} weight="bold" />
                    </Link>
                    <Link
                      href="#como-funciona"
                      className="inline-flex items-center justify-center gap-2 border border-white/40 text-white font-semibold text-base px-6 py-3.5 rounded-full hover:bg-white/10 transition-colors"
                    >
                      Ver como funciona
                    </Link>
                  </Show>
                  <Show when="signed-in">
                    <Link
                      href="/praticar"
                      className="inline-flex items-center justify-center gap-2 bg-[#168821] text-white font-bold text-base px-7 py-3.5 rounded-full hover:bg-[#126b1a] transition-colors shadow-lg"
                    >
                      Gerar Caderno de Questões
                      <ArrowRight size={18} weight="bold" />
                    </Link>
                  </Show>
                </div>

                {/* Prova Social */}
                <div className="flex items-center gap-2 text-white/70 text-sm font-medium">
                  <Lightning size={16} weight="fill" className="text-[#facc15]" />
                  <span>+2.400 questões geradas esta semana · 8 bancas suportadas</span>
                </div>
              </div>

              {/* ── Coluna Visual (Card) ─── */}
              <div className="relative select-none pb-0 lg:pb-0">
                {/* Sombra suave atrás do card */}
                <div
                  aria-hidden
                  className="absolute -inset-4 rounded-3xl"
                  style={{
                    background:
                      "radial-gradient(ellipse 80% 70% at 50% 50%, rgba(255,255,255,0.12) 0%, transparent 80%)",
                    filter: "blur(12px)",
                  }}
                />

                <div
                  className="bg-white text-gray-800 rounded-2xl relative"
                  style={{
                    boxShadow:
                      "0 20px 60px -10px rgba(0,0,0,0.35), 0 4px 16px -4px rgba(0,0,0,0.18)",
                  }}
                >
                  {/* Topo do card */}
                  <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-gray-100">
                    <span className="bg-blue-50 text-[#1351b4] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      CEBRASPE · Direito Constitucional
                    </span>
                    <span className="text-gray-400 text-xs font-semibold">Questão 1</span>
                  </div>

                  {/* Enunciado */}
                  <div className="px-6 py-5">
                    <p className="text-base font-semibold leading-relaxed text-gray-700 mb-6">
                      Julgue o item: A Constituição Federal de 1988 pode ser
                      classificada como promulgada, rígida e analítica.
                    </p>

                    {/* Botões Certo/Errado */}
                    <div className="flex gap-3 mb-5">
                      <div className="flex-1 bg-green-50 border-2 border-green-500 text-green-700 font-bold text-center py-3 rounded-xl flex items-center justify-center gap-2">
                        <CheckCircle size={20} weight="fill" />
                        Certo
                      </div>
                      <div className="flex-1 bg-gray-50 border-2 border-gray-200 text-gray-400 font-bold text-center py-3 rounded-xl flex items-center justify-center gap-2">
                        Errado
                      </div>
                    </div>

                    {/* Feedback IA */}
                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3">
                      <div className="text-[#1351b4] shrink-0 mt-0.5">
                        <Robot size={24} weight="duotone" />
                      </div>
                      <div>
                        <p className="text-xs text-[#1351b4] font-bold mb-1 uppercase tracking-wide">
                          Tutor IA
                        </p>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          Exatamente! Ela é{" "}
                          <strong className="text-gray-800">promulgada</strong> pois
                          derivou de uma Constituinte,{" "}
                          <strong className="text-gray-800">rígida</strong> por
                          exigir processo mais árduo, e{" "}
                          <strong className="text-gray-800">analítica</strong> pois
                          desce a minúcias.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Faixa de Bancas (base do hero azul) ─── */}
            <div className="mt-12 border-t border-white/15 py-5 flex flex-wrap items-center gap-3 lg:gap-4">
              <span className="text-white/50 text-xs font-semibold uppercase tracking-widest shrink-0">
                Questões no estilo de:
              </span>
              {["CEBRASPE", "FGV", "FCC", "VUNESP", "IBFC", "AOCP", "CONSULPLAN"].map((banca) => (
                <span
                  key={banca}
                  className="bg-white/10 border border-white/20 text-white/80 text-xs font-bold px-3 py-1 rounded-full"
                >
                  {banca}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── Funcionalidades ────────────────────────────────────────────────── */}
        <section id="como-funciona" className="bg-[#f8f9fa] py-16 border-b border-gray-200">
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
      </main>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <footer className="bg-[#0c326f] text-white pt-12 pb-6 border-t-[6px] border-[#168821]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8 border-b border-white/20 pb-8">
            <div className="flex items-center gap-3">
              <Books size={36} color="white" weight="bold" />
              <span className="font-bold text-xl">Gabarita.AI</span>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between text-sm opacity-70 gap-4">
            <p>Projeto de uso educacional e demonstração.</p>
            <p>Aviso: Respostas geradas por IA. Consulte fontes oficiais.</p>
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
