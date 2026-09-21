"use client";

import { useMemo, useState } from "react";

import { MembersHeader } from "./members-header";
import { MembersFilters } from "./members-filters";
import { MembersTable, Member } from "./members-table";

interface MembersListProps {
  members: Member[];
}

export function MembersList({ members }: MembersListProps) {
  const [search, setSearch] = useState("");

  const filteredMembers = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) {
      return members;
    }

    return members.filter((member) => {
      return (
        member.firstName.toLowerCase().includes(value) ||
        member.lastName.toLowerCase().includes(value) ||
        member.memberNumber.toLowerCase().includes(value) ||
        member.phone.toLowerCase().includes(value) ||
        member.user.username.toLowerCase().includes(value)
      );
    });
  }, [members, search]);

  return (
    <div className="space-y-6">
      <MembersHeader />

      <div className="space-y-4">
        <MembersFilters search={search} onSearchChange={setSearch} />

        <MembersTable members={filteredMembers} />
      </div>
    </div>
  );
}
