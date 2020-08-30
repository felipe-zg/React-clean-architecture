import React from 'react'
import { render, RenderResult } from '@testing-library/react'
import Login from '@/presentation/pages/Login'

type SutTypes = {
  sut: RenderResult
}
const makeSut = (): SutTypes => {
  const sut = render(<Login/>)
  return {
    sut
  }
}

describe('Login', () => {
  it('should not render spinner and error message on mount', () => {
    const { sut } = makeSut()
    const emailStatus = sut.getByTestId('email-status')
    const passwordStatus = sut.getByTestId('password-status')

    expect(sut.getByTestId('error-wrap').childElementCount).toBe(0)
    expect(emailStatus.title).toBe('Campo obrigatório')
    expect(emailStatus.textContent).toBe('🔴')
    expect(passwordStatus.title).toBe('Campo obrigatório')
    expect(passwordStatus.textContent).toBe('🔴')
    expect((sut.getByTestId('submit-button') as HTMLButtonElement).disabled).toBe(true)
  })
})
