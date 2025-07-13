import { getTransactions } from "@/api/transactions";
import type { SearchFilters } from "@/types/transactions";
import { useQuery } from "@tanstack/react-query";

export const useTransactions = (params: SearchFilters) => {
  return useQuery({
    queryKey: ["transactions", params],
    queryFn: () => getTransactions(params),
  });
};
