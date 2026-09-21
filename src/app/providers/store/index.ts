import { configureStore } from '@reduxjs/toolkit'

import { api } from '@/shared/api'

import { rootReducer } from './rootReducer'

export type PreloadedState = Parameters<typeof rootReducer>[0]

export const setupStore = (preloadedState?: PreloadedState) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    devTools: !import.meta.env.PROD,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(api.middleware),
  })
}

export const store = setupStore()
