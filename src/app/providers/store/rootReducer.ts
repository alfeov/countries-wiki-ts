import { combineSlices } from '@reduxjs/toolkit'

import { filtersReducer } from '@/features/filters/model/filtersSlice'
import { api } from '@/shared/api'

export const rootReducer = combineSlices(api, {
  filters: filtersReducer,
})
