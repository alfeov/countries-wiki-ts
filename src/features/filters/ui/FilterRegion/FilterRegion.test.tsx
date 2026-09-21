import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { renderWithRedux } from '@/test/renderWithRedux'

import { FilterRegion } from './FilterRegion'

describe('FilterRegion', () => {
  beforeEach(() => {
    renderWithRedux(<FilterRegion />)
  })
  it('displays the selected region', async () => {
    const selectBtn = screen.getByRole('combobox')

    await userEvent.click(selectBtn)
    const africaSelectOption = screen.getByText('Africa')
    await userEvent.click(africaSelectOption)

    expect(selectBtn).toHaveTextContent('Africa')
  })
  it('shows placeholder when "All" is selected', async () => {
    const selectBtn = screen.getByRole('combobox')

    await userEvent.click(selectBtn)
    const allSelectOption = screen.getByText('All')
    await userEvent.click(allSelectOption)

    expect(selectBtn).toHaveTextContent('Select a Region')
  })
  it('displays "Americas" label for the "America" option', async () => {
    const selectBtn = screen.getByRole('combobox')

    await userEvent.click(selectBtn)
    const americaSelectOption = screen.getByText('America')
    await userEvent.click(americaSelectOption)

    expect(selectBtn).toHaveTextContent('Americas')
  })
})
