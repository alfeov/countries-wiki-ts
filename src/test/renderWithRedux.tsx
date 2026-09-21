import { render } from '@testing-library/react'
import { Provider } from 'react-redux'

import { type PreloadedState, setupStore } from '@/app/providers/store'

export type StoreType = ReturnType<typeof setupStore>

export function renderWithRedux(
  component: React.ReactNode,
  preloadedState?: PreloadedState,
) {
  const mockStore = setupStore(preloadedState)

  return {
    mockStore,
    ...render(<Provider store={mockStore}>{component}</Provider>),
  }
}
