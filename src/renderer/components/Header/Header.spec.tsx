import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'

import Header from './Header'

describe('Header Component', () => {
	test("Greet the user saying '👋 Welcome!'", () => {
		const { getByText } = render(<Header />)
		expect(getByText('👋 Welcome!', { exact: true })).toBeInTheDocument()
	})
})
