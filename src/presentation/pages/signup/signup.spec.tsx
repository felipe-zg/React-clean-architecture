import React from 'react'
import faker from 'faker'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { ApiContext } from '@/presentation/context'

import { AddAccountSpy, helper, ValidationStub } from '@/presentation/test'
import {
  cleanup,
  render,
  RenderResult,
  fireEvent,
  waitFor
} from '@testing-library/react'
import { SignUp } from '@/presentation/pages'
import { EmailAlreadyExistsError } from '@/domain/errors'
import { AccountModel } from '@/domain/models'

type SutTypes = {
  sut: RenderResult
  addAccountSpy: AddAccountSpy
  setCurrentAccountMock: (account: AccountModel) => void
}

type SutParams = {
  validationError: string
}

const history = createMemoryHistory({ initialEntries: ['/signup'] })

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError
  const addAccountSpy = new AddAccountSpy()
  const setCurrentAccountMock = jest.fn()
  const sut = render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
      <Router history={history}>
        <SignUp validation={validationStub} addAccount={addAccountSpy} />
      </Router>
    </ApiContext.Provider>
  )
  return {
    sut,
    addAccountSpy,
    setCurrentAccountMock
  }
}

const simulateValidForm = (
  sut: RenderResult,
  name?: string,
  email?: string,
  password?: string
): void => {
  helper.fillField(sut, 'name', name)
  helper.fillField(sut, 'email', email)
  helper.fillField(sut, 'password', password)
  helper.fillField(sut, 'passwordConfirmation', password)
}

const simulateValidFormSubmission = async (
  sut: RenderResult,
  name = faker.name.findName(),
  email = faker.internet.email(),
  password = faker.internet.password()
): Promise<void> => {
  simulateValidForm(sut, name, email, password)
  const form = sut.getByTestId('form')
  fireEvent.submit(form)
  await waitFor(() => form)
}

describe('Signup', () => {
  beforeEach(cleanup)

  it('should start with correct states', () => {
    const validationError = 'campo obrigatório'
    const { sut } = makeSut({ validationError })
    helper.testChildCount(sut, 'error-wrap', 0)
    helper.testStatusForField(sut, 'name', validationError)
    helper.testStatusForField(sut, 'email', validationError)
    helper.testStatusForField(sut, 'password', validationError)
    helper.testStatusForField(sut, 'passwordConfirmation', validationError)
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

  it('should show spinner on form submition', async () => {
    const { sut } = makeSut()
    await simulateValidFormSubmission(sut)
    helper.testElementExists(sut, 'spinner')
  })

  it('should call AddAccount with correct parameters on form submition', async () => {
    const { sut, addAccountSpy } = makeSut()
    const name = faker.name.findName()
    const email = faker.internet.email()
    const password = faker.internet.password()
    await simulateValidFormSubmission(sut, name, email, password)
    expect(addAccountSpy.params).toEqual({
      name,
      email,
      password,
      passwordConfirmation: password
    })
  })

  it('should call AddAccount only once', async () => {
    const { sut, addAccountSpy } = makeSut()
    await simulateValidFormSubmission(sut)
    await simulateValidFormSubmission(sut)
    expect(addAccountSpy.callsCount).toBe(1)
  })

  it('should not call AddAccount if form is invalid', async () => {
    const validationError = faker.random.words()
    const { sut, addAccountSpy } = makeSut({ validationError })
    await simulateValidFormSubmission(sut)
    expect(addAccountSpy.callsCount).toBe(0)
  })

  it('should show error message if addAccount fails', async () => {
    const { sut, addAccountSpy } = makeSut()
    const error = new EmailAlreadyExistsError()
    jest.spyOn(addAccountSpy, 'add').mockRejectedValueOnce(error)
    await simulateValidFormSubmission(sut)
    helper.testElementsTextContent(sut, 'main-error', error.message)
    helper.testChildCount(sut, 'error-wrap', 1)
  })

  it('should call upadateCurrentAccount and redirect user to home page if AddAccount succeeds', async () => {
    const { sut, addAccountSpy, setCurrentAccountMock } = makeSut()
    await simulateValidFormSubmission(sut)
    expect(setCurrentAccountMock).toHaveBeenCalledWith(addAccountSpy.account)
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/')
  })

  it('should redirect user to Login page if they click on go back link', () => {
    const { sut } = makeSut()
    fireEvent.click(sut.getByTestId('login'))
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/login')
  })
})
