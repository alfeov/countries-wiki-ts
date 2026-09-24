import { cleanup } from '@testing-library/react'

import { server } from './mocks/api/server'

import '@testing-library/jest-dom/vitest'

beforeAll(() => server.listen())

beforeEach(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  })
  Object.defineProperty(window, 'scrollTo', {
    writable: true,
    value: () => {},
  })
})

afterEach(() => {
  cleanup()
  vi.clearAllMocks()
  server.resetHandlers()
})

afterAll(() => server.close())
