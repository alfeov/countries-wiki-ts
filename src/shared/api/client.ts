import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const API_URL: string = import.meta.env.VITE_API_URL
const API_KEY: string = import.meta.env.VITE_API_KEY

export const api = createApi({
  reducerPath: 'countriesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  }),
  tagTypes: ['Countries', 'Country', 'Borders'],
  endpoints: () => ({}),
  keepUnusedDataFor: Infinity,
})
