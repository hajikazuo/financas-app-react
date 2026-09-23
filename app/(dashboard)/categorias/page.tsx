import { createClient } from "@/lib/supabase/server";
import { mapearCategoria, type CategoriaRow } from "@/types/categoria";

export default async function CategoriasPage() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("categorias")
    .select("categoria_id, nome")
    .order("nome", { ascending: true });

  const categorias = ((data ?? []) as CategoriaRow[]).map(mapearCategoria);

  return (
    <main className="flex flex-1 flex-col gap-6 p-6">
      <div>
        <p className="text-sm text-muted-foreground">Organização</p>
        <h1 className="text-2xl font-semibold tracking-tight">Categorias</h1>
      </div>

      {error ? (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
          Não foi possível carregar as categorias: {error.message}
        </div>
      ) : categorias.length === 0 ? (
        <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
          Nenhuma categoria encontrada.
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {categorias.map((categoria) => (
            <div
              key={categoria.categoriaId}
              className="rounded-lg border bg-card p-4 font-medium"
            >
              {categoria.nome}
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
