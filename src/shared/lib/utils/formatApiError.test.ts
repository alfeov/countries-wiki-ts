import type { SerializedError } from '@reduxjs/toolkit'
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'

import { spyOnConsoleError } from '@/test/vitest.setup'

import { formatApiError } from './formatApiError'

describe('formatApiError', () => {
  it('should return status code message when status is present', () => {
    const error: FetchBaseQueryError = {
      status: 404,
      data: 'unknown',
    }

    const result = formatApiError(error)

    expect(spyOnConsoleError).toHaveBeenCalledOnce()
    expect(spyOnConsoleError).toHaveBeenCalledWith(error)
    expect(result).toBe('Status code: 404')
  })
  it('should return error message if message is present', () => {
    const error: SerializedError = {
      message: 'Error text',
    }

    const result = formatApiError(error)

    expect(spyOnConsoleError).toHaveBeenCalledOnce()
    expect(spyOnConsoleError).toHaveBeenCalledWith(error)
    expect(result).toBe('Error text')
  })
  it('should return "Unknown error" when message is nullish', () => {
    const error: SerializedError = {
      code: 'CODE',
      message: undefined,
    }

    const result = formatApiError(error)

    expect(spyOnConsoleError).toHaveBeenCalledOnce()
    expect(spyOnConsoleError).toHaveBeenCalledWith(error)
    expect(result).toBe('Unknown error')
  })
  it('should return "Unknown error" when neither is present', () => {
    const error: SerializedError = {
      name: 'serialized error',
    }

    const result = formatApiError(error)

    expect(spyOnConsoleError).toHaveBeenCalledOnce()
    expect(spyOnConsoleError).toHaveBeenCalledWith(error)
    expect(result).toBe('Unknown error')
  })
})
