import { cleanup } from '@testing-library/react'

import { server } from './mocks/api/server'

import '@testing-library/jest-dom/vitest'

export const spyOnConsoleError = vi
  .spyOn(console, 'error')
  .mockImplementation(vi.fn())

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
    value: vi.fn(),
  })
})

afterEach(() => {
  cleanup()
  vi.clearAllMocks()
  server.resetHandlers()
})

afterAll(() => server.close())
