import { useDispatch, useSelector } from 'react-redux'

import {
  selectRegion,
  setRegion as setRegionAction,
} from '@/features/filters/model'

import type { FilterRegion } from './types'

export function useRegion(): [
  region: typeof region,
  setRegion: typeof setRegion,
] {
  const region = useSelector(selectRegion)
  const dispatch = useDispatch()

  const setRegion = (data: FilterRegion) => dispatch(setRegionAction(data))

  return [region, setRegion]
}
