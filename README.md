# Dashboard de Transacciones

Una aplicación web como Test de AFEX visualizar transacciones de forma paginada con una interfaz intuitiva.

## ¿Qué hace?

Este proyecto es un dashboard que permite:

- Visualizar transacciones en una tabla paginada
- Navegar entre páginas de resultados
- Seleccionar cuántos elementos mostrar por página (10, 20, 50, 100)
- Ver detalles de cada transacción en un modal
- Filtrar y buscar transacciones (funcionalidad preparada)

## Tecnologías utilizadas

- **React 19** - Framework principal
- **TypeScript** - Tipado estático
- **Vite** - Build tool y desarrollo
- **TailwindCSS** - Estilos y diseño
- **Radix UI** - Componentes de interfaz accesibles
- **TanStack Query** - Gestión de estado y cache
- **Axios** - Cliente HTTP
- **Lucide React** - Iconos

## Requisitos previos

- Node.js 18+
- npm o yarn
- Una API backend que proporcione los endpoints de transacciones

## Instalación y configuración

1. **Clonar el repositorio:**

   ```bash
   git clone <url-del-repositorio>
   cd fe-afex-test
   ```

2. **Instalar dependencias:**

   ```bash
   npm install
   ```

3. **Configurar variables de entorno:**
   Crear un archivo `.env.local` en la raíz del proyecto:

   ```env
   VITE_API_URL=https://be-afex-test.onrender.com/api
   ```

   > **Nota:** El proyecto está configurado para usar la API de producción. Para desarrollo local, cambiar la URL según sea necesario.

4. **Ejecutar en desarrollo:**
   ```bash
   npm run dev
   ```

## Estructura del proyecto

```
src/
├── api/             # Llamadas a la API
├── components/      # Componentes React
├── hooks/          # Hooks personalizados
├── lib/            # Utilidades y helpers
├── pages/          # Páginas de la aplicación
└── types/          # Definiciones de TypeScript
```

## API Endpoints requeridos

La aplicación espera que el backend proporcione:

- `GET /api/transactions` - Lista paginada de transacciones
- `GET /api/transactions/:id` - Detalle de una transacción

### Formato de respuesta esperado:

```json
{
  "data": [
    {
      "id": "string",
      "name": "string",
      "amount": number,
      "country": "string",
      "agentType": "INDIVIDUAL" | "COMPANY" | "GOVERNMENT" | "ORGANIZATION",
      "status": "ACTIVE" | "INACTIVE" | "PENDING" | "SUSPENDED",
      "data": "2024-01-01T00:00:00.000Z"
    }
  ],
  "meta": {
    "currentPage": 1,
    "totalPages": 10,
    "totalItems": 100,
    "itemsPerPage": 10,
    "hasNextPage": true,
    "hasPreviousPage": false
  }
}
```

## Scripts disponibles

### Desarrollo
- `npm run dev` - Ejecutar en modo desarrollo
- `npm run build` - Crear build de producción
- `npm run preview` - Preview del build de producción
- `npm run lint` - Ejecutar linter

### Testing
- `npm test` - Ejecutar todos los tests
- `npm run test:watch` - Ejecutar tests en modo watch (se re-ejecutan automáticamente al hacer cambios)
- `npm run test:ui` - Ejecutar tests con interfaz gráfica de Vitest
- `npm run test:coverage` - Ejecutar tests y generar reporte de cobertura

## Testing

El proyecto cuenta con un sistema completo de unit testing utilizando **Vitest** y **Testing Library**. 

### Configuración de Testing

- **Framework**: Vitest (compatible con Jest)
- **Testing Library**: Para testing de componentes React
- **MSW (Mock Service Worker)**: Para mocking de APIs
- **Cobertura**: 36 tests en 5 archivos

### Estructura de Tests

```
src/
├── api/__tests__/              # Tests de funciones de API
├── components/__tests__/       # Tests de componentes React
├── hooks/__tests__/           # Tests de hooks personalizados
├── types/__tests__/           # Tests de tipos TypeScript
└── test/
    ├── mocks/                 # Mocks de API con MSW
    ├── utils/                 # Utilidades de testing
    └── setup.ts               # Configuración global
```

### Ejecutar Tests

```bash
# Ejecutar todos los tests una vez
npm test

# Ejecutar tests en modo watch (recomendado para desarrollo)
npm run test:watch

# Ejecutar tests con interfaz gráfica
npm run test:ui

# Generar reporte de cobertura
npm run test:coverage
```

### Tipos de Tests Incluidos

1. **Tests de API** (`src/api/__tests__/`)
   - Pruebas de paginación
   - Manejo de errores
   - Estructura de datos

2. **Tests de Componentes** (`src/components/__tests__/`)
   - Renderizado correcto
   - Interacciones de usuario
   - Estados de carga
   - Paginación

3. **Tests de Hooks** (`src/hooks/__tests__/`)
   - Hook useTransactions
   - Integración con TanStack Query

4. **Tests de Tipos** (`src/types/__tests__/`)
   - Validación de interfaces TypeScript
   - Tipos de datos

## Características

- **Paginación completa**: Navegación entre páginas y selección de tamaño de página
- **Diseño responsive**: Se adapta a diferentes tamaños de pantalla
- **Interfaz moderna**: Utiliza componentes de Radix UI con TailwindCSS
- **Tipado fuerte**: TypeScript en todo el proyecto
- **Gestión de estado**: TanStack Query para cache y sincronización
- **Testing completo**: 36 unit tests con Vitest y Testing Library
- **Modular**: Código organizado y reutilizable

## Guía de Desarrollo

### Flujo de desarrollo recomendado

1. **Clonar y configurar el proyecto**
2. **Ejecutar tests para verificar que todo funciona:**
   ```bash
   npm test
   ```
3. **Desarrollar con tests en modo watch:**
   ```bash
   npm run test:watch
   ```
4. **Verificar cobertura antes de hacer commit:**
   ```bash
   npm run test:coverage
   ```

### Convenciones de Testing

- Todos los tests están en español
- Estructura de archivos: `__tests__` junto al código que prueban
- Mocks centralizados en `src/test/mocks/`
- Utilidades de testing reutilizables en `src/test/utils/`

### Ejemplos de uso de Tests

```bash
# Ver tests ejecutándose en tiempo real
npm run test:watch

# Interfaz gráfica para explorar tests
npm run test:ui

# Ver qué partes del código están cubiertas
npm run test:coverage
```
