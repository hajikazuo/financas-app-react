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
import {
  criarCategoria,
  editarCategoria,
  type CriarCategoriaState,
} from "@/app/(dashboard)/categorias/actions";
import type { Categoria } from "@/types/categoria";

const initialState: CriarCategoriaState = {
  error: null,
  success: false,
};

export function CategoriaForm({ categoria }: { categoria?: Categoria }) {
  const isEditando = Boolean(categoria);
  const [open, setOpen] = useState(false);
  const [state, formAction, isPending] = useActionState(
    async (previousState: CriarCategoriaState, formData: FormData) => {
      const nextState = isEditando
        ? await editarCategoria(previousState, formData)
        : await criarCategoria(previousState, formData);

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
        message={state.success ? "Categoria cadastrada com sucesso." : null}
        type="success"
      />

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger
          render={
            <Button
              variant={isEditando ? "ghost" : "default"}
              size={isEditando ? "icon" : "default"}
              aria-label={isEditando ? "Editar categoria" : undefined}
              title={isEditando ? "Editar categoria" : undefined}
            />
          }
        >
          {isEditando ? <Pencil /> : <Plus />}
          {!isEditando && "Nova categoria"}
        </SheetTrigger>

        <SheetContent side="right" className="overflow-y-auto">
          <SheetHeader>
            <SheetTitle>{isEditando ? "Editar categoria" : "Nova categoria"}</SheetTitle>
            <SheetDescription>
              {isEditando
                ? "Atualize o nome da categoria."
                : "Preencha os dados para registrar uma nova categoria."}
            </SheetDescription>
          </SheetHeader>

          <form action={formAction} className="flex flex-1 flex-col gap-5 px-4">
            {categoria && (
              <input type="hidden" name="categoriaId" value={categoria.categoriaId} />
            )}

            <div className="grid gap-2">
              <Label htmlFor="nome">Nome</Label>
              <Input
                id="nome"
                name="nome"
                placeholder="Ex.: Mercado"
                defaultValue={categoria?.nome}
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
