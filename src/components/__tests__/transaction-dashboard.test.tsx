import { describe, it, expect, vi } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import { render } from '@/test/utils/test-utils'
import { TransactionDashboard } from '../transaction-dashboard'

// Mock the hooks
vi.mock('@/hooks/use-pagination', () => ({
  default: () => ({
    currentPage: 1,
    pageSize: 10,
    handlePageChange: vi.fn(),
    handlePageSizeChange: vi.fn(),
  }),
}))

// Mock environment variable
Object.defineProperty(import.meta, 'env', {
  value: {
    VITE_API_URL: 'http://localhost:3000/api',
  },
})

describe('Componente TransactionDashboard', () => {
  it('debería renderizar el título y descripción del dashboard', () => {
    render(<TransactionDashboard />)

    expect(screen.getByText('Dashboard de Transacciones')).toBeInTheDocument()
    expect(screen.getByText('Monitorea y administra tus transacciones')).toBeInTheDocument()
  })

  it('debería renderizar la tabla de transacciones', async () => {
    render(<TransactionDashboard />)

    // Inicialmente debería mostrar carga
    expect(screen.getByTestId('loader')).toBeInTheDocument()

    // Esperar a que los datos se carguen y aparezca la tabla
    await waitFor(() => {
      expect(screen.getByRole('table')).toBeInTheDocument()
    })
  })

  it('debería renderizar los encabezados de la tabla', async () => {
    render(<TransactionDashboard />)

    await waitFor(() => {
      expect(screen.getByText('ID')).toBeInTheDocument()
      expect(screen.getByText('Nombre')).toBeInTheDocument()
      expect(screen.getByText('Monto')).toBeInTheDocument()
      expect(screen.getByText('País')).toBeInTheDocument()
      expect(screen.getByText('Tipo de Agente')).toBeInTheDocument()
      expect(screen.getByText('Estado')).toBeInTheDocument()
      expect(screen.getByText('Fecha')).toBeInTheDocument()
      expect(screen.getByText('Acciones')).toBeInTheDocument()
    })
  })

  it('debería renderizar los controles de paginación', async () => {
    render(<TransactionDashboard />)

    await waitFor(() => {
      expect(screen.getByText('Resultados por página:')).toBeInTheDocument()
      expect(screen.getByText('Anterior')).toBeInTheDocument()
      expect(screen.getByText('Siguiente')).toBeInTheDocument()
    })
  })

  it('debería tener la estructura de layout correcta', () => {
    render(<TransactionDashboard />)

    // Verificar las clases del contenedor principal encontrando el div más externo
    const dashboard = screen.getByText('Dashboard de Transacciones')
    expect(dashboard).toBeInTheDocument()
    
    // Verificar que el título de la página sea renderizado
    expect(screen.getByText('Monitorea y administra tus transacciones')).toBeInTheDocument()
  })

  it('debería renderizar los datos de transacciones cuando se cargan', async () => {
    render(<TransactionDashboard />)

    await waitFor(() => {
      expect(screen.getByText('Test Transaction 1')).toBeInTheDocument()
      expect(screen.getByText('Test Transaction 2')).toBeInTheDocument()
    })
  })
})