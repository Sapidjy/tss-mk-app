import { Badge } from "@/components/ui/badge";

interface MembersStatusBadgeProps {
  status: string;
}

export function MembersStatusBadge({ status }: MembersStatusBadgeProps) {
  const normalizedStatus = status.toUpperCase();

  if (normalizedStatus === "ACTIVE") {
    return <Badge>Actif</Badge>;
  }

  if (normalizedStatus === "INACTIVE") {
    return <Badge variant="secondary">Inactif</Badge>;
  }

  return <Badge variant="outline">{status}</Badge>;
}
