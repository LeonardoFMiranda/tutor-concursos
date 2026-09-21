import { auth } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";
import { db } from "@/lib/db";
import ChatInterface from "../chat-interface";
import { UIMessage } from "ai";

export default async function ConversationPage({
  params,
}: {
  params: Promise<{ conversationId: string }>;
}) {
  const { userId } = await auth();
  const { conversationId } = await params;

  if (!userId) {
    redirect("/sign-in");
  }

  const conversation = await db.conversation.findUnique({
    where: { id: conversationId },
    include: {
      messages: {
        orderBy: { createdAt: "asc" },
      },
    },
  });

  if (!conversation || conversation.userId !== userId) {
    notFound();
  }

  const initialMessages: UIMessage[] = conversation.messages.map((m) => ({
    id: m.id,
    role: m.role as "user" | "assistant" | "system",
    parts: [{ type: "text", text: m.content }],
  }));

  return (
    <ChatInterface
      key={conversationId}
      initialConversationId={conversationId}
      initialMessages={initialMessages}
    />
  );
}
