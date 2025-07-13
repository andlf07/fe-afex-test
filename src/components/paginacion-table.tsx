import { type MetaPagination } from "@/types/transactions";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface PaginacionTableProps {
  pagination?: MetaPagination;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

export function PaginacionTable({
  pagination,
  onPageChange,
  onPageSizeChange,
}: PaginacionTableProps) {
  return (
    <>
      {pagination && (
        <div className="flex flex-col gap-4 pt-4 border-t border-border/40">
          <div className="flex flex-col sm:flex-row items-center gap-3 justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground whitespace-nowrap">
                Mostrar:
              </span>
              <Select
                value={pagination.itemsPerPage.toString()}
                onValueChange={(value) => onPageSizeChange(Number(value))}
              >
                <SelectTrigger className="w-20 h-9 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-sm text-muted-foreground">resultados</span>
            </div>

            <p className="text-sm text-muted-foreground text-center sm:text-right">
              <span className="hidden sm:inline">Mostrando </span>
              <span className="font-medium">
                {(pagination.currentPage - 1) * pagination.itemsPerPage + 1}-
                {Math.min(
                  pagination.currentPage * pagination.itemsPerPage,
                  pagination.totalItems
                )}
              </span>
              <span className="hidden sm:inline"> de </span>
              <span className="sm:hidden"> / </span>
              <span className="font-medium">{pagination.totalItems}</span>
              <span className="hidden sm:inline"> transacciones</span>
            </p>
          </div>

          <div className="flex flex-col xs:flex-row items-center gap-3 justify-between">
            <span className="text-sm text-muted-foreground">
              Página {pagination.currentPage} de {pagination.totalPages}
            </span>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(pagination.currentPage - 1)}
                disabled={!pagination.hasPreviousPage}
                className="h-9 px-3 text-sm"
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="hidden xs:inline ml-1">Anterior</span>
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(pagination.currentPage + 1)}
                disabled={!pagination.hasNextPage}
                className="h-9 px-3 text-sm"
              >
                <span className="hidden xs:inline mr-1">Siguiente</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
