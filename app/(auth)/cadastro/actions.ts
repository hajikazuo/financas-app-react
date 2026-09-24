"use server";

import { createClient } from "@/lib/supabase/server";

export type SignupState = {
  error: string | null;
  success: string | null;
};

export async function signup(_previousState: SignupState, formData: FormData): Promise<SignupState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");

  if (password !== confirmPassword) {
    return {
      error: "As senhas não coincidem.",
      success: null,
    };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    console.error("Erro ao criar conta:", error);

    return {
      error: "Não foi possível criar a conta. Verifique os dados informados.",
      success: null,
    };
  }

  return {
    error: null,
    success: "Conta criada! Agora você já pode entrar.",
  };
}
