import { render, screen } from '@testing-library/react'

import { MlSummaryCard } from './MlSummaryCard'

describe('Summary Card Component', () => {
  test('shows the contents in the card', async () => {
    const value = '5000000'
    const title = 'Test title'
    const subtitle = 'Test subtitle'

    render(<MlSummaryCard title={title} value={value} subtitle={subtitle} />)

    const valueElement = await screen.findByText(value)
    const titleElement = await screen.findByText(title)
    const subtitleElement = await screen.findByText(subtitle)

    expect(valueElement).toHaveTextContent(value)
    expect(titleElement).toHaveTextContent(title)
    expect(subtitleElement).toHaveTextContent(subtitle)
  })
})
