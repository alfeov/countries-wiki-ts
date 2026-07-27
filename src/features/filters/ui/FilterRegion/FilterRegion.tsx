import { useRegion } from '@/features/filters/model'
import { createMotionedComponent, sideVariant } from '@/shared/lib/utils/motion'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select'

const MotionSelectTrigger = createMotionedComponent(SelectTrigger)

export function FilterRegion() {
  const [region, setRegion] = useRegion()

  return (
    <Select
      value={region}
      onValueChange={(value) => value !== null && setRegion(value)}
    >
      <MotionSelectTrigger
        {...sideVariant(200)}
        className='w-full md:max-w-60 bg-input/50'
      >
        <SelectValue placeholder='Select a Region' />
      </MotionSelectTrigger>
      <SelectContent alignItemWithTrigger={false}>
        <SelectGroup>
          <SelectLabel>Regions</SelectLabel>
          <SelectItem value=''>All</SelectItem>
          <SelectItem value='Africa'>Africa</SelectItem>
          <SelectItem value='Americas'>America</SelectItem>
          <SelectItem value='Asia'>Asia</SelectItem>
          <SelectItem value='Europe'>Europe</SelectItem>
          <SelectItem value='Oceania'>Oceania</SelectItem>
          <SelectItem value='Antarctic'>Antarctic</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
