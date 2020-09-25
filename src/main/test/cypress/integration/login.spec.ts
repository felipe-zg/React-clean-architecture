import faker from 'faker'
import * as helper from '../support/form-helper'
import * as http from './login-mocks'

const simulateValidSubmit = (): void => {
  cy.getByTestId('email').focus().type(faker.internet.email())
  cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
  cy.getByTestId('submit-button').click()
}

describe('Login', () => {
  beforeEach(() => {
    cy.server()
    cy.visit('login')
  })
  it('should start with correct state', () => {
    cy.getByTestId('email').should('have.attr', 'readonly')
    helper.testInputStatus('email', 'Campo obrigatório')
    cy.getByTestId('password').should('have.attr', 'readonly')
    helper.testInputStatus('password', 'Campo obrigatório')
    cy.getByTestId('submit-button').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('it should present error if form is invalid', () => {
    cy.getByTestId('email').focus().type(faker.random.word())
    helper.testInputStatus('email', 'Valor inválido')
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(4))
    helper.testInputStatus('password', 'Valor inválido')
    cy.getByTestId('submit-button').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('should show valid state if form is valid', () => {
    cy.getByTestId('email').focus().type(faker.internet.email())
    helper.testInputStatus('email')
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
    helper.testInputStatus('password')
    cy.getByTestId('submit-button').should('not.have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('should show error if credentials are invalid', () => {
    http.mockRequestWithInvalidCredentialsError()
    simulateValidSubmit()
    helper.testMainError('Credenciais inválidas')
    helper.testUrl('/login')
  })

  it('should show UnexpectedError if any other error occurs', () => {
    http.mockRequestWithUnexpectedError()
    simulateValidSubmit()
    helper.testMainError('Algo deu errado, tente de novo em breve!')
    helper.testUrl('/login')
  })

  it('should return UnexpectedError if response returns invalid data', () => {
    http.mockRequestWithInvalidResponseData()
    simulateValidSubmit()
    helper.testMainError('Algo deu errado, tente de novo em breve!')
    helper.testUrl('/login')
  })

  it('should not call submit if form is invalid', () => {
    http.mockRequestWithStatusOK()
    cy.getByTestId('email').focus().type(faker.internet.email()).type('{enter}')
    helper.testRequestCallsCount(0)
  })

  it('should save access token if credentials are valid', () => {
    http.mockRequestWithStatusOK()
    simulateValidSubmit()
    cy.getByTestId('error-wrap').should('not.have.descendants')
    helper.testUrl('/')
    helper.testLocalstorageItem('accessToken')
  })

  it('should prevent multiple submits', () => {
    http.mockRequestWithStatusOK()
    cy.getByTestId('email').focus().type(faker.internet.email())
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
    cy.getByTestId('submit-button').dblclick()
    helper.testRequestCallsCount(1)
  })
})
