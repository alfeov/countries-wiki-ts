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
    setError(initialState)

    const formattedInput = input.trim()

    // empty search also correct
    if (formattedInput.length === 0 || testLatin(formattedInput)) {
      onSubmit(formattedInput)
      event.target.reset()
    } else {
      setError({
        isError: true,
        message: 'This field can contain only latin symbols and spaces',
      })
    }
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    setInput(event.target.value)

  return { handleChange, handleSubmit, error, input }
}
