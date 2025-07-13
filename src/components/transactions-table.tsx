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
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="text-center">ID</TableHead>
                  <TableHead className="text-center">Nombre</TableHead>
                  <TableHead className="text-center">Monto</TableHead>
                  <TableHead className="text-center">País</TableHead>
                  <TableHead className="text-center">Tipo de Agente</TableHead>
                  <TableHead className="text-center">Estado</TableHead>
                  <TableHead className="text-center">Fecha</TableHead>
                  <TableHead className="text-center">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction: Transaction) => (
                  <TableRow
                    key={transaction.id}
                    className="hover:bg-muted/50 transition-colors"
                  >
                    <TableCell className="font-medium">
                      #{transaction.id}
                    </TableCell>
                    <TableCell className="font-medium text-center">
                      {transaction.name}
                    </TableCell>
                    <TableCell className="font-semibold text-primary">
                      {formatCurrency(transaction.amount)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="text-lg">
                          {getCountryFlag(transaction.country)}
                        </span>
                        <span>{transaction.country}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <AgentTypeBadge agentType={transaction.agentType} />
                    </TableCell>
                    <TableCell className="text-center">
                      <StatusBadge status={transaction.status} />
                    </TableCell>
                    <TableCell className="text-muted-foreground text-center">
                      {formatDate(transaction.data)}
                    </TableCell>
                    <TableCell className="text-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setOpenModal(true);
                          setSelectedTransactionId(transaction.id);
                        }}
                        className="hover:bg-primary/10"
                      >
                        <Eye className="h-4 w-4" />
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
