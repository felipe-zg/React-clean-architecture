import React from 'react'
import faker from 'faker'
import { helper, ValidationStub } from '@/presentation/test'
import { cleanup, render, RenderResult } from '@testing-library/react'
import { SignUp } from '@/presentation/pages'

type SutTypes = {
  sut: RenderResult
}

type SutParams = {
  validationError: string
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError
  const sut = render(<SignUp validation={validationStub} />)
  return {
    sut
  }
}

const simulateValidForm = (sut: RenderResult): void => {
  helper.fillField(sut, 'name')
  helper.fillField(sut, 'email')
  helper.fillField(sut, 'password')
  helper.fillField(sut, 'passwordConfirmation')
}

describe('Signup', () => {
  beforeEach(cleanup)

  it('should start with correct states', () => {
    const validationError = 'campo obrigatório'
    const { sut } = makeSut({ validationError })
    helper.testChildCount(sut, 'error-wrap', 0)
    helper.testStatusForField(sut, 'name', validationError)
    helper.testStatusForField(sut, 'email', 'campo obrigatório')
    helper.testStatusForField(sut, 'password', 'campo obrigatório')
    helper.testStatusForField(sut, 'passwordConfirmation', 'campo obrigatório')
    helper.testButtonIsDisabled(sut, 'submit-button', true)
  })

  it('should show error message if name validation fails ', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    helper.fillField(sut, 'name')
    helper.testStatusForField(sut, 'name', validationError)
  })

  it('should show error message if email validation fails ', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    helper.fillField(sut, 'email')
    helper.testStatusForField(sut, 'email', validationError)
  })

  it('should show error message if password validation fails ', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    helper.fillField(sut, 'password')
    helper.testStatusForField(sut, 'password', validationError)
  })

  it('should show error message if passwordConfirmation validation fails ', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    helper.fillField(sut, 'passwordConfirmation')
    helper.testStatusForField(sut, 'passwordConfirmation', validationError)
  })

  it('should show valid status if name validation succeeds ', () => {
    const { sut } = makeSut()
    helper.fillField(sut, 'name')
    helper.testStatusForField(sut, 'name')
  })

  it('should show valid status if email validation succeeds ', () => {
    const { sut } = makeSut()
    helper.fillField(sut, 'email')
    helper.testStatusForField(sut, 'email')
  })

  it('should show valid status if password validation succeeds ', () => {
    const { sut } = makeSut()
    helper.fillField(sut, 'password')
    helper.testStatusForField(sut, 'password')
  })

  it('should show valid status if passwordConfirmation validation succeeds ', () => {
    const { sut } = makeSut()
    helper.fillField(sut, 'passwordConfirmation')
    helper.testStatusForField(sut, 'passwordConfirmation')
  })

  it('should enable submit button if validation succeds ', () => {
    const { sut } = makeSut()
    simulateValidForm(sut)
    helper.testButtonIsDisabled(sut, 'submit-button', false)
  })
})
