"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export type LoginState = {
  error: string | null;
};

export async function login(_previousState: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("Erro ao fazer login:", error);

    return {
      error: "Não foi possível entrar. Verifique seu e-mail e sua senha.",
    };
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}
