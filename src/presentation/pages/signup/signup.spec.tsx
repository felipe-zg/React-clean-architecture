import React from 'react'
import { helper } from '@/presentation/test'
import { cleanup, render, RenderResult } from '@testing-library/react'
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

describe('Signup', () => {
  beforeEach(cleanup)

  it('should start with correct states', () => {
    const validationError = 'campo obrigatório'
    const { sut } = makeSut()
    helper.testChildCount(sut, 'error-wrap', 0)
    helper.testStatusForField(sut, 'name', validationError)
    helper.testStatusForField(sut, 'email', validationError)
    helper.testStatusForField(sut, 'password', validationError)
    helper.testStatusForField(sut, 'passwordConfirmation', validationError)
    helper.testButtonIsDisabled(sut, 'submit-button', true)
  })
})
