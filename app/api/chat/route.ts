import { getAIModel } from "@/lib/ai/providers";
import { streamText } from "ai";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { MessageRole } from "@prisma/client";

export async function POST(req: Request) {
  const { userId } = await auth();

  if (!userId) {
    return new Response("Não autorizado", { status: 401 });
  }

  const { messages, data } = await req.json();

  let conversationId = data?.conversationId as string | undefined;
  const questionId = data?.questionId as string | undefined;

  let questionContext = "";

  // Se houver uma questão atrelada, vamos buscar para dar contexto à IA
  if (questionId) {
    const question = await db.question.findUnique({
      where: { id: questionId },
    });

    if (question) {
      questionContext = `
O aluno está com dúvida na seguinte questão do caderno dele:
---
Banca: ${question.banca}
Disciplina: ${question.subject}
Enunciado: ${question.statement}
Gabarito: ${question.correctAnswer}
Explicação do gabarito: ${question.explanation}
---
Use este contexto para ajudá-lo a entender o que ele errou ou não compreendeu.
`;
    }
  }

  const systemPrompt = `Você é um tutor particular especializado em concursos públicos brasileiros.
Seu papel é ser extremamente didático, paciente e encorajar o raciocínio.
Não dê apenas a resposta final; explique o "porquê" usando as leis, a doutrina, regras gramaticais ou lógicas aplicáveis.
Responda sempre em português do Brasil e utilize formatação Markdown para facilitar a leitura (como negrito para destacar termos importantes, listas e blocos de citação).
Se não souber a resposta exata baseada na lei atual, seja honesto e oriente o aluno a buscar a fonte oficial.
${questionContext}
`;

  // Cria a conversa no banco antes do stream se não existir
  let isNewConversation = false;
  if (!conversationId) {
    const newTitle = messages[0]?.content
      ? messages[0].content.substring(0, 40) + "..."
      : "Nova Conversa";

    const conversation = await db.conversation.create({
      data: {
        userId,
        questionId: questionId || null,
        title: newTitle,
      },
    });
    conversationId = conversation.id;
    isNewConversation = true;
  }

  const model = getAIModel();
  
  // Pegamos a última mensagem do usuário para salvar
  const lastUserMessage = messages[messages.length - 1];

  const result = streamText({
    model,
    system: systemPrompt,
    messages,
    async onFinish({ text }) {
      if (conversationId) {
        // Salva a mensagem do usuário
        await db.message.create({
          data: {
            conversationId,
            role: MessageRole.user,
            content: lastUserMessage.content,
          },
        });

        // Salva a resposta da IA
        await db.message.create({
          data: {
            conversationId,
            role: MessageRole.assistant,
            content: text,
          },
        });
      }
    },
  });

  const response = result.toUIMessageStreamResponse();

  if (isNewConversation && conversationId) {
    response.headers.set("x-conversation-id", conversationId);
  }

  return response;
}
