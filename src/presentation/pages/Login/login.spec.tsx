import React from 'react'
import { render } from '@testing-library/react'
import Login from '@/presentation/pages/Login'

describe('Login', () => {
  it('should not render spinner and error message on mount', () => {
    const { getByTestId } = render(<Login/>)
    expect(getByTestId('error-wrap').childElementCount).toBe(0)
  })
})
