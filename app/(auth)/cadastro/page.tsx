"use client";

import { useActionState } from "react";
import Link from "next/link";
import { GlobalToast } from "@/components/ui/global-toast";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signup, type SignupState } from "./actions";

const initialState: SignupState = {
  error: null,
};

export default function CadastroPage() {
  const [state, formAction, isPending] = useActionState(signup, initialState);

  return (
    <>
      <GlobalToast message={state.error} type="error" />
      <form action={formAction}>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Criar conta</CardTitle>
          <CardAction>
            <Button variant="link">
              <Link href="/login">Já tenho uma conta</Link>
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@exemplo.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Senha</Label>
              </div>
              <Input id="password" name="password" type="password" required />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full">
            {isPending ? "Cadastrando..." : "Cadastrar"}
          </Button>
        </CardFooter>
      </Card>
      </form>
    </>
  );
}

