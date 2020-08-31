import React from 'react'
import { render, fireEvent, RenderResult, cleanup } from '@testing-library/react'

import { ValidationStub } from '@/presentation/test'
import Login from '@/presentation/pages/Login'

import faker from 'faker'

type SutTypes = {
  sut: RenderResult
  validationStub: ValidationStub
}

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = faker.random.words()
  const sut = render(<Login validation={validationStub}/>)
  return {
    sut,
    validationStub: validationStub
  }
}

describe('Login', () => {
  beforeEach(cleanup)

  it('should not render spinner and error message on mount', () => {
    const { sut, validationStub } = makeSut()
    const emailStatus = sut.getByTestId('email-status')
    const passwordStatus = sut.getByTestId('password-status')

    expect(sut.getByTestId('error-wrap').childElementCount).toBe(0)
    expect(emailStatus.title).toBe(validationStub.errorMessage)
    expect(emailStatus.textContent).toBe('🔴')
    expect(passwordStatus.title).toBe(validationStub.errorMessage)
    expect(passwordStatus.textContent).toBe('🔴')
    expect((sut.getByTestId('submit-button') as HTMLButtonElement).disabled).toBe(true)
  })

  it('should show error message if email validation fails ', () => {
    const { sut, validationStub: validationSpy } = makeSut()
    const emailInput = sut.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe(validationSpy.errorMessage)
    expect(emailStatus.textContent).toBe('🔴')
  })

  it('should show error message if password validation fails ', () => {
    const { sut, validationStub: validationSpy } = makeSut()
    const passwordInput = sut.getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })
    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe(validationSpy.errorMessage)
    expect(passwordStatus.textContent).toBe('🔴')
  })

  it('should show valid status if email validation succeds ', () => {
    const { sut, validationStub: validationSpy } = makeSut()
    const emailInput = sut.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe(validationSpy.errorMessage)
    expect(emailStatus.textContent).toBe('🔴')
  })
})
