import { useEffect, useState } from 'react'

import { isPreferredDarkTheme } from '@/shared/lib/utils/isPreferredDarkTheme'
import {
  getLocalStorageData,
  setLocalStorageData,
} from '@/shared/lib/utils/localStorage'

const themeKey = 'countries-wiki/isDarkTheme'

function initialState() {
  return getLocalStorageData<boolean>(themeKey) ?? isPreferredDarkTheme()
}

export function useToggleTheme() {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(initialState)

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.toggle('dark', isDarkTheme)
  }, [isDarkTheme])

  function toggleTheme() {
    setIsDarkTheme(!isDarkTheme)
    setLocalStorageData(themeKey, !isDarkTheme)
  }

  return toggleTheme
}
