"use client";

import { usePathname, useRouter } from "next/navigation";
import * as React from "react";

import {
  ArrowLeftRight,
  Banknote,
  BarChart3,
  ChevronDown,
  CircleDollarSign,
  ClipboardList,
  CreditCard,
  FileCheck2,
  History,
  Landmark,
  LayoutDashboard,
  LockKeyhole,
  LogOut,
  Percent,
  ReceiptText,
  Settings,
  ShieldCheck,
  UserCog,
  UserRound,
  Users,
  Wallet,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/src/components/ui/sidebar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import Image from "next/image";
import { Avatar, AvatarFallback } from "./ui/avatar";

// ======================================================
// TYPES
// ======================================================

type SubMenuItem = {
  title: string;
  href: string;
  icon: React.ElementType;
};

type MenuItem = {
  title: string;
  href: string;
  icon: React.ElementType;
  items?: SubMenuItem[];
};

// ======================================================
// MENU PRINCIPAL
// ======================================================

const mainMenu: MenuItem[] = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },

  {
    title: "Membres",
    href: "/admin/members",
    icon: Users,
    items: [
      {
        title: "Tous les membres",
        href: "/admin/members",
        icon: Users,
      },
      {
        title: "Ajouter un membre",
        href: "/admin/members/new",
        icon: UserRound,
      },
      {
        title: "Comptes membres",
        href: "/admin/members/accounts",
        icon: Wallet,
      },
    ],
  },

  {
    title: "Transactions",
    href: "/admin/transactions",
    icon: ArrowLeftRight,
    items: [
      {
        title: "Toutes les transactions",
        href: "/admin/transactions",
        icon: History,
      },
      {
        title: "Dépôts",
        href: "/admin/transactions/deposits",
        icon: Banknote,
      },
      {
        title: "Retraits",
        href: "/admin/transactions/withdrawals",
        icon: Wallet,
      },
      {
        title: "Actions",
        href: "/admin/transactions/actions",
        icon: CircleDollarSign,
      },
    ],
  },

  {
    title: "Prêts",
    href: "/admin/loans",
    icon: Landmark,
    items: [
      {
        title: "Tous les prêts",
        href: "/admin/loans",
        icon: Landmark,
      },
      {
        title: "Demandes",
        href: "/admin/loans/requests",
        icon: ClipboardList,
      },
      {
        title: "Validation",
        href: "/admin/loans/validation",
        icon: FileCheck2,
      },
      {
        title: "Prêts actifs",
        href: "/admin/loans/active",
        icon: CreditCard,
      },
      {
        title: "Prêts en retard",
        href: "/admin/loans/overdue",
        icon: ReceiptText,
      },
    ],
  },

  {
    title: "Remboursements",
    href: "/admin/payments",
    icon: ReceiptText,
    items: [
      {
        title: "Paiements",
        href: "/admin/payments",
        icon: CreditCard,
      },
      {
        title: "Capital restant",
        href: "/admin/payments/capital",
        icon: CircleDollarSign,
      },
      {
        title: "Intérêts restants",
        href: "/admin/payments/interest",
        icon: Percent,
      },
      {
        title: "Échéances",
        href: "/admin/payments/due-dates",
        icon: ClipboardList,
      },
      {
        title: "Overdue",
        href: "/admin/payments/overdue",
        icon: ReceiptText,
      },
    ],
  },

  {
    title: "Intérêts",
    href: "/admin/interests",
    icon: Percent,
    items: [
      {
        title: "Répartition",
        href: "/admin/interests/distribution",
        icon: Percent,
      },
      {
        title: "Historique",
        href: "/admin/interests/history",
        icon: History,
      },
    ],
  },
];

// ======================================================
// GESTION
// ======================================================

const managementMenu: MenuItem[] = [
  {
    title: "Statistiques",
    href: "/admin/statistics",
    icon: BarChart3,
  },
];

// ======================================================
// SÉCURITÉ
// ======================================================

const securityMenu: MenuItem[] = [
  {
    title: "Utilisateurs",
    href: "/admin/users",
    icon: UserCog,
  },
  {
    title: "Permissions",
    href: "/admin/permissions",
    icon: LockKeyhole,
  },
  {
    title: "Audit logs",
    href: "/admin/audit-logs",
    icon: ShieldCheck,
  },
  {
    title: "Historique",
    href: "/admin/history",
    icon: History,
  },
];

// ======================================================
// ACTIVE ROUTE
// ======================================================

