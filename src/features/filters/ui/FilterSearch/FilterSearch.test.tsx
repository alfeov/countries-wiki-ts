import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { renderWithRedux, type StoreType } from '@/test/renderWithRedux'

import { FilterSearch } from './FilterSearch'

describe('FilterSearch', () => {
  let mockStore: StoreType
  let searchInput: HTMLElement
  let submitBtn: HTMLElement
  let errorText: HTMLElement

  beforeEach(() => {
    mockStore = renderWithRedux(<FilterSearch />).mockStore
    searchInput = screen.getByPlaceholderText('Search for a country...')
    submitBtn = screen.getByRole('button', { name: /search/i })
    errorText = screen.getByRole('alert')
  })

  it('changes input value on type', async () => {
    await userEvent.type(searchInput, 'Belarus')

    expect(searchInput).toHaveValue('Belarus')
  })

  describe('submits on:', () => {
    it('Enter', async () => {
      await userEvent.type(searchInput, 'Belarus{Enter}')

      expect(mockStore.getState().filters.search).toBe('Belarus')
    })
    it('submit button click', async () => {
      await userEvent.type(searchInput, 'Belarus')
      await userEvent.click(submitBtn)

      expect(mockStore.getState().filters.search).toBe('Belarus')
    })
  })

  it('empty string and spaces are valid input', async () => {
    // already ''
    await userEvent.click(submitBtn)
    expect(errorText).toHaveTextContent('')
    expect(mockStore.getState().filters.search).toBe('')

    await userEvent.clear(searchInput)

    await userEvent.type(searchInput, '   ')
    await userEvent.click(submitBtn)
    expect(errorText).toHaveTextContent('')
    expect(mockStore.getState().filters.search).toBe('')
  })

  describe('show error text when using non latin characters:', () => {
    it('number', async () => {
      await userEvent.type(searchInput, '123')
      await userEvent.click(submitBtn)
      expect(errorText).toHaveTextContent(
        'This field can contain only latin symbols',
      )
      expect(mockStore.getState().filters.search).toBe('')
    })

    it('russian letters', async () => {
      await userEvent.type(searchInput, 'абв')
      await userEvent.click(submitBtn)
      expect(errorText).toHaveTextContent(
        'This field can contain only latin symbols',
      )
      expect(mockStore.getState().filters.search).toBe('')
    })

    it('special symbols', async () => {
      await userEvent.type(searchInput, '#$%&')
      await userEvent.click(submitBtn)
      expect(errorText).toHaveTextContent(
        'This field can contain only latin symbols',
      )
      expect(mockStore.getState().filters.search).toBe('')
    })
  })

  it('clears error after correcting input', async () => {
    await userEvent.type(searchInput, '123')
    await userEvent.click(submitBtn)
    expect(errorText).toHaveTextContent(
      'This field can contain only latin symbols',
    )
    expect(mockStore.getState().filters.search).toBe('')

    await userEvent.clear(searchInput)

    await userEvent.type(searchInput, 'Stockholm')
    await userEvent.click(submitBtn)
    expect(errorText).toHaveTextContent('')
    expect(mockStore.getState().filters.search).toBe('Stockholm')
  })
})
