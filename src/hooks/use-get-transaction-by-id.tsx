import { getTransaction } from "@/api/transactions";
import { useQuery } from "@tanstack/react-query";

export const useGetTransactionById = (id: string) => {
  return useQuery({
    queryKey: ["transaction", id],
    queryFn: () => getTransaction(id),
  });
};
