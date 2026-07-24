import { useDispatch, useSelector } from 'react-redux'

import {
  selectRegion,
  setRegion as setRegionAction,
} from '@/features/filters/model/filtersSlice'

export function useRegion(): [
  region: typeof region,
  setRegion: typeof setRegion,
] {
  const region = useSelector(selectRegion)
  const dispatch = useDispatch()

  const setRegion = (data: string) => dispatch(setRegionAction(data))

  return [region, setRegion]
}
