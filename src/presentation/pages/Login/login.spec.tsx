import React from 'react'
import faker from 'faker'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import {
  render,
  fireEvent,
  RenderResult,
  cleanup,
  waitFor
} from '@testing-library/react'

import { ApiContext } from '@/presentation/context'

import { ValidationStub, AuthenticationSpy, helper } from '@/presentation/test'
import { Login } from '@/presentation/pages'
import { InvalidCredentialsError } from '@/domain/errors'
import { AccountModel } from '@/domain/models'

type SutTypes = {
  sut: RenderResult
  authenticationSpy: AuthenticationSpy
  setCurrentAccountMock: (account: AccountModel) => void
}

type SutParams = {
  validationError: string
}

const history = createMemoryHistory({ initialEntries: ['/login'] })

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError
  const authenticationSpy = new AuthenticationSpy()
  const setCurrentAccountMock = jest.fn()
  const sut = render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
      <Router history={history}>
        <Login validation={validationStub} authentication={authenticationSpy} />
      </Router>
    </ApiContext.Provider>
  )
  return {
    sut,
    authenticationSpy,
    setCurrentAccountMock
  }
}

const simulateValidForm = async (
  sut: RenderResult,
  email = faker.internet.email(),
  password = faker.internet.password()
): Promise<void> => {
  helper.fillField(sut, 'email', email)
  helper.fillField(sut, 'password', password)
  const form = sut.getByTestId('form')
  fireEvent.submit(form)
  await waitFor(() => form)
}

describe('Login', () => {
  beforeEach(cleanup)

  it('should not render spinner and error message on mount', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    helper.testChildCount(sut, 'error-wrap', 0)
    helper.testStatusForField(sut, 'email', validationError)
    helper.testStatusForField(sut, 'password', validationError)
    helper.testButtonIsDisabled(sut, 'submit-button', true)
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

  it('should show valid status if email validation succeds ', () => {
    const { sut } = makeSut()
    helper.fillField(sut, 'email')
    helper.testStatusForField(sut, 'email')
  })

  it('should show valid status if password validation succeds ', () => {
    const { sut } = makeSut()
    helper.fillField(sut, 'password')
    helper.testStatusForField(sut, 'password')
  })

  it('should enable submit button if validation succeds ', () => {
    const { sut } = makeSut()
    helper.fillField(sut, 'email')
    helper.fillField(sut, 'password')
    helper.testButtonIsDisabled(sut, 'submit-button', false)
  })

  it('should show spinner on form submition', async () => {
    const { sut } = makeSut()
    await simulateValidForm(sut)
    helper.testElementExists(sut, 'spinner')
  })

  it('should call authentication with correct parameters on form submition', async () => {
    const { sut, authenticationSpy } = makeSut()
    const email = faker.internet.email()
    const password = faker.internet.password()
    await simulateValidForm(sut, email, password)
    expect(authenticationSpy.params).toEqual({
      email,
      password
    })
  })

  it('should call authentication only once', async () => {
    const { sut, authenticationSpy } = makeSut()
    await simulateValidForm(sut)
    await simulateValidForm(sut)
    expect(authenticationSpy.callsCount).toBe(1)
  })

  it('should not call authentication if form is invalid', async () => {
    const validationError = faker.random.words()
    const { sut, authenticationSpy } = makeSut({ validationError })
    await simulateValidForm(sut)
    expect(authenticationSpy.callsCount).toBe(0)
  })

  it('should show error message if authentication fails', async () => {
    const { sut, authenticationSpy } = makeSut()
    const error = new InvalidCredentialsError()
    jest
      .spyOn(authenticationSpy, 'auth')
      .mockReturnValueOnce(Promise.reject(error))
    await simulateValidForm(sut)
    helper.testElementsTextContent(sut, 'main-error', error.message)
    helper.testChildCount(sut, 'error-wrap', 1)
  })

  it('should call updateCurrentAccount if authentication succeeds', async () => {
    const { sut, authenticationSpy, setCurrentAccountMock } = makeSut()
    await simulateValidForm(sut)
    expect(setCurrentAccountMock).toHaveBeenCalledWith(
      authenticationSpy.account
    )
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/')
  })

  it('should redirect user to signup page if they click on register link', () => {
    const { sut } = makeSut()
    fireEvent.click(sut.getByTestId('signup'))
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/signup')
  })
})
