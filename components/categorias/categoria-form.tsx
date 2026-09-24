"use client";

import { useActionState, useState } from "react";
import { Plus } from "lucide-react";

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
import { criarCategoria, type CriarCategoriaState } from "@/app/(dashboard)/categorias/actions";

const initialState: CriarCategoriaState = {
  error: null,
  success: false,
};

export function CategoriaForm() {
  const [open, setOpen] = useState(false);
  const [state, formAction, isPending] = useActionState(
    async (previousState: CriarCategoriaState, formData: FormData) => {
      const nextState = await criarCategoria(previousState, formData);

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
        <SheetTrigger render={<Button />}>
          <Plus />
          Nova categoria
        </SheetTrigger>

        <SheetContent side="right" className="overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Nova categoria</SheetTitle>
            <SheetDescription>
              Preencha os dados para registrar uma nova categoria.
            </SheetDescription>
          </SheetHeader>

          <form action={formAction} className="flex flex-1 flex-col gap-5 px-4">
            <div className="grid gap-2">
              <Label htmlFor="nome">Nome</Label>
              <Input
                id="nome"
                name="nome"
                placeholder="Ex.: Mercado"
                required
              />
            </div>

            <SheetFooter className="px-0">
              <Button type="submit" disabled={isPending}>
                {isPending ? "Salvando..." : "Salvar"}
              </Button>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>
    </>
  );
}
