import { render, screen } from '@testing-library/react'
import { OptionType } from 'types'

import { MlTabs } from './MlTabs'

describe('Tabs Component', () => {
  test('render tabs and set active the first option', async () => {
    const handleChange = jest.fn()
    const options: OptionType[] = [
      { label: 'tab 1', value: 'tab1' },
      { label: 'tab 2', value: 'tab2' },
      { label: 'tab 3', value: 'tab3' },
    ]
    const active = options[0].value

    render(
      <MlTabs handleChange={handleChange} options={options} active={active} />
    )

    const optionOne = await screen.findByText(options[0].label)
    const optionTwo = await screen.findByText(options[1].label)
    const optionThree = await screen.findByText(options[2].label)

    expect(optionOne).toBeInTheDocument();
    expect(optionTwo).toBeInTheDocument();
    expect(optionThree).toBeInTheDocument();
    expect(optionOne).toHaveClass('bg-gray-200 font-bold');
    expect(optionTwo).not.toHaveClass('bg-gray-200 font-bold');
    expect(optionThree).not.toHaveClass('bg-gray-200 font-bold');
  })
})
