import { SearchIcon } from 'lucide-react'
import { motion } from 'motion/react'
import { type ChangeEvent, type SubmitEvent, useState } from 'react'

import { sideVariant } from '@/shared/lib/utils/motion'
import { testLatin } from '@/shared/lib/utils/testLatin'
import { Field, FieldDescription } from '@/shared/ui/field'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/shared/ui/input-group'

import { useSearch } from '../../model/useSearch'

const initialState = { isError: false, message: '' }

export function FilterSearch() {
  const [search, setSearch] = useSearch()
  const [input, setInput] = useState(search)
  const [error, setError] = useState(initialState)

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault()
    setError(initialState)

    const formattedInput = input.trim()

    // empty search also correct
    if (formattedInput.length === 0 || testLatin(formattedInput)) {
      setSearch(formattedInput)
      event.target.reset()
    } else {
      setError({
        isError: true,
        message: 'This field can contain only latin symbols and spaces',
      })
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className='md:w-fit'
      autoComplete='off'
      {...sideVariant(-200)}
    >
      <Field data-invalid={error.isError} className='gap-[0.5rem]'>
        <InputGroup className='md:w-fit'>
          <InputGroupInput
            aria-invalid={error.isError}
            placeholder='Search for a country...'
            value={input}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setInput(event.target.value)
            }
          />
          <InputGroupAddon align='inline-end'>
            <InputGroupButton type='submit' aria-label='Search' size='icon-xs'>
              <SearchIcon />
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
        <FieldDescription className='h-[1.5em] ml-[0.5rem] text-destructive'>
          {error.message}
        </FieldDescription>
      </Field>
    </motion.form>
  )
}
