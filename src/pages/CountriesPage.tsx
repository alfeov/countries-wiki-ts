import { FilterRegion } from '@/features/filters/ui/FilterRegion'
import { FilterSearch } from '@/features/filters/ui/FilterSearch'
import { FilterGroup } from '@/shared/ui/FilterGroup'
import { CountriesList } from '@/widgets/countries/ui/CountriesList'

export function CountriesPage() {
  return (
    <>
      <FilterGroup>
        <FilterSearch />
        <FilterRegion />
      </FilterGroup>
      <CountriesList />
    </>
  )
}
