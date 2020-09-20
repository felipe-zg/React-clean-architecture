import React from 'react'
import faker from 'faker'
import { helper, ValidationStub } from '@/presentation/test'
import {
  cleanup,
  render,
  RenderResult,
  fireEvent
} from '@testing-library/react'
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

const fillField = (
  sut: RenderResult,
  field: string,
  fieldValue = faker.random.words()
): void => {
  const input = sut.getByTestId(field)
  fireEvent.input(input, { target: { value: fieldValue } })
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
    fillField(sut, 'name')
    helper.testStatusForField(sut, 'name', validationError)
  })
})
