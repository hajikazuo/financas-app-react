import { GlobalToast } from "@/components/ui/global-toast";
import { CategoriaForm } from "@/components/categorias/categoria-form";
import { DashboardBreadcrumb } from "@/components/app-breadcrumb";
import { listarCategorias } from "./queries";

export default async function CategoriasPage() {
  const { data: categorias, error } = await listarCategorias();

  return (
    <main className="flex flex-1 flex-col gap-6 p-6">
      <div className="mb-4">
        <DashboardBreadcrumb title="Categorias" />
      </div>

      <div>
        <p className="text-sm text-muted-foreground">Organização</p>
        <h1 className="text-2xl font-semibold tracking-tight">Categorias</h1>
      </div>

      <div className="flex items-center justify-between gap-4">
        <GlobalToast message={error} type="error" />
        <CategoriaForm />
      </div>

      {error ? null : categorias.length === 0 ? (
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
              <div className="flex items-center justify-between gap-3">
                <span>{categoria.nome}</span>
                {categoria.usuarioId && <CategoriaForm categoria={categoria} />}
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
