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

const history = createMemoryHistory({ initialEntries: ['/login'] })

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

const simulateValidForm = async (sut: RenderResult, email = faker.internet.email(), password = faker.internet.password()): Promise<void> => {
  fillEmailField(sut, email)
  fillPasswordField(sut, password)
  const form = sut.getByTestId('form')
  fireEvent.submit(form)
  await waitFor(() => form)
}

const testStatusForField = (sut: RenderResult, fieldName: string, validationError?: string): void => {
  const fieldStatus = sut.getByTestId(`${fieldName}-status`)
  expect(fieldStatus.title).toBe(validationError || 'Tudo certo!')
  expect(fieldStatus.textContent).toBe(validationError ? '🔴' : '🟢')
}

const testErrorWrapChildCount = (sut: RenderResult, count: number): void => {
  expect((sut.getByTestId('error-wrap')).childElementCount).toBe(count)
}

const testElementsTextContent = (sut: RenderResult, elementTestId: string, text: string): void => {
  expect(sut.getByTestId(elementTestId).textContent).toBe(text)
}

const testElementExists = (sut: RenderResult, elementTestId: string): void => {
  expect(sut.getByTestId(elementTestId)).toBeTruthy()
}

const testButtonIsDisabled = (sut: RenderResult, elementTestId: string, isDisabled: boolean): void => {
  expect((sut.getByTestId(elementTestId) as HTMLButtonElement).disabled).toBe(isDisabled)
}

describe('Login', () => {
  beforeEach(cleanup)
  beforeEach(() => {
    localStorage.clear()
  })

  it('should not render spinner and error message on mount', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    testErrorWrapChildCount(sut, 0)
    testStatusForField(sut, 'email', validationError)
    testStatusForField(sut, 'password', validationError)
    testButtonIsDisabled(sut, 'submit-button', true)
  })

  it('should show error message if email validation fails ', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    fillEmailField(sut)
    testStatusForField(sut, 'email', validationError)
  })

  it('should show error message if password validation fails ', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    fillPasswordField(sut)
    testStatusForField(sut, 'password', validationError)
  })

  it('should show valid status if email validation succeds ', () => {
    const { sut } = makeSut()
    fillEmailField(sut)
    testStatusForField(sut, 'email')
  })

  it('should show valid status if password validation succeds ', () => {
    const { sut } = makeSut()
    fillPasswordField(sut)
    testStatusForField(sut, 'password')
  })

  it('should enable submit button if validation succeds ', () => {
    const { sut } = makeSut()
    fillEmailField(sut)
    fillPasswordField(sut)
    testButtonIsDisabled(sut, 'submit-button', false)
  })

  it('should show spinner on form submition', async() => {
    const { sut } = makeSut()
    await simulateValidForm(sut)
    testElementExists(sut, 'spinner')
  })

  it('should call authentication with correct parameters on form submition', async() => {
    const { sut, authenticationSpy } = makeSut()
    const email = faker.internet.email()
    const password = faker.internet.password()
    await simulateValidForm(sut, email, password)
    expect(authenticationSpy.params).toEqual({
      email,
      password
    })
  })

  it('should call authentication only once', async() => {
    const { sut, authenticationSpy } = makeSut()
    await simulateValidForm(sut)
    await simulateValidForm(sut)
    expect(authenticationSpy.callsCount).toBe(1)
  })

  it('should not call authentication if form is invalid', async() => {
    const validationError = faker.random.words()
    const { sut, authenticationSpy } = makeSut({ validationError })
    await simulateValidForm(sut)
    expect(authenticationSpy.callsCount).toBe(0)
  })

  it('should show error message if authentication fails', async () => {
    const { sut, authenticationSpy } = makeSut()
    const error = new InvalidCredentialsError()
    jest.spyOn(authenticationSpy, 'auth').mockReturnValueOnce(Promise.reject(error))
    await simulateValidForm(sut)
    testElementsTextContent(sut, 'main-error', error.message)
    testErrorWrapChildCount(sut, 1)
  })

  it('should ass access token to local storage if authentication succeeds', async () => {
    const { sut, authenticationSpy } = makeSut()
    await simulateValidForm(sut)
    expect(localStorage.setItem).toHaveBeenCalledWith('accessToken', authenticationSpy.account.accessToken)
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/')
  })

  it('should redirect user to signup page if they click on register link', () => {
    const { sut } = makeSut()
    fireEvent.click(sut.getByTestId('signup'))
    expect(history.length).toBe(2)
    expect(history.location.pathname).toBe('/signup')
  })
})
