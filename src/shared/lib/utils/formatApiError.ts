import type { SerializedError } from '@reduxjs/toolkit'
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'

export const formatApiError = (
  error: FetchBaseQueryError | SerializedError | undefined,
) => {
  if (error) {
    if ('status' in error) {
      return (
        `${error.status} - ` +
        ('error' in error ? error.error : JSON.stringify(error.data))
      )
    }
    if ('message' in error) return error.message ?? 'Unknown error'
  }
  return 'Unknown error'
}
