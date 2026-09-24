"use client";

import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";
import { createColumnHelper } from "@tanstack/react-table";

import type { Transacao } from "@/types/transacao";
import type { Categoria } from "@/types/categoria";
import type { DataTableFeatures } from "@/components/ui/data-table-features";
import { TransacaoForm } from "./transacao-form";
import { TransacaoDeleteButton } from "./transacao-delete-button";

const columnHelper = createColumnHelper<DataTableFeatures, Transacao>();

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const dateFormatter = new Intl.DateTimeFormat("pt-BR");

export function createTransacaoColumns(categorias: Categoria[]) {
  return columnHelper.columns([
    columnHelper.accessor("categoriaNome", {
      header: "Categoria",
    }),

    columnHelper.accessor("descricao", {
      header: "Descrição",
    }),

    columnHelper.accessor("tipo", {
      header: "Tipo",
      cell: ({ row }) => {
        const isReceita = row.original.tipo === "receita";

        return (
          <span
            className={
              isReceita
                ? "inline-flex items-center gap-1 text-primary"
                : "inline-flex items-center gap-1 text-destructive"
            }
          >
            {isReceita ? (
              <ArrowUpCircle className="size-4" />
            ) : (
              <ArrowDownCircle className="size-4" />
            )}

            {isReceita ? "Receita" : "Despesa"}
          </span>
        );
      },
    }),

    columnHelper.accessor("dataCadastro", {
      header: "Data",
      cell: ({ row }) =>
        dateFormatter.format(new Date(row.original.dataCadastro)),
    }),

    columnHelper.accessor("valor", {
      header: "Valor",
      cell: ({ row }) => {
        const isReceita = row.original.tipo === "receita";

        return (
          <div
            className={`font-medium ${
              isReceita ? "text-primary" : "text-destructive"
            }`}
          >
            {currencyFormatter.format(row.original.valor)}
          </div>
        );
      },
    }),

    columnHelper.display({
      id: "acoes",
      header: () => <div className="text-right">Ações</div>,
      cell: ({ row }) => (
        <div className="flex justify-end gap-1">
          <TransacaoForm
            categorias={categorias}
            transacao={row.original}
          />

          <TransacaoDeleteButton
            transacaoId={row.original.transacaoId}
          />
        </div>
      ),
    }),
  ]);
}