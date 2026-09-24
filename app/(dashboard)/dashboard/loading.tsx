import { DashboardSkeleton } from "@/components/dashboard/dashboard-skeleton";

export default function Loading() {
  return (
    <main
      className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col gap-6" aria-busy="true"
      aria-label="Carregando resumo financeiro"
    >
      <DashboardSkeleton />
    </main>
  );
}
