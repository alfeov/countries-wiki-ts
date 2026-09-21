import { type ChangeEvent, type SubmitEvent, useState } from 'react'

import { testLatin } from '@/shared/lib/utils/testLatin'

const initialState = { isError: false, message: '' }

export function useSearchForm(
  onSubmit: (arg: string) => void,
  initialInputValue = '',
) {
  const [input, setInput] = useState(initialInputValue)
  const [error, setError] = useState(initialState)

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault()

    const formattedInput = input.trim()

    // empty search also correct (reset filters)
    const isEmpty = formattedInput.length === 0
    if (isEmpty || testLatin(formattedInput)) {
      onSubmit(formattedInput)
      setError(initialState)
    } else {
      setError({
        isError: true,
        message: 'This field can contain only latin symbols',
      })
    }
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    setInput(event.target.value)

  return { handleChange, handleSubmit, error, input }
}
