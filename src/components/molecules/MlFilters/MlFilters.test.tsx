import { render, screen, fireEvent, waitFor } from '@testing-library/react'

import { PayType } from 'types/payments'
import { MlFilters } from './MlFilters'

describe('Filters Component', () => {
  test('checks that the options are not checked by default', async () => {
    render(<MlFilters activeOptions={{}} />)

    const button = screen.getByRole('button')

    fireEvent.click(button)
    await waitFor(() => screen.findAllByRole('checkbox'))

    const allOption = screen.getByDisplayValue('all')
    const linkOption = screen.getByDisplayValue(PayType.LINK)
    const dataphoneOption = screen.getByDisplayValue(PayType.DATAPHONE)

    expect(allOption).not.toBeChecked()
    expect(dataphoneOption).not.toBeChecked()
    expect(linkOption).not.toBeChecked()
  })

  test('sets link payment type as checked on filters', async () => {
    const activeOptions = {
      [PayType.LINK]: true,
    }

    render(<MlFilters activeOptions={activeOptions} />)

    const button = screen.getByRole('button')

    fireEvent.click(button)
    await waitFor(() => screen.findAllByRole('checkbox'))

    const allOption = screen.getByDisplayValue('all')
    const linkOption = screen.getByDisplayValue(PayType.LINK)
    const dataphoneOption = screen.getByDisplayValue(PayType.DATAPHONE)

    expect(allOption).not.toBeChecked()
    expect(dataphoneOption).not.toBeChecked()
    expect(linkOption).toBeChecked()
  })

  test('auto check the all options when all checkbox is checked', async () => {
    render(<MlFilters activeOptions={{}} />)

    const button = screen.getByRole('button')
    fireEvent.click(button)
    await waitFor(() => screen.findAllByRole('checkbox'))

    const allOption = screen.getByDisplayValue('all')
    fireEvent.click(allOption)
    await waitFor(() => screen.findAllByRole('checkbox'))

    const linkOption = screen.getByDisplayValue(PayType.LINK)
    const dataphoneOption = screen.getByDisplayValue(PayType.DATAPHONE)

    expect(allOption).toBeChecked()
    expect(linkOption).toBeChecked()
    expect(dataphoneOption).toBeChecked()
  })

  test('auto uncheck all option when an option is unchecked', async () => {
    render(
      <MlFilters
        activeOptions={{
          [PayType.DATAPHONE]: true,
          [PayType.LINK]: true,
        }}
      />
    )

    const button = screen.getByRole('button')
    fireEvent.click(button)
    await waitFor(() => screen.findAllByRole('checkbox'))

    const allOption = screen.getByDisplayValue('all')
    const linkOption = screen.getByDisplayValue(PayType.LINK)
    const dataphoneOption = screen.getByDisplayValue(PayType.DATAPHONE)

    fireEvent.click(linkOption)
    await waitFor(() => screen.findAllByRole('checkbox'))

    expect(allOption).not.toBeChecked()
    expect(linkOption).not.toBeChecked()
    expect(dataphoneOption).toBeChecked()
  })
})
