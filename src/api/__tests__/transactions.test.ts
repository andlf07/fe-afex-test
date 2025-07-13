import { describe, it, expect } from 'vitest'
import { getTransactions, getTransaction } from '../transactions'

// Mock environment variable
Object.defineProperty(import.meta, 'env', {
  value: {
    VITE_API_URL: 'http://localhost:3000/api',
  },
})

describe('API de transacciones', () => {
  describe('getTransactions', () => {
    it('debería obtener transacciones con paginación por defecto', async () => {
      const result = await getTransactions({})
      
      expect(result).toBeDefined()
      expect(result.data).toBeInstanceOf(Array)
      expect(result.meta).toBeDefined()
      expect(result.meta.currentPage).toBe(1)
      expect(result.meta.itemsPerPage).toBe(10)
    })

    it('debería obtener transacciones con paginación personalizada', async () => {
      const result = await getTransactions({ page: 2, limit: 5 })
      
      expect(result.meta.currentPage).toBe(2)
      expect(result.meta.itemsPerPage).toBe(5)
    })

    it('debería manejar correctamente los metadatos de paginación', async () => {
      const result = await getTransactions({ page: 1, limit: 2 })
      
      expect(result.meta.totalItems).toBe(3)
      expect(result.meta.totalPages).toBe(2)
      expect(result.meta.hasNextPage).toBe(true)
      expect(result.meta.hasPreviousPage).toBe(false)
    })

    it('debería retornar la estructura de datos correcta', async () => {
      const result = await getTransactions({})
      
      expect(result.data[0]).toMatchObject({
        id: expect.any(String),
        name: expect.any(String),
        amount: expect.any(Number),
        country: expect.any(String),
        agentType: expect.stringMatching(/^(INDIVIDUAL|COMPANY|GOVERNMENT|ORGANIZATION)$/),
        status: expect.stringMatching(/^(ACTIVE|INACTIVE|PENDING|SUSPENDED)$/),
      })
      
      expect(result.data[0].data).toBeDefined()
    })
  })

  describe('getTransaction', () => {
    it('debería obtener una transacción individual por ID', async () => {
      const result = await getTransaction('1')
      
      expect(result).toBeDefined()
      expect(result.id).toBe('1')
      expect(result.name).toBe('Test Transaction 1')
    })

    it('debería manejar IDs de transacción inexistentes', async () => {
      await expect(getTransaction('999')).rejects.toThrow()
    })
  })
})