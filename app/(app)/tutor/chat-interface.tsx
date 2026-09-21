"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, UIMessage } from "ai";
import { PaperPlaneRight, Spinner, Student, Robot } from "@phosphor-icons/react";
import ReactMarkdown from "react-markdown";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

interface ChatInterfaceProps {
  initialConversationId?: string;
  initialQuestionId?: string;
  initialMessages?: UIMessage[];
}

export default function ChatInterface({
  initialConversationId,
  initialQuestionId,
  initialMessages = [],
}: ChatInterfaceProps) {
  const router = useRouter();
  const bottomRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState("");

  const { messages, status, sendMessage } = useChat({
    id: initialConversationId ?? "new-chat",
    messages: initialMessages,
    transport: new DefaultChatTransport({
      api: "/api/chat",
      body: {
        data: {
          conversationId: initialConversationId,
          questionId: initialQuestionId,
        },
      },
      fetch: async (url, init) => {
        const response = await fetch(url, init);
        const newConversationId = response.headers.get("x-conversation-id");
        if (newConversationId && !initialConversationId) {
          window.history.replaceState(null, "", `/tutor/${newConversationId}`);
          router.refresh();
        }
        return response;
      },
    }),
  });

  const isLoading = status === "streaming" || status === "submitted";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage({ parts: [{ type: "text", text: input }], role: "user" } as any);
    setInput("");
  };

  const getTextContent = (message: UIMessage) => {
    if (!message.parts || message.parts.length === 0) {
      return typeof (message as any).content === "string"
        ? (message as any).content
        : "";
    }
    return message.parts
      .filter((part) => part.type === "text" || part.type === "reasoning")
      .map((part: any) => part.text)
      .join("\n");
  };

  // Auto-scroll para o final da tela quando chegar nova mensagem
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-full bg-white relative">
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 pb-32">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400 space-y-4">
            <Robot size={64} weight="duotone" className="text-[var(--color-primary)] opacity-50" />
            <p className="text-lg font-medium text-center max-w-md">
              Olá! Sou seu tutor particular movido a Inteligência Artificial.
              Como posso te ajudar nos estudos hoje?
            </p>
            {initialQuestionId && (
              <p className="text-sm bg-blue-50 text-blue-800 px-4 py-2 rounded border border-blue-200 mt-4">
                Contexto da questão carregado com sucesso. Envie uma mensagem para debatermos!
              </p>
            )}
          </div>
        ) : (
          <div className="space-y-6 max-w-3xl mx-auto">
            {messages.map((m) => (
              <div
                key={m.id}
                className={clsx(
                  "flex gap-4",
                  m.role === "user" ? "flex-row-reverse" : "flex-row"
                )}
              >
                <div className={clsx(
                  "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white shadow-sm",
                  m.role === "user" ? "bg-gray-800" : "bg-[var(--color-primary)]"
                )}>
                  {m.role === "user" ? <Student size={24} /> : <Robot size={24} />}
                </div>

                <div
                  className={clsx(
                    "px-5 py-4 rounded-xl max-w-[85%] text-sm sm:text-base shadow-sm border",
                    m.role === "user"
                      ? "bg-gray-100 border-gray-200 text-gray-900 rounded-tr-none"
                      : "bg-white border-blue-100 text-gray-800 rounded-tl-none prose prose-blue prose-sm max-w-none"
                  )}
                >
                  {m.role === "user" ? (
                    <p className="whitespace-pre-wrap">{getTextContent(m)}</p>
                  ) : (
                    <ReactMarkdown>{getTextContent(m)}</ReactMarkdown>
                  )}
                </div>
              </div>
            ))}

            {isLoading && messages[messages.length - 1]?.role === "user" && (
              <div className="flex gap-4 flex-row">
                <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white shadow-sm bg-[var(--color-primary)]">
                  <Robot size={24} />
                </div>
                <div className="px-5 py-4 rounded-xl bg-white border border-blue-100 text-gray-500 rounded-tl-none flex items-center gap-2">
                  <Spinner size={20} className="animate-spin" />
                  <span>O tutor está digitando...</span>
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>
        )}
      </div>

      <div className="absolute bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4">
        <form
          onSubmit={handleSubmit}
          className="max-w-3xl mx-auto flex items-center gap-2"
        >
          <input
            className="flex-1 px-4 py-3 bg-gray-100 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:bg-white transition-all shadow-inner"
            value={input}
            placeholder="Digite sua dúvida aqui..."
            onChange={handleInputChange}
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="w-12 h-12 rounded-full bg-[var(--color-primary)] text-white flex flex-shrink-0 items-center justify-center hover:bg-[var(--color-primary-dark)] transition-colors disabled:opacity-50 shadow-md"
          >
            <PaperPlaneRight size={20} weight="fill" />
          </button>
        </form>
        <p className="text-center text-xs text-gray-400 mt-3 max-w-3xl mx-auto px-4">
          Questões e explicações geradas por IA podem conter imprecisões ou estar desatualizadas. 
          Confira sempre a legislação e os editais oficiais.
        </p>
      </div>
    </div>
  );
}
