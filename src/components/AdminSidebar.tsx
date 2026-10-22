"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Wallet,
  CreditCard,
  ArrowLeftRight,
  ChartNoAxesCombined,
  Settings,
  LogOut,
  ChevronLeft,
} from "lucide-react";

import { cn } from "@/src/lib/utils";

const navGroups = [
  {
    title: "PRINCIPAL",
    items: [
      {
        label: "Dashboard",
        href: "/admin",
        icon: LayoutDashboard,
      },
      {
        label: "Membres",
        href: "/admin/members",
        icon: Users,
      },
    ],
  },
  {
    title: "GESTION FINANCIÈRE",
    items: [
      {
        label: "Actions",
        href: "/admin/actions",
        icon: Wallet,
      },
      {
        label: "Crédits",
        href: "/admin/credits",
        icon: CreditCard,
      },
      {
        label: "Paiements",
        href: "/admin/payments",
        icon: ArrowLeftRight,
      },
      {
        label: "Transactions",
        href: "/admin/transactions",
        icon: ChartNoAxesCombined,
      },
    ],
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-slate-200 bg-white">
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 border-b px-5">
        <div className="flex size-10 items-center justify-center rounded-xl bg-teal-700 text-white">
          <Wallet className="size-5" />
        </div>
        <div>
          <p className="font-bold text-slate-900">
            Team Sans Stress
          </p>
          <p className="text-xs font-medium tracking-wider text-teal-700">
            ADMINISTRATION
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-7 overflow-y-auto px-3 py-6">
        {navGroups.map((group) => (
          <div key={group.title}>
            <p className="mb-3 px-3 text-[10px] font-bold tracking-widest text-slate-400">
              {group.title}
            </p>

            <div className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                const active =
                  item.href === "/admin"
                    ? pathname === "/admin"
                    : pathname === item.href ||
                      pathname.startsWith(`${item.href}/`);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                      active
                        ? "bg-teal-50 text-teal-800"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    )}
                  >
                    <Icon className="size-4.5 shrink-0" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Bas de la sidebar */}
      <div className="space-y-1 border-t p-3">
        <Link
          href="/admin/settings"
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium",
            pathname === "/admin/settings"
              ? "bg-teal-50 text-teal-800"
              : "text-slate-600 hover:bg-slate-50"
          )}
        >
          <Settings className="size-4.5" />
          Paramètres
        </Link>

        <Link
          href="/"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-500 hover:bg-slate-50 hover:text-slate-900"
        >
          <ChevronLeft className="size-4.5" />
          Retour au site
        </Link>
      </div>
    </aside>
  );
}
