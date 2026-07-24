import { useDispatch, useSelector } from 'react-redux'

import {
  selectSearch,
  setSearch as setSearchAction,
} from '@/features/filters/model/filtersSlice'

export function useSearch(): [
  search: typeof search,
  setSearch: typeof setSearch,
] {
  const search = useSelector(selectSearch)
  const dispatch = useDispatch()

  const setSearch = (data: string) => dispatch(setSearchAction(data))

  return [search, setSearch]
}
