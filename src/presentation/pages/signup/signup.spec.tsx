import React from 'react'
import faker from 'faker'
import { ValidationStub } from '@/presentation/test'
import { cleanup, render, RenderResult } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { SignUp } from '@/presentation/pages'

type SutTypes = {
  sut: RenderResult
}

const makeSut = (): SutTypes => {
  const sut = render(
    <SignUp />
  )
  return {
    sut
  }
}

const testChildCount = (sut: RenderResult, fieldName: string, count: number): void => {
  expect((sut.getByTestId(fieldName)).childElementCount).toBe(count)
}

const testStatusForField = (sut: RenderResult, fieldName: string, validationError?: string): void => {
  const fieldStatus = sut.getByTestId(`${fieldName}-status`)
  expect(fieldStatus.title).toBe(validationError || 'Tudo certo!')
  expect(fieldStatus.textContent).toBe(validationError ? '🔴' : '🟢')
}

const testButtonIsDisabled = (sut: RenderResult, elementTestId: string, isDisabled: boolean): void => {
  expect((sut.getByTestId(elementTestId) as HTMLButtonElement).disabled).toBe(isDisabled)
}

describe('Signup', () => {
  beforeEach(cleanup)

  it('should start with correct states', () => {
    const validationError = 'campo obrigatório'
    const { sut } = makeSut()
    testChildCount(sut, 'error-wrap', 0)
    testStatusForField(sut, 'name', validationError)
    testStatusForField(sut, 'email', validationError)
    testStatusForField(sut, 'password', validationError)
    testStatusForField(sut, 'passwordConfirmation', validationError)
    testButtonIsDisabled(sut, 'submit-button', true)
  })
})
