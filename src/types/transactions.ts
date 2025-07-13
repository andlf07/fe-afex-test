export type TransactionStatus = "ACTIVE" | "INACTIVE" | "PENDING" | "SUSPENDED";

export type AgentType =
  | "INDIVIDUAL"
  | "COMPANY"
  | "GOVERNMENT"
  | "ORGANIZATION";

export interface SearchFilters {
  status?: TransactionStatus;
  agentType?: AgentType;
  country?: string;
  amount?: number;
  name?: string;
  dateFrom?: Date;
  dateTo?: Date;
  page?: number;
  limit?: number;
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: MetaPagination;
}

export interface MetaPagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface Transaction {
  id: string;
  data: Date;
  name: string;
  amount: number;
  country: string;
  agentType: AgentType;
  status: TransactionStatus;
}
