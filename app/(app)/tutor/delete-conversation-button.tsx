"use client";

import { useState } from "react";
import { Trash, Spinner } from "@phosphor-icons/react";
import { deleteConversationAction } from "./actions";
import { useRouter } from "next/navigation";

export default function DeleteConversationButton({ id }: { id: string }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  async function handleDelete(e: React.MouseEvent) {
    e.preventDefault(); // Impede a navegação do Link
    
    if (!confirm("Tem certeza que deseja apagar este chat?")) {
      return;
    }

    setIsDeleting(true);
    const result = await deleteConversationAction(id);
    setIsDeleting(false);

    if (result.success) {
      // Se a exclusão der certo e o usuário estiver na mesma conversa que apagou, redirecionar para a tela inicial do tutor.
      if (window.location.pathname === `/tutor/${id}`) {
        router.push("/tutor");
      }
    } else {
      alert(result.error);
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-white rounded transition-colors"
      title="Apagar conversa"
    >
      {isDeleting ? <Spinner size={16} className="animate-spin" /> : <Trash size={16} />}
    </button>
  );
}
