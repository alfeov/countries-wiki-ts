import type { SerializedError } from '@reduxjs/toolkit'
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'

export const formatApiError = (
  error: FetchBaseQueryError | SerializedError,
) => {
  console.error(error)
  if ('status' in error) {
    return `Status code: ${error.status}`
  }
  if ('message' in error) return error.message ?? 'Unknown error'
  return 'Unknown error'
}
