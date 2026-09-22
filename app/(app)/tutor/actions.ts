"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

export async function deleteConversationAction(conversationId: string) {
  const { userId } = await auth();

  if (!userId) {
    return { success: false, error: "Não autorizado." };
  }

  try {
    const conversation = await db.conversation.findUnique({
      where: { id: conversationId },
    });

    if (!conversation || conversation.userId !== userId) {
      return { success: false, error: "Conversa não encontrada." };
    }

    await db.conversation.delete({
      where: { id: conversationId },
    });

    revalidatePath("/tutor");
    return { success: true };
  } catch (error: any) {
    console.error("Erro ao deletar conversa:", error);
    return { success: false, error: "Falha ao deletar a conversa." };
  }
}
