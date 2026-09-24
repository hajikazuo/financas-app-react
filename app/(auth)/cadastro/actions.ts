"use server";

import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export type SignupState = {
  error: string | null;
};

export async function signup(_previousState: SignupState, formData: FormData): Promise<SignupState> {
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));

  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    console.error("Erro ao criar conta:", error);

    return {
      error: "Não foi possível criar a conta. Verifique os dados informados.",
    };
  }

  redirect("/login?message=account-created");
}
