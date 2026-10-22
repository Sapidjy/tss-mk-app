"use client";

import { useState } from "react";
import {
  ChevronDown,
  CreditCard,
  Headset,
  Home,
  LogOut,
  Menu,
  Wallet,
} from "lucide-react";
import Link from "next/link";

import { Avatar, AvatarFallback } from "@/src/components/ui/avatar";
import { Button, buttonVariants } from "@/src/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/src/components/ui/sheet";

const navItems = [
  {
    label: "Accueil",
    href: "/",
    icon: Home,
  },
  {
    label: "Kredi mwen",
    href: "/loan",
    icon: Wallet,
  },
  {
    label: "Enterè",
    href: "/interest",
    icon: CreditCard,
  },
  // {
  //   label: "Sipò",
  //   href: "/support",
  //   icon: Headset,
  // },
];

export default function UserHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b-2 border-red-600 bg-white shadow-sm">
      <div
        className="mx-auto flex h-16 max-w-7xl items-center
        justify-between gap-4 px-4 sm:px-6 lg:px-8"
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex shrink-0 items-center gap-3"
        >
          <div
            className="flex size-10 items-center justify-center
            rounded-xl bg-red-600 text-white"
          >
            <Wallet className="size-6" />
          </div>

          <div className="leading-tight">
            <p className="font-bold tracking-tight text-black">
              Team Sans Stress
            </p>

            <p
              className="text-xs font-semibold tracking-wider
              text-red-600"
            >
              MICRO CRÉDIT
            </p>
          </div>
        </Link>

        {/* Navigation desktop */}
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map(({ label, href, icon: Icon }) => (
            <Link
              href={href}
              key={href}
              className={buttonVariants({
                variant: "ghost",
                className:
                  "gap-2 text-gray-700 transition-colors hover:bg-red-50 hover:text-red-600",
              })}
            >
              <Icon className="size-4" />
              <span className="pt-1">{label}</span>
            </Link>
          ))}
        </nav>

        {/* Actions utilisateur */}
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="ghost"
                  className="gap-2 px-2 py-5 hover:bg-red-50"
                >
                  <Avatar className="size-9">
                    <AvatarFallback className="bg-red-100 font-semibold text-red-700">
                      SV
                    </AvatarFallback>
                  </Avatar>

                  <span className="hidden text-sm font-medium text-black sm:inline">
                    Sadeley Vixamar
                  </span>

                  <ChevronDown className="hidden size-4 text-gray-600 sm:block" />
                </Button>
              }
            />

            <DropdownMenuContent
              align="end"
              className="w-52 border-gray-200"
            >
              <DropdownMenuGroup>
                <DropdownMenuLabel className="text-black">
                  Kont mwen
                </DropdownMenuLabel>
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                render={<Link href="/profile" />}
                className="cursor-pointer focus:bg-red-50 focus:text-red-600"
              >
                Pwofil mwen
              </DropdownMenuItem>

              <DropdownMenuItem
                render={<Link href="/settings" />}
                className="cursor-pointer focus:bg-red-50 focus:text-red-600"
              >
                Paramèt
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem className="cursor-pointer text-red-600 focus:bg-red-50 focus:text-red-700">
                <LogOut className="mr-2 size-4" />
                Dekonekte
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Menu mobile */}
          <Sheet
            open={mobileMenuOpen}
            onOpenChange={setMobileMenuOpen}
          >
            <SheetTrigger
              render={
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Ouvri meni"
                  className="border-gray-300 text-black hover:border-red-600 hover:bg-red-50 hover:text-red-600 md:hidden"
                >
                  <Menu className="size-5" />
                </Button>
              }
            />

            <SheetContent
              side="right"
              className="w-72 border-l-2 border-red-600 bg-white px-4"
            >
              <div className="mb-4 mt-6 flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-red-600 text-white">
                  <Wallet className="size-6" />
                </div>

                <div>
                  <p className="text-lg font-bold text-black">
                    Team Sans Stress
                  </p>

                  <p className="text-sm font-semibold text-red-600">
                    MICRO CRÉDIT
                  </p>
                </div>
              </div>

              <hr className="border-gray-200" />

              <nav className="mt-4 flex flex-col gap-2">
                {navItems.map(({ label, href, icon: Icon }) => (
                  <Link
                    href={href}
                    key={href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={buttonVariants({
                      variant: "ghost",
                      className:
                        "flex w-full items-center justify-start gap-3 text-gray-700 transition-colors hover:bg-red-50 hover:text-red-600",
                    })}
                  >
                    <Icon className="size-4" />
                    <span>{label}</span>
                  </Link>
                ))}
              </nav>

              <div className="mt-6 border-t border-gray-200 pt-4">
                <p className="text-xs text-gray-500">
                  Entraide · Engagement · Progrès
                </p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
