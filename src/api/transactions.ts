import type {
  PaginatedResponse,
  SearchFilters,
  Transaction,
} from "@/types/transactions";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getTransactions = async (
  params: SearchFilters
): Promise<PaginatedResponse<Transaction>> => {
  const response = await axios.get(`${API_URL}/transactions`, { params });
  return response.data;
};

export const getTransaction = async (id: string) => {
  const response = await axios.get(`${API_URL}/transactions/${id}`);
  return response.data;
};
