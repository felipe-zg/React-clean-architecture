import React from 'react'
import faker from 'faker'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import 'jest-localstorage-mock'
import { render, fireEvent, RenderResult, cleanup, waitFor } from '@testing-library/react'

import { ValidationStub, AuthenticationSpy } from '@/presentation/test'
import Login from '@/presentation/pages/Login'
import { InvalidCredentialsError } from '@/domain/errors'

type SutTypes = {
  sut: RenderResult
  authenticationSpy: AuthenticationSpy
}

type SutParams = {
  validationError: string
}

const history = createMemoryHistory()

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError
  const authenticationSpy = new AuthenticationSpy()
  const sut = render(
    <Router history={history}>
      <Login validation={validationStub} authentication={authenticationSpy}/>
    </Router>
  )
  return {
    sut,
    authenticationSpy
  }
}

const fillEmailField = (sut: RenderResult, email = faker.internet.email()): void => {
  const input = sut.getByTestId('email')
  fireEvent.input(input, { target: { value: email } })
}

const fillPasswordField = (sut: RenderResult, password = faker.internet.password()): void => {
  const input = sut.getByTestId('password')
  fireEvent.input(input, { target: { value: password } })
}

const simulateValidForm = (sut: RenderResult, email = faker.internet.email(), password = faker.internet.password()): void => {
  fillEmailField(sut, email)
  fillPasswordField(sut, password)
  fireEvent.click(sut.getByTestId('submit-button'))
}

const simulateStatusForField = (sut: RenderResult, fieldName: string, validationError?: string): void => {
  const fieldStatus = sut.getByTestId(`${fieldName}-status`)
  expect(fieldStatus.title).toBe(validationError || 'Tudo certo!')
  expect(fieldStatus.textContent).toBe(validationError ? '🔴' : '🟢')
}

describe('Login', () => {
  beforeEach(cleanup)
  beforeEach(() => {
    localStorage.clear()
  })

  it('should not render spinner and error message on mount', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })

    expect(sut.getByTestId('error-wrap').childElementCount).toBe(0)
    simulateStatusForField(sut, 'email', validationError)
    simulateStatusForField(sut, 'password', validationError)
    expect((sut.getByTestId('submit-button') as HTMLButtonElement).disabled).toBe(true)
  })

  it('should show error message if email validation fails ', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    fillEmailField(sut)
    simulateStatusForField(sut, 'email', validationError)
  })

  it('should show error message if password validation fails ', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    fillPasswordField(sut)
    simulateStatusForField(sut, 'password', validationError)
  })

  it('should show valid status if email validation succeds ', () => {
    const { sut } = makeSut()
    fillEmailField(sut)
    simulateStatusForField(sut, 'email')
  })

  it('should show valid status if password validation succeds ', () => {
    const { sut } = makeSut()
    fillPasswordField(sut)
    simulateStatusForField(sut, 'password')
  })

  it('should enable submit button if validation succeds ', () => {
    const { sut } = makeSut()
    fillEmailField(sut)
    fillPasswordField(sut)
    expect((sut.getByTestId('submit-button') as HTMLButtonElement).disabled).toBe(false)
  })

  it('should show spinner on form submition', () => {
    const { sut } = makeSut()
    simulateValidForm(sut)
    expect(sut.getByTestId('spinner')).toBeTruthy()
  })

  it('should call authentication with correct parameters on form submition', () => {
    const { sut, authenticationSpy } = makeSut()
    const email = faker.internet.email()
    const password = faker.internet.password()
    simulateValidForm(sut, email, password)
    expect(authenticationSpy.params).toEqual({
      email,
      password
    })
  })

  it('should call authentication only once', () => {
    const { sut, authenticationSpy } = makeSut()
    simulateValidForm(sut)
    simulateValidForm(sut)
    expect(authenticationSpy.callsCount).toBe(1)
  })

  it('should not call authentication if form is invalid', () => {
    const validationError = faker.random.words()
    const { sut, authenticationSpy } = makeSut({ validationError })
    fillEmailField(sut)
    fireEvent.submit(sut.getByTestId('form'))
    expect(authenticationSpy.callsCount).toBe(0)
  })

  it('should show error message if authentication fails', async () => {
    const { sut, authenticationSpy } = makeSut()
    const error = new InvalidCredentialsError()
    jest.spyOn(authenticationSpy, 'auth').mockReturnValueOnce(Promise.reject(error))
    simulateValidForm(sut)
    const errorWrap = sut.getByTestId('error-wrap')
    await waitFor(() => errorWrap)
    expect(sut.getByTestId('main-error').textContent).toBe(error.message)
    expect(errorWrap.childElementCount).toBe(1)
  })

  it('should ass access token to local storage if authentication succeeds', async () => {
    const { sut, authenticationSpy } = makeSut()
    simulateValidForm(sut)
    await waitFor(() => sut.getByTestId('form'))
    expect(localStorage.setItem).toHaveBeenCalledWith('accessToken', authenticationSpy.account.accessToken)
  })

  it('should redirect user to signup page if they click on register link', () => {
    const { sut } = makeSut()
    fireEvent.click(sut.getByTestId('signup'))
    expect(history.length).toBe(2)
    expect(history.location.pathname).toBe('/signup')
  })
})
