"use client";

import { useMemo } from "react";

import type { Transacao } from "@/types/transacao";
import type { Categoria } from "@/types/categoria";
import { DataTable } from "@/components/ui/data-table";
import { createTransacaoColumns } from "./transacao-columns";

export function TransacaoList({
  transacoes,
  categorias,
}: {
  transacoes: Transacao[];
  categorias: Categoria[];
}) {
  const columns = useMemo(
    () => createTransacaoColumns(categorias),
    [categorias],
  );

  if (transacoes.length === 0) {
    return (
      <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
        Nenhuma transação encontrada.
      </div>
    );
  }

  return <DataTable columns={columns} data={transacoes} />;
}
