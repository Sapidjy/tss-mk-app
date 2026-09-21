"use client";

import Link from "next/link";
import { Eye, MoreHorizontal, Pencil } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { MembersStatusBadge } from "./members-status-badge";

export interface Member {
  id: string;
  userId: string;
  memberNumber: string;
  firstName: string;
  lastName: string;
  phone: string;
  initialDeposit: number;
  createdAt: string;

  user: {
    username: string;
    role: string;
    status: string;
  };
}

interface MembersTableProps {
  members: Member[];
}

export function MembersTable({ members }: MembersTableProps) {
  // Aucun membre
  if (members.length === 0) {
    return (
      <div className="flex min-h-40 items-center justify-center rounded-lg border border-dashed">
        <p className="text-sm text-muted-foreground">Aucun membre trouvé.</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>N° membre</TableHead>
            <TableHead>Membre</TableHead>
            <TableHead>Téléphone</TableHead>
            <TableHead>Dépôt initial</TableHead>
            <TableHead>Rôle</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead className="w-12">
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {members.map((member) => (
            <TableRow key={member.id}>
              {/* Numéro du membre */}
              <TableCell className="font-medium">
                {member.memberNumber}
              </TableCell>

              {/* Informations du membre */}
              <TableCell>
                <div className="flex flex-col">
                  <span className="font-medium">
                    {member.firstName} {member.lastName}
                  </span>

                  <span className="text-sm text-muted-foreground">
                    @{member.user.username}
                  </span>
                </div>
              </TableCell>

              {/* Téléphone */}
              <TableCell>{member.phone}</TableCell>

              {/* Dépôt initial */}
              <TableCell>
                {member.initialDeposit.toLocaleString("fr-FR")} HTG
              </TableCell>

              {/* Rôle */}
              <TableCell>{member.user.role}</TableCell>

              {/* Statut */}
              <TableCell>
                <MembersStatusBadge status={member.user.status} />
              </TableCell>

              {/* Actions */}
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />

                      <span className="sr-only">Ouvrir le menu</span>
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end">
                    {/* Voir */}
                    <DropdownMenuItem>
                      <Link
                        href={`/members/${member.id}`}
                        className="flex w-full items-center"
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        Voir
                      </Link>
                    </DropdownMenuItem>

                    {/* Modifier */}
                    <DropdownMenuItem>
                      <Link
                        href={`/members/${member.id}/edit`}
                        className="flex w-full items-center"
                      >
                        <Pencil className="mr-2 h-4 w-4" />
                        Modifier
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
