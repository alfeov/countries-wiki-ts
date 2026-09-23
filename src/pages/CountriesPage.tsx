import { FilterRegion } from '@/features/filters/ui/FilterRegion'
import { FilterSearch } from '@/features/filters/ui/FilterSearch'
import { FilterGroup } from '@/shared/ui/FilterGroup'
import { CountriesList } from '@/widgets/countries/ui/CountriesList'

export function CountriesPage() {
  return (
    <div className='flex gap-5 flex-col' data-testid='countries-page'>
      <FilterGroup>
        <FilterSearch />
        <FilterRegion />
      </FilterGroup>
      <CountriesList />
    </div>
  )
}