function isActive(pathname: string, href: string, exact = false) {
  if (exact) {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

// ======================================================
// NAV ITEM
// ======================================================

function NavItem({ item, pathname }: { item: MenuItem; pathname: string }) {
  const router = useRouter();

  const [open, setOpen] = React.useState(false);

  const hasChildren = Boolean(item.items?.length);

  const activeParent =
    pathname === item.href ||
    pathname.startsWith(`${item.href}/`) ||
    Boolean(item.items?.some((subItem) => isActive(pathname, subItem.href)));

  // Ouvre automatiquement le menu si une
  // de ses pages est actuellement active.
  React.useEffect(() => {
    if (activeParent) {
      setOpen(true);
    }
  }, [activeParent]);

  // ====================================================
  // ITEM SIMPLE
  // ====================================================

  if (!hasChildren) {
    return (
      <SidebarMenuItem>
        <SidebarMenuButton
          tooltip={item.title}
          isActive={pathname === item.href}
          onClick={() => router.push(item.href)}
        >
          <item.icon />
          <span>{item.title}</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  }

  // ====================================================
  // ITEM AVEC SOUS-MENU
  // ====================================================

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        tooltip={item.title}
        isActive={activeParent}
        onClick={() => {
          setOpen(!open);
        }}
      >
        <item.icon />

        <span>{item.title}</span>

        <ChevronDown
          className={`ml-auto size-4 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </SidebarMenuButton>

      {open && (
        <SidebarMenuSub>
          {item.items?.map((subItem) => {
            const active = isActive(pathname, subItem.href, true);

            return (
              <SidebarMenuSubItem key={subItem.href}>
                <SidebarMenuSubButton
                  isActive={active}
                  onClick={() => router.push(subItem.href)}
                >
                  <subItem.icon />

                  <span>{subItem.title}</span>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            );
          })}
        </SidebarMenuSub>
      )}
    </SidebarMenuItem>
  );
}

// ======================================================
// MENU SECTION
// ======================================================

function MenuSection({
  label,
  items,
  pathname,
}: {
  label: string;
  items: MenuItem[];
  pathname: string;
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>

      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <NavItem key={item.href} item={item} pathname={pathname} />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

// ======================================================
// ADMIN SIDEBAR
// ======================================================

export function AdminSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Sidebar collapsible="icon" variant="sidebar" {...props}>
      {/* ================================================
          HEADER
      ================================================= */}

      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              tooltip="Finance Admin"
              onClick={() => router.push("/admin")}
            >
              <div className="flex aspect-square size-15 items-center justify-center rounded-lg text-primary-foreground">
                {/* <Landmark className="size-5" /> */}

                <Image
                  src="/logo_tss.png"
                  alt="Logo TSS"
                  width={50}
                  height={50}
                  className="object-contain"
                />
              </div>

              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">TSS-MK-Admin</span>

                <span className="truncate text-xs text-muted-foreground">
                  Administration
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* ================================================
          CONTENT
      ================================================= */}

      <SidebarContent>
        <MenuSection label="Principal" items={mainMenu} pathname={pathname} />

        <MenuSection
          label="Gestion"
          items={managementMenu}
          pathname={pathname}
        />

        <MenuSection
          label="Sécurité"
          items={securityMenu}
          pathname={pathname}
        />
      </SidebarContent>

      {/* ================================================
          FOOTER
      ================================================= */}

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <SidebarMenuButton
                  size="lg"
                  tooltip="Compte administrateur"
                  className="data-[state=open]:bg-sidebar-accent"
                >
                  <Avatar className="size-8 rounded-lg">
                    <AvatarFallback className="rounded-lg">AD</AvatarFallback>
                  </Avatar>

                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      Administrateur
                    </span>

                    <span className="truncate text-xs text-muted-foreground">
                      admin@example.com
                    </span>
                  </div>

                  <ChevronDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>

              <DropdownMenuContent side="top" align="start" className="w-56">
                <DropdownMenuItem onClick={() => router.push("/admin/profile")}>
                  <UserRound className="mr-2 size-4" />
                  Profil
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => router.push("/admin/settings")}
                >
                  <Settings className="mr-2 size-4" />
                  Paramètres
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  className="text-destructive"
                  onClick={() => {
                    // TODO: ajouter ici ton système
                    // de déconnexion
                    console.log("Déconnexion");
                  }}
                >
                  <LogOut className="mr-2 size-4" />
                  Déconnexion
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      {/* ================================================
          RAIL
      ================================================= */}

      <SidebarRail />
    </Sidebar>
  );
}
