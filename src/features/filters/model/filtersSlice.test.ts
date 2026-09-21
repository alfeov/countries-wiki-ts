import { filtersReducer, setRegion, setSearch } from './filtersSlice'

describe('filtersSlice', () => {
  describe('search', () => {
    it('sets search and does not affect on region', () => {
      const result = filtersReducer(
        { search: 'prev search', region: 'Africa' },
        setSearch('next search'),
      )

      expect(result.search).toBe('next search')
      expect(result.region).toBe('Africa')
    })
  })
  describe('region', () => {
    it('sets region and does not affect on search', () => {
      const result = filtersReducer(
        { search: 'prev search', region: 'Africa' },
        setRegion('Oceania'),
      )

      expect(result.search).toBe('prev search')
      expect(result.region).toBe('Oceania')
    })
  })
})
