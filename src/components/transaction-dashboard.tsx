import usePagination from "@/hooks/use-pagination";
import { useTransactions } from "@/hooks/use-transactions";
import { TransactionsTable } from "./transactions-table";
import { Card, CardContent } from "./ui/card";

export const TransactionDashboard = () => {
  const { currentPage, pageSize, handlePageChange, handlePageSizeChange } =
    usePagination();

  const { data: transactionsData, isLoading } = useTransactions({
    page: currentPage,
    limit: pageSize,
  });

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Dashboard de Transacciones
            </h1>
            <p className="text-muted-foreground">
              Monitorea y administra tus transacciones
            </p>
          </div>
        </div>

        <Card>
          <CardContent>
            <TransactionsTable
              transactionsData={transactionsData}
              isLoading={isLoading}
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
