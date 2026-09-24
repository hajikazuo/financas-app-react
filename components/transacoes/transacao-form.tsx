"use client";

import { useActionState, useState } from "react";
import { Pencil, Plus } from "lucide-react";

import { GlobalToast } from "@/components/ui/global-toast";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "cn";
import {
  criarTransacao,
  editarTransacao,
  type CriarTransacaoState,
} from "@/app/(dashboard)/transacoes/actions";
import type { Categoria } from "@/types/categoria";
import type { TipoTransacao, Transacao } from "@/types/transacao";

type TransacaoFormProps = {
  categorias: Categoria[];
  tipoInicial?: TipoTransacao;
  transacao?: Transacao;
};

const initialState: CriarTransacaoState = {
  error: null,
  success: false,
};

function formatarDataParaInput(data: string) {
  return data.slice(0, 10);
}

export function TransacaoForm({
  categorias,
  tipoInicial = "despesa",
  transacao,
}: TransacaoFormProps) {
  const isEditando = Boolean(transacao);
  const [open, setOpen] = useState(false);
  const [state, formAction, isPending] = useActionState(
    async (previousState: CriarTransacaoState, formData: FormData) => {
      const nextState = isEditando
        ? await editarTransacao(previousState, formData)
        : await criarTransacao(previousState, formData);

      if (nextState.success) {
        setOpen(false);
      }

      return nextState;
    },
    initialState,
  );

  return (
    <>
      <GlobalToast message={state.error} type="error" />
      <GlobalToast
        message={state.success ? "Transação cadastrada com sucesso." : null}
        type="success"
      />

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger
          render={
            <Button
              variant={isEditando ? "ghost" : "default"}
              size={isEditando ? "icon" : "default"}
              aria-label={isEditando ? "Editar transação" : undefined}
              title={isEditando ? "Editar transação" : undefined}
            />
          }
        >
          {isEditando ? <Pencil /> : <Plus />}
          {!isEditando && "Nova transação"}
        </SheetTrigger>

        <SheetContent side="right" className="overflow-y-auto">
          <SheetHeader>
            <SheetTitle>{isEditando ? "Editar transação" : "Nova transação"}</SheetTitle>
            <SheetDescription>
              {isEditando
                ? "Atualize os dados da receita ou despesa."
                : "Preencha os dados para registrar uma receita ou despesa."}
            </SheetDescription>
          </SheetHeader>

          <form action={formAction} className="flex flex-1 flex-col gap-5 px-4">
            {transacao && (
              <input type="hidden" name="transacaoId" value={transacao.transacaoId} />
            )}

            <div className="grid gap-2">
              <Label htmlFor="tipo">Tipo</Label>
              <select
                id="tipo"
                name="tipo"
                defaultValue={transacao?.tipo ?? tipoInicial}
                required
                className="h-8 rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 bg-background text-foreground [&>option]:bg-background [&>option]:text-foreground"
              >
                <option value="despesa">Despesa</option>
                <option value="receita">Receita</option>
              </select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="descricao">Descrição</Label>
              <Input
                id="descricao"
                name="descricao"
                placeholder="Ex.: Mercado"
                defaultValue={transacao?.descricao}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="valor">Valor</Label>
              <Input
                id="valor"
                name="valor"
                type="number"
                min="0.01"
                step="0.01"
                placeholder="0,00"
                defaultValue={transacao?.valor}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="categoriaId">Categoria</Label>
              <select
                id="categoriaId"
                name="categoriaId"
                defaultValue={transacao?.categoriaId ?? ""}
                className={cn(
                  "h-8 rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 bg-background text-foreground [&>option]:bg-background [&>option]:text-foreground",
                  categorias.length === 0 && "text-muted-foreground",
                )}
              >
                <option value="">Sem categoria</option>
                {categorias.map((categoria) => (
                  <option key={categoria.categoriaId} value={categoria.categoriaId}>
                    {categoria.nome}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="dataCadastro">Data</Label>
              <Input
                id="dataCadastro"
                name="dataCadastro"
                type="date"
                defaultValue={
                  transacao
                    ? formatarDataParaInput(transacao.dataCadastro)
                    : new Date().toISOString().slice(0, 10)
                }
                required
              />
            </div>

            <SheetFooter className="px-0">
              <Button type="submit" disabled={isPending}>
                {isPending ? "Salvando..." : isEditando ? "Atualizar" : "Salvar"}
              </Button>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>
    </>
  );
}
