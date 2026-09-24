import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function DashboardSkeleton() {
  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <Skeleton className="h-4 w-28" /> {/* breadcrumb */}

          <Skeleton className="mt-5 h-4 w-64" /> {/* saudação */}

          <Skeleton className="mt-2 h-9 w-72" /> {/* título */}

          <Skeleton className="mt-2 h-4 w-80" /> {/* descrição */}
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="size-4 rounded-full" />
          <Skeleton className="h-9 w-32 rounded-md" />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {["bg-emerald-500", "bg-rose-500", "bg-sky-500", "bg-violet-500"].map((classe) => (
          <Card key={classe} className="relative overflow-hidden border-0 bg-card shadow-sm">
            <div className={`absolute inset-x-0 top-0 h-1 ${classe}`} />
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="size-8 rounded-lg" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-32" />
              <Skeleton className="mt-3 h-3 w-36" />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.55fr)_minmax(320px,0.9fr)]">
        {/* Gráfico */}
        <Card>
          <CardHeader className="flex flex-row items-start justify-between gap-4 border-b pb-4">
            <div>
              <Skeleton className="h-5 w-40" />
              <Skeleton className="mt-2 h-4 w-56" />
            </div>

            <div className="flex gap-3">
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-4 w-16" />
            </div>
          </CardHeader>

          <CardContent>
            <Skeleton className="mt-6 h-64 w-full" />

            <div className="mt-2 flex justify-between">
              {Array.from({ length: 12 }).map((_, index) => (
                <Skeleton key={index} className="h-3 w-6" />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Categorias */}
        <Card>
          <CardHeader>
            <Skeleton className="h-5 w-44" />
            <Skeleton className="mt-2 h-4 w-60" />
          </CardHeader>

          <CardContent className="space-y-5 pt-3">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index}>
                <div className="mb-2 flex justify-between gap-3">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-4 w-20" />
                </div>

                <Skeleton className="h-2 w-full rounded-full" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
        {/* Maiores despesas */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
            <div>
              <Skeleton className="h-5 w-40" />
              <Skeleton className="mt-2 h-4 w-72" />
            </div>

            <Skeleton className="h-4 w-16" />
          </CardHeader>

          <CardContent className="p-0">
            <div className="divide-y">
              {Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between gap-4 px-6 py-4"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <Skeleton className="size-9 shrink-0 rounded-full" />

                    <div className="min-w-0">
                      <Skeleton className="h-4 w-36" />
                      <Skeleton className="mt-2 h-3 w-28" />
                    </div>
                  </div>

                  <Skeleton className="h-4 w-20" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Fechamento do mês */}
        <Card className="border-0 bg-primary">
          <CardHeader>
            <Skeleton className="h-5 w-40 bg-primary-foreground/20" />
            <Skeleton className="mt-2 h-4 w-48 bg-primary-foreground/20" />
          </CardHeader>

          <CardContent className="space-y-5">
            <div className="flex items-end justify-between">
              <div>
                <Skeleton className="h-4 w-28 bg-primary-foreground/20" />
                <Skeleton className="mt-2 h-9 w-36 bg-primary-foreground/20" />
              </div>

              <Skeleton className="size-8 rounded-full bg-primary-foreground/20" />
            </div>

            <Skeleton className="h-2 w-full rounded-full bg-primary-foreground/20" />

            <div className="grid grid-cols-2 gap-3 border-t border-primary-foreground/15 pt-4">
              <div>
                <Skeleton className="h-4 w-16 bg-primary-foreground/20" />
                <Skeleton className="mt-2 h-5 w-24 bg-primary-foreground/20" />
              </div>

              <div>
                <Skeleton className="h-4 w-16 bg-primary-foreground/20" />
                <Skeleton className="mt-2 h-5 w-24 bg-primary-foreground/20" />
              </div>
            </div>

            <Skeleton className="h-9 w-full rounded-lg bg-primary-foreground/20" />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
