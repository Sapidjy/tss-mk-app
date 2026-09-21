"use client";

import { UserPlus } from "lucide-react";
import Link from "next/link";

export function MembersHeader() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Membres</h1>
        <p className="text-muted-foreground">Gérez les membres de TSS-MK.</p>
      </div>

      <Link
        href="/members/new"
        className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
      >
        <UserPlus className="mr-2 h-4 w-4" />
        Ajouter un membre
      </Link>
    </div>
  );
}
