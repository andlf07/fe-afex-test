import { http, HttpResponse } from 'msw'
import type { PaginatedResponse, Transaction } from '@/types/transactions'

const mockTransactions: Transaction[] = [
  {
    id: '1',
    name: 'Test Transaction 1',
    amount: 1000,
    country: 'USA',
    agentType: 'INDIVIDUAL',
    status: 'ACTIVE',
    data: new Date('2024-01-01'),
  },
  {
    id: '2',
    name: 'Test Transaction 2',
    amount: 2000,
    country: 'CAN',
    agentType: 'COMPANY',
    status: 'PENDING',
    data: new Date('2024-01-02'),
  },
  {
    id: '3',
    name: 'Test Transaction 3',
    amount: 3000,
    country: 'MEX',
    agentType: 'GOVERNMENT',
    status: 'INACTIVE',
    data: new Date('2024-01-03'),
  },
]

export const handlers = [
  http.get('*/transactions', ({ request }) => {
    const url = new URL(request.url)
    const page = Number(url.searchParams.get('page')) || 1
    const limit = Number(url.searchParams.get('limit')) || 10
    
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedData = mockTransactions.slice(startIndex, endIndex)
    
    const response: PaginatedResponse<Transaction> = {
      data: paginatedData,
      meta: {
        currentPage: page,
        totalPages: Math.ceil(mockTransactions.length / limit),
        totalItems: mockTransactions.length,
        itemsPerPage: limit,
        hasNextPage: endIndex < mockTransactions.length,
        hasPreviousPage: page > 1,
      },
    }
    
    return HttpResponse.json(response)
  }),

  http.get('*/transactions/:id', ({ params }) => {
    const { id } = params
    const transaction = mockTransactions.find(t => t.id === id)
    
    if (!transaction) {
      return new HttpResponse(null, { status: 404 })
    }
    
    return HttpResponse.json(transaction)
  }),
]