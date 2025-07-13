import type { AgentType } from "@/types/transactions";
import { Badge } from "./ui/badge";

interface AgentTypeBadgeProps {
  agentType: AgentType;
}

export function AgentTypeBadge({ agentType }: AgentTypeBadgeProps) {
  const colors = {
    ["INDIVIDUAL"]: "bg-blue-100 text-blue-800 border-blue-200",
    ["COMPANY"]: "bg-purple-100 text-purple-800 border-purple-200",
    ["GOVERNMENT"]: "bg-green-100 text-green-800 border-green-200",
    ["ORGANIZATION"]: "bg-orange-100 text-orange-800 border-orange-200",
  };

  const agentTypeMap = {
    ["INDIVIDUAL"]: "Individuo",
    ["COMPANY"]: "Empresa",
    ["GOVERNMENT"]: "Gobierno",
    ["ORGANIZATION"]: "Organización",
  };

  return (
    <Badge variant="outline" className={colors[agentType]}>
      {agentTypeMap[agentType]}
    </Badge>
  );
}
