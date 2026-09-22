import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import Link from "next/link";
import { ChatCircleText, PlusCircle } from "@phosphor-icons/react/dist/ssr";
import DeleteConversationButton from "./delete-conversation-button";

export const metadata = {
  title: "Tutor IA | Tutor de Concursos",
};

export default async function TutorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const conversations = await db.conversation.findMany({
    where: { userId },
    orderBy: { updatedAt: "desc" },
  });

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-73px)] h-full bg-white">
      {/* Sidebar - Histórico de conversas */}
      <aside className="w-full md:w-72 border-r border-gray-200 bg-gray-50 flex flex-col flex-shrink-0">
        <div className="p-4 border-b border-gray-200">
          <Link
            href="/tutor"
            className="w-full flex items-center justify-center gap-2 bg-[var(--color-primary)] text-white font-bold px-4 py-2 rounded hover:bg-[var(--color-primary-dark)] transition-colors"
          >
            <PlusCircle size={20} weight="bold" />
            Nova Conversa
          </Link>
        </div>
        
        <div className="flex-1 overflow-y-auto p-2">
          {conversations.length === 0 ? (
            <p className="text-sm text-gray-500 p-4 text-center">
              Nenhuma conversa recente.
            </p>
          ) : (
            <div className="space-y-1">
              {conversations.map((conv) => (
                <div key={conv.id} className="group relative flex items-center justify-between rounded hover:bg-gray-200 transition-colors w-full">
                  <Link
                    href={`/tutor/${conv.id}`}
                    className="flex-1 flex items-center gap-3 p-3 text-sm text-gray-700 truncate min-w-0"
                  >
                    <ChatCircleText size={18} className="flex-shrink-0 text-gray-500" />
                    <span className="truncate">{conv.title}</span>
                  </Link>
                  <div className="absolute right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <DeleteConversationButton id={conv.id} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </aside>

      {/* Conteúdo Principal (O Chat) */}
      <main className="flex-1 flex flex-col h-[calc(100vh-73px)] overflow-hidden">
        {children}
      </main>
    </div>
  );
}
