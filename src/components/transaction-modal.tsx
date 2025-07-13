import { useGetTransactionById } from "@/hooks/use-get-transaction-by-id";
import { formatCurrency } from "@/lib/formatCurrency";
import { formatDate } from "@/lib/formatDate";
import { getCountryFlag } from "@/lib/getCountryFlag";
import { Separator } from "@radix-ui/react-select";
import {
  Building,
  Calendar,
  CheckCircle,
  DollarSign,
  Globe,
  User,
} from "lucide-react";
import { AgentTypeBadge } from "./agent-type-badge";
import { Loader } from "./loader";
import { StatusBadge } from "./status-badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";

interface TransactionDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  transactionId: string;
}

export function TransactionModal({
  transactionId,
  isOpen,
  onClose,
}: TransactionDetailModalProps) {
  const { data: transaction, isLoading } = useGetTransactionById(transactionId);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-semibold">
            <DollarSign className="h-6 w-6 text-primary" />
            Detalles de la transacción
          </DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center">
            <Loader />
          </div>
        ) : (
          <div className="space-y-6">
            {/* Header Card */}
            <Card className="border-l-4 border-l-primary">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">
                    Transaction #{transaction.id}
                  </CardTitle>
                  <StatusBadge status={transaction.status} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Nombre del cliente
                      </p>
                      <p className="font-medium">{transaction.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <DollarSign className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Monto</p>
                      <p className="font-bold text-lg text-primary">
                        {formatCurrency(transaction.amount)}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Separator />

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Calendar className="h-5 w-5" />
                    Fecha de la transacción
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-medium">
                    {formatDate(transaction.data)}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Globe className="h-5 w-5" />
                    País
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">
                      {getCountryFlag(transaction.country)}
                    </span>
                    <span className="text-lg font-medium">
                      {transaction.country}
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Building className="h-5 w-5" />
                    Tipo de agente
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <AgentTypeBadge agentType={transaction.agentType} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <CheckCircle className="h-5 w-5" />
                    Detalles del estado
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <StatusBadge status={transaction.status} />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Additional Information */}
            <Card className="bg-accent/50">
              <CardHeader>
                <CardTitle className="text-base">
                  Información adicional
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">
                      ID de la transacción:
                    </span>
                    <span className="ml-2 font-mono">{transaction.id}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">
                      Comisión de procesamiento:
                    </span>
                    <span className="ml-2">
                      {formatCurrency(transaction.amount * 0.025)}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Monto neto:</span>
                    <span className="ml-2 font-semibold">
                      {formatCurrency(
                        transaction.amount - transaction.amount * 0.025
                      )}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">
                      Fecha de creación:
                    </span>
                    <span className="ml-2">{formatDate(transaction.data)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
