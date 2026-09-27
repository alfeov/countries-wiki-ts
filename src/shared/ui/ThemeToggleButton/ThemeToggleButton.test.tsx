import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { themeKey } from '@/shared/lib/hooks/useToggleTheme'
import { isPreferredDarkTheme } from '@/shared/lib/utils/isPreferredDarkTheme'
import {
  getLocalStorageData,
  setLocalStorageData,
} from '@/shared/lib/utils/localStorage'

import { ThemeToggleButton } from './ThemeToggleButton'

vi.mock('@/shared/lib/utils/localStorage', { spy: true })
vi.mock('@/shared/lib/utils/isPreferredDarkTheme', { spy: true })

describe('ThemeToggleButton', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('should get theme from local storage', () => {
    vi.mocked(getLocalStorageData).mockReturnValueOnce(true)

    render(<ThemeToggleButton />)

    expect(getLocalStorageData).toHaveBeenCalledOnce()
    expect(isPreferredDarkTheme).not.toHaveBeenCalled()
  })
  it('should get preferred theme if local storage empty', () => {
    vi.mocked(getLocalStorageData).mockReturnValueOnce(null)

    render(<ThemeToggleButton />)

    expect(getLocalStorageData).toHaveBeenCalledOnce()
    expect(isPreferredDarkTheme).toHaveBeenCalledOnce()
  })

  it('should toggle html class on click', async () => {
    vi.mocked(getLocalStorageData).mockReturnValueOnce(false)

    render(<ThemeToggleButton />)

    const btn = screen.getByRole('button')

    await userEvent.click(btn)
    expect(document.documentElement).toHaveClass('dark')

    await userEvent.click(btn)
    expect(document.documentElement).not.toHaveClass('dark')
  })
  it('applies dark class on mound if stored theme is dark', () => {
    vi.mocked(getLocalStorageData).mockReturnValueOnce(true)

    render(<ThemeToggleButton />)

    expect(document.documentElement).toHaveClass('dark')
  })

  it('should store theme in local storage on click', async () => {
    render(<ThemeToggleButton />)

    const btn = screen.getByRole('button')

    await userEvent.click(btn)

    expect(setLocalStorageData).toHaveBeenCalledTimes(1)
    expect(setLocalStorageData).toHaveBeenCalledWith(themeKey, true)

    await userEvent.click(btn)

    expect(setLocalStorageData).toHaveBeenCalledTimes(2)
    expect(setLocalStorageData).toHaveBeenCalledWith(themeKey, false)
  })
})
