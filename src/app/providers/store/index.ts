import { configureStore } from '@reduxjs/toolkit'

import { api } from '@/shared/api'

import { rootReducer } from './rootReducer'

export const store = configureStore({
  reducer: rootReducer,
  devTools: !import.meta.env.PROD,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(api.middleware),
})
