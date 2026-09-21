import ChatInterface from "./chat-interface";

export default async function TutorPage({
  searchParams,
}: {
  searchParams: Promise<{ questionId?: string }>;
}) {
  const { questionId } = await searchParams;

  return (
    <ChatInterface
      key="new-chat"
      initialQuestionId={questionId}
    />
  );
}
