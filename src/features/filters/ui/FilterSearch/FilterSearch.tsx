import { SearchIcon } from 'lucide-react'
import { motion } from 'motion/react'

import { useSearch } from '@/features/filters/model/useSearch'
import { useSearchForm } from '@/features/filters/model/useSearchForm'
import { sideVariant } from '@/shared/lib/utils/motion'
import { Field, FieldDescription } from '@/shared/ui/field'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/shared/ui/input-group'

export function FilterSearch() {
  const [search, setSearch] = useSearch()
  const { input, error, handleChange, handleSubmit } = useSearchForm(
    setSearch,
    search,
  )

  return (
    <motion.form
      onSubmit={handleSubmit}
      className='md:w-fit'
      autoComplete='off'
      {...sideVariant(-200)}
    >
      <Field data-invalid={error.isError} className='gap-[5px]'>
        <InputGroup className='md:w-fit'>
          <InputGroupInput
            aria-invalid={error.isError}
            placeholder='Search for a country...'
            value={input}
            onChange={handleChange}
          />
          <InputGroupAddon align='inline-end'>
            <InputGroupButton type='submit' aria-label='Search' size='icon-xs'>
              <SearchIcon />
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
        <FieldDescription className='h-[1.5em] ml-[5px] text-destructive'>
          {error.message}
        </FieldDescription>
      </Field>
    </motion.form>
  )
}
