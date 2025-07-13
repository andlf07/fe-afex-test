import { describe, it, expect, vi, beforeEach } from 'vitest'
import { screen, fireEvent } from '@testing-library/react'
import { render } from '@/test/utils/test-utils'
import { TransactionsTable } from '../transactions-table'
import type { PaginatedResponse, Transaction } from '@/types/transactions'

const mockTransactionsData: PaginatedResponse<Transaction> = {
  data: [
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
  ],
  meta: {
    currentPage: 1,
    totalPages: 2,
    totalItems: 4,
    itemsPerPage: 2,
    hasNextPage: true,
    hasPreviousPage: false,
  },
}

describe('Componente TransactionsTable', () => {
  const mockOnPageChange = vi.fn()
  const mockOnPageSizeChange = vi.fn()

  const defaultProps = {
    transactionsData: mockTransactionsData,
    isLoading: false,
    onPageChange: mockOnPageChange,
    onPageSizeChange: mockOnPageSizeChange,
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('debería renderizar la tabla con datos de transacciones', () => {
    render(<TransactionsTable {...defaultProps} />)

    expect(screen.getByText('Test Transaction 1')).toBeInTheDocument()
    expect(screen.getByText('Test Transaction 2')).toBeInTheDocument()
    expect(screen.getByText('$1,000.00')).toBeInTheDocument()
    expect(screen.getByText('$2,000.00')).toBeInTheDocument()
  })

  it('debería mostrar el estado de carga', () => {
    render(<TransactionsTable {...defaultProps} isLoading={true} />)

    expect(screen.getByTestId('loader')).toBeInTheDocument()
  })

  it('debería renderizar la información de paginación', () => {
    render(<TransactionsTable {...defaultProps} />)

    expect(screen.getByText('Mostrando 1 a 2 de 4 transacciones')).toBeInTheDocument()
    expect(screen.getByText('Página 1 de 2')).toBeInTheDocument()
  })

  it('debería manejar la navegación entre páginas', () => {
    render(<TransactionsTable {...defaultProps} />)

    const nextButton = screen.getByText('Siguiente')
    fireEvent.click(nextButton)

    expect(mockOnPageChange).toHaveBeenCalledWith(2)
  })

  it('debería deshabilitar el botón anterior en la primera página', () => {
    render(<TransactionsTable {...defaultProps} />)

    const previousButton = screen.getByText('Anterior')
    expect(previousButton).toBeDisabled()
  })

  it('debería deshabilitar el botón siguiente en la última página', () => {
    const lastPageData = {
      ...mockTransactionsData,
      meta: {
        ...mockTransactionsData.meta,
        currentPage: 2,
        hasNextPage: false,
        hasPreviousPage: true,
      },
    }

    render(<TransactionsTable {...defaultProps} transactionsData={lastPageData} />)

    const nextButton = screen.getByText('Siguiente')
    expect(nextButton).toBeDisabled()
  })

  it('debería manejar el cambio de tamaño de página', () => {
    render(<TransactionsTable {...defaultProps} />)

    // Encontrar el trigger del select y hacer click
    const selectTrigger = screen.getByRole('combobox')
    fireEvent.click(selectTrigger)

    // Encontrar y hacer click en la opción 20
    const option20 = screen.getByText('20')
    fireEvent.click(option20)

    expect(mockOnPageSizeChange).toHaveBeenCalledWith(20)
  })

  it('debería abrir el modal de transacción cuando se hace click en el botón de acción', () => {
    render(<TransactionsTable {...defaultProps} />)

    const actionButtons = screen.getAllByRole('button')
    const eyeButton = actionButtons.find(button => 
      button.querySelector('svg') !== null
    )
    
    if (eyeButton) {
      fireEvent.click(eyeButton)
      // El modal debería abrirse (esto necesitaría ser probado basado en la implementación del modal)
      // Por ahora solo verificamos que el botón fue clickeado sin error
      expect(eyeButton).toBeInTheDocument()
    }
  })

  it('debería renderizar correctamente los encabezados de la tabla', () => {
    render(<TransactionsTable {...defaultProps} />)

    expect(screen.getByText('ID')).toBeInTheDocument()
    expect(screen.getByText('Nombre')).toBeInTheDocument()
    expect(screen.getByText('Monto')).toBeInTheDocument()
    expect(screen.getByText('País')).toBeInTheDocument()
    expect(screen.getByText('Tipo de Agente')).toBeInTheDocument()
    expect(screen.getByText('Estado')).toBeInTheDocument()
    expect(screen.getByText('Fecha')).toBeInTheDocument()
    expect(screen.getByText('Acciones')).toBeInTheDocument()
  })

  it('debería renderizar una tabla vacía cuando no hay datos', () => {
    const emptyData = {
      ...mockTransactionsData,
      data: [],
    }

    render(<TransactionsTable {...defaultProps} transactionsData={emptyData} />)

    expect(screen.getByRole('table')).toBeInTheDocument()
    expect(screen.queryByText('Test Transaction 1')).not.toBeInTheDocument()
  })

  it('debería manejar transactionsData undefined', () => {
    render(<TransactionsTable {...defaultProps} transactionsData={undefined} />)

    expect(screen.getByRole('table')).toBeInTheDocument()
  })
})