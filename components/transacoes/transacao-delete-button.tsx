"use client";

import { useState, useTransition } from "react";
import { Trash2 } from "lucide-react";

import { deletarTransacao } from "@/app/(dashboard)/transacoes/actions";
import { GlobalToast } from "@/components/ui/global-toast";
import { Button } from "@/components/ui/button";

export function TransacaoDeleteButton({ transacaoId }: { transacaoId: string }) {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);
  const [toastKey, setToastKey] = useState(0);

  function handleDelete() {
    if (isPending) return;

    const confirmed = window.confirm(
      "Tem certeza que deseja excluir esta transação? Esta ação não pode ser desfeita.",
    );

    if (!confirmed) return;

    startTransition(async () => {
      const result = await deletarTransacao(transacaoId);

      setMessage(
        result.success
          ? "Transação excluída com sucesso."
          : result.error ?? "Não foi possível excluir a transação.",
      );
      setToastKey((value) => value + 1);
    });
  }

  const isSuccess = message === "Transação excluída com sucesso.";

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
        aria-label="Excluir transação"
        title="Excluir transação"
        disabled={isPending}
        onClick={handleDelete}
      >
        <Trash2 className="text-destructive" />
      </Button>
    </>
  );
}
