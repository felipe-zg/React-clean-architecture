import faker from 'faker'
import { testInputStatus } from '../support/form-helper'
import * as http from './login-mocks'

const baseUrl: string = Cypress.config().baseUrl

describe('Login', () => {
  beforeEach(() => {
    cy.server()
    cy.visit('login')
  })
  it('should start with correct state', () => {
    cy.getByTestId('email').should('have.attr', 'readonly')
    testInputStatus('email', 'Campo obrigatório')
    cy.getByTestId('password').should('have.attr', 'readonly')
    testInputStatus('password', 'Campo obrigatório')
    cy.getByTestId('submit-button').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('it should present error if form is invalid', () => {
    cy.getByTestId('email').focus().type(faker.random.word())
    testInputStatus('email', 'Valor inválido')
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(4))
    testInputStatus('password', 'Valor inválido')
    cy.getByTestId('submit-button').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('should show valid state if form is valid', () => {
    cy.getByTestId('email').focus().type(faker.internet.email())
    testInputStatus('email')
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
    testInputStatus('password')
    cy.getByTestId('submit-button').should('not.have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('should show error if credentials are invalid', () => {
    http.mockRequestWithInvalidCredentialsError()
    cy.getByTestId('email').focus().type(faker.internet.email())
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
    cy.getByTestId('submit-button').click()
    cy.getByTestId('spinner').should('not.exist')
    cy.getByTestId('main-error').should('contain.text', 'Credenciais inválidas')
    cy.url().should('eq', `${baseUrl}/login`)
  })

  it('should show UnexpectedError if any other error occurs', () => {
    http.mockRequestWithUnexpectedError()
    cy.getByTestId('email').focus().type(faker.internet.email())
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
    cy.getByTestId('submit-button').click()
    cy.getByTestId('spinner').should('not.exist')
    cy.getByTestId('main-error').should(
      'contain.text',
      'Algo deu errado, tente de novo em breve!'
    )
    cy.url().should('eq', `${baseUrl}/login`)
  })

  it('should return UnexpectedError if response returns invalid data', () => {
    http.mockRequestWithInvalidResponseData()
    cy.getByTestId('email').focus().type(faker.internet.email())
    cy.getByTestId('password')
      .focus()
      .type(faker.random.alphaNumeric(5))
      .type('{enter}')
    cy.getByTestId('spinner').should('not.exist')
    cy.getByTestId('main-error').should(
      'contain.text',
      'Algo deu errado, tente de novo em breve!'
    )
    cy.url().should('eq', `${baseUrl}/login`)
  })

  it('should not call submit if form is invalid', () => {
    http.mockRequestWithStatusOK()
    cy.getByTestId('email').focus().type(faker.internet.email()).type('{enter}')
    cy.get('@request.all').should('have.length', 0)
  })

  it('should save access token if credentials are valid', () => {
    http.mockRequestWithStatusOK()
    cy.getByTestId('email').focus().type(faker.internet.email())
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
    cy.getByTestId('submit-button').click()
    cy.getByTestId('spinner').should('not.exist')
    cy.getByTestId('main-error').should('not.exist')
    cy.url().should('eq', `${baseUrl}/`)
    cy.window().then((window) =>
      assert.isOk(window.localStorage.getItem('accessToken'))
    )
  })

  it('should prevent multiple submits', () => {
    http.mockRequestWithStatusOK()
    cy.getByTestId('email').focus().type(faker.internet.email())
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
    cy.getByTestId('submit-button').dblclick()
    cy.get('@request.all').should('have.length', 1)
  })
})
