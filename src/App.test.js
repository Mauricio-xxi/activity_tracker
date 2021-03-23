import { render, screen } from '@testing-library/react'
import App from './App'

test('renders learn react link', () => {
    render(<App />)
    const title = screen.getByText(/My 2020 Activities/i)
    expect(title).toBeInTheDocument()
})
