import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("transacoes")
    .select("*");

  return (
    <main>
      <h1>Finanças</h1>

      <pre>
        {JSON.stringify(
          {
            data,
            error: error?.message,
          },
          null,
          2,
        )}
      </pre>
    </main>
  );
}