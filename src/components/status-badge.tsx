import type { TransactionStatus } from "@/types/transactions";
import { AlertTriangle, Ban, CheckCircle, Clock, XCircle } from "lucide-react";
import { Badge } from "./ui/badge";

export interface StatusBadgeProps {
  status: TransactionStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = {
    ["ACTIVE"]: {
      color: "bg-success text-success-foreground",
      icon: CheckCircle,
    },
    ["PENDING"]: { color: "bg-warning text-warning-foreground", icon: Clock },
    ["INACTIVE"]: { color: "bg-muted text-muted-foreground", icon: XCircle },
    ["SUSPENDED"]: {
      color: "bg-destructive text-destructive-foreground",
      icon: AlertTriangle,
    },
    ["BLOCKED"]: {
      color: "bg-destructive text-destructive-foreground",
      icon: Ban,
    },
  };

  const statusMap = {
    ["ACTIVE"]: "Activo",
    ["PENDING"]: "Pendiente",
    ["INACTIVE"]: "Inactivo",
    ["SUSPENDED"]: "Suspendido",
  };

  const { color, icon: Icon } = config[status];

  return (
    <Badge className={color}>
      <Icon className="h-3 w-3 mr-1" />
      {statusMap[status]}
    </Badge>
  );
}
