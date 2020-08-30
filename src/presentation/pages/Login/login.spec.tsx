import React from 'react'
import { render } from '@testing-library/react'
import Login from '@/presentation/pages/Login'

describe('Login', () => {
  it('should not render spinner and error message on mount', () => {
    const { getByTestId } = render(<Login/>)
    const emailStatus = getByTestId('email-status')
    const passwordStatus = getByTestId('password-status')

    expect(getByTestId('error-wrap').childElementCount).toBe(0)
    expect(emailStatus.title).toBe('Campo obrigatório')
    expect(emailStatus.textContent).toBe('🔴')
    expect(passwordStatus.title).toBe('Campo obrigatório')
    expect(passwordStatus.textContent).toBe('🔴')
    expect((getByTestId('submit-button') as HTMLButtonElement).disabled).toBe(true)
  })
})
