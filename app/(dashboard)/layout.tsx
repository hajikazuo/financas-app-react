import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import type { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar />

            <SidebarInset>
                <header className="flex h-16 items-center gap-4 border-b px-4 md:px-6">
                    <SidebarTrigger />
                </header>
                <main className="flex-1 p-5 md:p-7">
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}
