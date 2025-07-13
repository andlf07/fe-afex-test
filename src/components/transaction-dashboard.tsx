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
    <div className="min-h-screen bg-background p-2 sm:p-4 lg:p-6">
      <div className="max-w-7xl mx-auto space-y-3 sm:space-y-4 lg:space-y-6">
        <div className="flex flex-col gap-2 sm:gap-4">
          <div className="text-center sm:text-left">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground leading-tight">
              Dashboard de Transacciones
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-1">
              Monitorea y administra tus transacciones
            </p>
          </div>
        </div>

        <Card className="shadow-sm">
          <CardContent className="p-2 sm:p-4 lg:p-6">
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
