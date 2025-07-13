import { formatCurrency } from "@/lib/formatCurrency";
import { formatDate } from "@/lib/formatDate";
import { getCountryFlag } from "@/lib/getCountryFlag";
import type { PaginatedResponse, Transaction } from "@/types/transactions";
import { Eye } from "lucide-react";
import { useState } from "react";
import { AgentTypeBadge } from "./agent-type-badge";
import { Loader } from "./loader";
import { PaginacionTable } from "./paginacion-table";
import { StatusBadge } from "./status-badge";
import { TransactionModal } from "./transaction-modal";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

interface TransactionsTableProps {
  transactionsData: PaginatedResponse<Transaction> | undefined;
  isLoading: boolean;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

export function TransactionsTable({
  transactionsData,
  isLoading,
  onPageChange,
  onPageSizeChange,
}: TransactionsTableProps) {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedTransactionId, setSelectedTransactionId] = useState<
    string | null
  >(null);

  const transactions = transactionsData?.data || [];
  const pagination = transactionsData?.meta;

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <Loader />
        </div>
      ) : (
        <div className="space-y-4">
          <div className="rounded-md border overflow-x-auto">
            <Table className="min-w-full">
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="text-center min-w-[80px]">ID</TableHead>
                  <TableHead className="text-center min-w-[120px]">Nombre</TableHead>
                  <TableHead className="text-center min-w-[100px]">Monto</TableHead>
                  <TableHead className="text-center min-w-[100px]">País</TableHead>
                  <TableHead className="text-center min-w-[120px] hidden sm:table-cell">Tipo de Agente</TableHead>
                  <TableHead className="text-center min-w-[80px]">Estado</TableHead>
                  <TableHead className="text-center min-w-[100px] hidden md:table-cell">Fecha</TableHead>
                  <TableHead className="text-center min-w-[80px]">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction: Transaction) => (
                  <TableRow
                    key={transaction.id}
                    className="hover:bg-muted/50 transition-colors"
                  >
                    <TableCell className="font-medium text-xs sm:text-sm p-2">
                      <span className="block truncate">#{transaction.id}</span>
                    </TableCell>
                    <TableCell className="font-medium text-center text-xs sm:text-sm p-2">
                      <span className="block truncate max-w-[100px] sm:max-w-none">
                        {transaction.name}
                      </span>
                    </TableCell>
                    <TableCell className="font-semibold text-primary text-xs sm:text-sm p-2">
                      <span className="block truncate">
                        {formatCurrency(transaction.amount)}
                      </span>
                    </TableCell>
                    <TableCell className="p-2">
                      <div className="flex items-center gap-1 sm:gap-2 justify-center sm:justify-start">
                        <span className="text-sm sm:text-lg">
                          {getCountryFlag(transaction.country)}
                        </span>
                        <span className="text-xs sm:text-sm truncate max-w-[60px] sm:max-w-none">
                          {transaction.country}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center p-2 hidden sm:table-cell">
                      <AgentTypeBadge agentType={transaction.agentType} />
                    </TableCell>
                    <TableCell className="text-center p-2">
                      <StatusBadge status={transaction.status} />
                    </TableCell>
                    <TableCell className="text-muted-foreground text-center text-xs sm:text-sm p-2 hidden md:table-cell">
                      <span className="block truncate">
                        {formatDate(transaction.data)}
                      </span>
                    </TableCell>
                    <TableCell className="text-center p-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setOpenModal(true);
                          setSelectedTransactionId(transaction.id);
                        }}
                        className="hover:bg-primary/10 h-8 w-8 p-0"
                      >
                        <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <PaginacionTable
            pagination={pagination}
            onPageChange={onPageChange}
            onPageSizeChange={onPageSizeChange}
          />

          <TransactionModal
            transactionId={selectedTransactionId ?? ""}
            isOpen={openModal}
            onClose={() => setOpenModal(false)}
          />
        </div>
      )}
    </>
  );
}
