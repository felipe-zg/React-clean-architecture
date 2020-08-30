import React from 'react'
import { render, fireEvent, RenderResult, cleanup } from '@testing-library/react'
import Login from '@/presentation/pages/Login'
import { Validation } from '@/presentation/protocols/validation'
import faker from 'faker'

type SutTypes = {
  sut: RenderResult
  validationSpy: ValidationSpy
}

class ValidationSpy implements Validation {
  errorMessage: string
  input: unknown

  validate (input: unknown): string {
    this.input = input
    return this.errorMessage
  }
}
const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const sut = render(<Login validation={validationSpy}/>)
  return {
    sut,
    validationSpy
  }
}

describe('Login', () => {
  beforeEach(cleanup)

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

  it('should call validation with correct value on email input change', () => {
    const { sut, validationSpy } = makeSut()
    const email = faker.internet.email()
    const emailInput = sut.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: email } })
    expect(validationSpy.input).toEqual({ email })
  })

  it('should call validation with correct value on password input change', () => {
    const { sut, validationSpy } = makeSut()
    const password = faker.internet.password()
    const passwordInput = sut.getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: password } })
    expect(validationSpy.input).toEqual({ password })
  })
})
