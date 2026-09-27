import { getLocalStorageData, setLocalStorageData } from './localStorage'

const spyOnGetItem = vi.spyOn(Storage.prototype, 'getItem')
const spyOnSetItem = vi.spyOn(Storage.prototype, 'setItem')
const spyOnConsoleError = vi.spyOn(console, 'error').mockImplementation(vi.fn())

const localStorageKey = 'key'

describe('localStorage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  describe('getLocalStorageData', () => {
    it('should return parsed local storage data if present', () => {
      const spyOnJsonParse = vi.spyOn(JSON, 'parse')
      vi.mocked(localStorage.getItem).mockReturnValueOnce('{ "ok": true }')

      expect(getLocalStorageData(localStorageKey)).toEqual({ ok: true })

      expect(spyOnGetItem).toHaveBeenCalledOnce()
      expect(spyOnGetItem).toHaveBeenCalledWith(localStorageKey)
      expect(spyOnJsonParse).toHaveBeenCalledOnce()
    })
    it('should return undefined if data by key does not exist in localStorage', () => {
      expect(getLocalStorageData(localStorageKey)).toEqual(undefined)
    })
    it('should return undefined and console error on parsing error', () => {
      vi.mocked(localStorage.getItem).mockReturnValueOnce('}}}}')

      expect(getLocalStorageData(localStorageKey)).toEqual(undefined)

      expect(spyOnConsoleError).toHaveBeenCalledOnce()
    })
    it('should return undefined and console error on storage error', () => {
      const error = new Error('Storage Error')
      vi.mocked(localStorage.getItem).mockThrowOnce(error)

      expect(getLocalStorageData(localStorageKey)).toEqual(undefined)

      expect(spyOnConsoleError).toHaveBeenCalledOnce()
      expect(spyOnConsoleError).toHaveBeenCalledWith(error)
    })
  })
  describe('setLocalStorageData', () => {
    it('should store stringified data in local storage', () => {
      const stringifiedData = JSON.stringify({ ok: true })
      const spyOnJsonStringify = vi.spyOn(JSON, 'stringify')

      setLocalStorageData(localStorageKey, { ok: true })

      expect(spyOnSetItem).toHaveBeenCalledOnce()
      expect(spyOnSetItem).toHaveBeenCalledWith(
        localStorageKey,
        stringifiedData,
      )
      expect(spyOnJsonStringify).toHaveBeenCalledOnce()
    })
    it('should console error message on error', () => {
      const error = new Error('Storage Error')
      vi.mocked(localStorage.setItem).mockThrowOnce(error)

      setLocalStorageData(localStorageKey, { ok: false })

      expect(spyOnConsoleError).toHaveBeenCalledOnce()
      expect(spyOnConsoleError).toHaveBeenCalledWith(error)
    })
  })
})
