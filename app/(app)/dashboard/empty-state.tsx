import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href?: string;
  cta?: string;
}

/**
 * Estado vazio reutilizável para gráficos e listas.
 * Mantém h-[300px] para evitar salto de layout quando os dados aparecerem.
 */
export default function EmptyState({
  icon,
  title,
  description,
  href,
  cta,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center h-[300px] bg-gray-50 border border-dashed border-gray-300 rounded-xl text-center px-6 gap-3">
      <div className="text-gray-300">{icon}</div>
      <div>
        <p className="font-semibold text-gray-700 text-sm mb-1">{title}</p>
        <p className="text-gray-500 text-xs leading-relaxed max-w-[220px] mx-auto">
          {description}
        </p>
      </div>
      {href && cta && (
        <Link
          href={href}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--color-primary)] border border-[var(--color-primary)] px-4 py-2 rounded-full hover:bg-blue-50 transition-colors mt-1"
        >
          {cta}
          <ArrowRight size={13} weight="bold" />
        </Link>
      )}
    </div>
  );
}
