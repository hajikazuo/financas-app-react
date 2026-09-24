"use client";

import { useState, useTransition } from "react";
import { Trash2 } from "lucide-react";

import { deletarCategoria} from "@/app/(dashboard)/categorias/actions";
import { GlobalToast } from "@/components/ui/global-toast";
import { Button } from "@/components/ui/button";

export function CategoriaDeleteButton({ categoriaId }: { categoriaId: string }) {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);
  const [toastKey, setToastKey] = useState(0);

  function handleDelete() {
    if (isPending) return;

    const confirmed = window.confirm(
      "Tem certeza que deseja excluir esta categoria? Esta ação não pode ser desfeita.",
    );

    if (!confirmed) return;

    startTransition(async () => {
      const result = await deletarCategoria(categoriaId);

      setMessage(
        result.success
          ? "Categoria excluída com sucesso."
          : result.error ?? "Não foi possível excluir a categoria.",
      );
      setToastKey((value) => value + 1);
    });
  }

  const isSuccess = message === "Categoria excluída com sucesso.";

  return (
    <>
      <GlobalToast
        message={isSuccess ? message : null}
        type="success"
        toastKey={toastKey}
      />
      <GlobalToast
        message={!isSuccess ? message : null}
        type="error"
        toastKey={toastKey}
      />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label="Excluir categoria"
        title="Excluir categoria"
        disabled={isPending}
        onClick={handleDelete}
      >
        <Trash2 className="text-destructive" />
      </Button>
    </>
  );
}
