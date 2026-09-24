import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import type { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar />

            <SidebarInset className="flex min-h-svh flex-1 flex-col">
                <header className="flex h-16 items-center gap-4 border-b px-4 md:px-6">
                    <SidebarTrigger />
                </header>
                <main className="flex-1 p-5 md:p-7">
                    {children}
                </main>
                <footer className="border-t px-5 py-4 text-center text-xs text-muted-foreground md:px-7">
                    Desenvolvido por Nilton Kazuo - {new Date().getFullYear()}
                </footer>
            </SidebarInset>
        </SidebarProvider>
    );
}
