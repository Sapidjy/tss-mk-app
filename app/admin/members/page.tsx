import { MembersList } from "@/components/members/members-list";
import { members } from "@/data/members";

export default async function MembersPage() {
  return (
    <main className="container mx-auto py-6">
      <MembersList members={members} />
    </main>
  );
}
