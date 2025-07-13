import { describe, it, expect } from 'vitest'
import type { 
  Transaction, 
  TransactionStatus, 
  AgentType, 
  SearchFilters, 
  PaginationParams, 
  PaginatedResponse, 
  MetaPagination 
} from '../transactions'

describe('Tipos de Transaction', () => {
  describe('TransactionStatus', () => {
    it('debería aceptar valores de estado válidos', () => {
      const validStatuses: TransactionStatus[] = ['ACTIVE', 'INACTIVE', 'PENDING', 'SUSPENDED']
      
      validStatuses.forEach(status => {
        expect(status).toMatch(/^(ACTIVE|INACTIVE|PENDING|SUSPENDED)$/)
      })
    })
  })

  describe('AgentType', () => {
    it('debería aceptar valores de tipo de agente válidos', () => {
      const validAgentTypes: AgentType[] = ['INDIVIDUAL', 'COMPANY', 'GOVERNMENT', 'ORGANIZATION']
      
      validAgentTypes.forEach(type => {
        expect(type).toMatch(/^(INDIVIDUAL|COMPANY|GOVERNMENT|ORGANIZATION)$/)
      })
    })
  })

  describe('Transaction', () => {
    it('debería tener la estructura correcta', () => {
      const transaction: Transaction = {
        id: '1',
        data: new Date(),
        name: 'Test Transaction',
        amount: 1000,
        country: 'USA',
        agentType: 'INDIVIDUAL',
        status: 'ACTIVE',
      }

      expect(transaction).toMatchObject({
        id: expect.any(String),
        data: expect.any(Date),
        name: expect.any(String),
        amount: expect.any(Number),
        country: expect.any(String),
        agentType: expect.stringMatching(/^(INDIVIDUAL|COMPANY|GOVERNMENT|ORGANIZATION)$/),
        status: expect.stringMatching(/^(ACTIVE|INACTIVE|PENDING|SUSPENDED)$/),
      })
    })
  })

  describe('SearchFilters', () => {
    it('debería permitir filtros opcionales', () => {
      const filters: SearchFilters = {
        status: 'ACTIVE',
        agentType: 'INDIVIDUAL',
        page: 1,
        limit: 10,
      }

      expect(filters.status).toBe('ACTIVE')
      expect(filters.agentType).toBe('INDIVIDUAL')
      expect(filters.page).toBe(1)
      expect(filters.limit).toBe(10)
    })

    it('debería permitir filtros vacíos', () => {
      const filters: SearchFilters = {}
      expect(filters).toEqual({})
    })
  })

  describe('PaginationParams', () => {
    it('debería tener page y limit requeridos', () => {
      const pagination: PaginationParams = {
        page: 1,
        limit: 10,
      }

      expect(pagination.page).toBe(1)
      expect(pagination.limit).toBe(10)
    })
  })

  describe('MetaPagination', () => {
    it('debería tener la estructura correcta', () => {
      const meta: MetaPagination = {
        currentPage: 1,
        totalPages: 5,
        totalItems: 50,
        itemsPerPage: 10,
        hasNextPage: true,
        hasPreviousPage: false,
      }

      expect(meta).toMatchObject({
        currentPage: expect.any(Number),
        totalPages: expect.any(Number),
        totalItems: expect.any(Number),
        itemsPerPage: expect.any(Number),
        hasNextPage: expect.any(Boolean),
        hasPreviousPage: expect.any(Boolean),
      })
    })
  })

  describe('PaginatedResponse', () => {
    it('debería tener la estructura correcta con data y meta', () => {
      const response: PaginatedResponse<Transaction> = {
        data: [
          {
            id: '1',
            data: new Date(),
            name: 'Test Transaction',
            amount: 1000,
            country: 'USA',
            agentType: 'INDIVIDUAL',
            status: 'ACTIVE',
          }
        ],
        meta: {
          currentPage: 1,
          totalPages: 1,
          totalItems: 1,
          itemsPerPage: 10,
          hasNextPage: false,
          hasPreviousPage: false,
        },
      }

      expect(response.data).toBeInstanceOf(Array)
      expect(response.meta).toBeDefined()
      expect(response.data[0]).toMatchObject({
        id: expect.any(String),
        name: expect.any(String),
        amount: expect.any(Number),
      })
    })

    it('debería funcionar con tipos genéricos', () => {
      interface TestType {
        id: string
        value: number
      }

      const response: PaginatedResponse<TestType> = {
        data: [{ id: '1', value: 100 }],
        meta: {
          currentPage: 1,
          totalPages: 1,
          totalItems: 1,
          itemsPerPage: 10,
          hasNextPage: false,
          hasPreviousPage: false,
        },
      }

      expect(response.data[0].id).toBe('1')
      expect(response.data[0].value).toBe(100)
    })
  })
})