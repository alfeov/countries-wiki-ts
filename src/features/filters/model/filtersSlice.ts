import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface FiltersState {
  search: string
  region: string
}

const initialState: FiltersState = {
  search: '',
  region: '',
}

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload
    },
    setRegion: (state, action: PayloadAction<string>) => {
      state.region = action.payload
    },
  },
  selectors: {
    selectFilters: (state) => state,
    selectSearch: (state) => state.search,
    selectRegion: (state) => state.region,
  },
})

export const filtersReducer = filtersSlice.reducer
export const { setSearch, setRegion } = filtersSlice.actions
export const { selectFilters, selectRegion, selectSearch } =
  filtersSlice.selectors
