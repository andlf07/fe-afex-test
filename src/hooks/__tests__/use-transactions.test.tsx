import { describe, it, expect } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useTransactions } from '../use-transactions'
import React from 'react'

// Mock environment variable
Object.defineProperty(import.meta, 'env', {
  value: {
    VITE_API_URL: 'http://localhost:3000/api',
  },
})

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}

describe('Hook useTransactions', () => {
  it('debería obtener transacciones exitosamente', async () => {
    const { result } = renderHook(
      () => useTransactions({}),
      { wrapper: createWrapper() }
    )

    expect(result.current.isLoading).toBe(true)

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(result.current.data).toBeDefined()
    expect(result.current.data?.data).toBeInstanceOf(Array)
    expect(result.current.data?.meta).toBeDefined()
    expect(result.current.error).toBeNull()
  })

  it('debería obtener transacciones con parámetros de paginación', async () => {
    const { result } = renderHook(
      () => useTransactions({ page: 2, limit: 5 }),
      { wrapper: createWrapper() }
    )

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(result.current.data?.meta.currentPage).toBe(2)
    expect(result.current.data?.meta.itemsPerPage).toBe(5)
  })

  it('debería manejar filtros vacíos', async () => {
    const { result } = renderHook(
      () => useTransactions({}),
      { wrapper: createWrapper() }
    )

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(result.current.data).toBeDefined()
    expect(result.current.error).toBeNull()
  })

  it('debería manejar filtros con estado y tipo de agente', async () => {
    const { result } = renderHook(
      () => useTransactions({ 
        status: 'ACTIVE', 
        agentType: 'INDIVIDUAL',
        page: 1,
        limit: 10
      }),
      { wrapper: createWrapper() }
    )

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(result.current.data).toBeDefined()
    expect(result.current.error).toBeNull()
  })
})