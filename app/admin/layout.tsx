import { AdminSidebar } from "@/components/admin-sidebar";
import { Separator } from "@/components/ui/separator";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "TSS-MK | Administration",
  description:
    "Plateforme d’administration TSS-MK pour la gestion des membres, transactions, dépôts, retraits, prêts, remboursements et répartition des intérêts.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AdminSidebar />

      <main className="flex min-h-screen w-full flex-1 flex-col">
        {/* Header mobile / desktop */}
        <header className="flex h-14 items-center gap-2 border-b px-4">
          <SidebarTrigger />

          <Separator orientation="vertical" className="mr-2 h-4" />

          <div className="font-semibold">Administration</div>
        </header>

        <div className="flex-1 p-4 md:p-6">{children}</div>
      </main>
    </SidebarProvider>
  );
}
