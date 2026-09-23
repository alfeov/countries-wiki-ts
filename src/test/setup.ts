import { cleanup } from '@testing-library/react'

import '@testing-library/jest-dom/vitest'

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
  vi.resetAllMocks()
})
