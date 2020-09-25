import faker from 'faker'
import * as helper from '../support/form-helper'
import * as http from '../support/signup-mocks'

const simulateValidForm = (): void => {
  const password = faker.random.alphaNumeric(5)
  cy.getByTestId('name').focus().type(faker.random.alphaNumeric(5))
  cy.getByTestId('email').focus().type(faker.internet.email())
  cy.getByTestId('password').focus().type(password)
  cy.getByTestId('passwordConfirmation').focus().type(password)
}

const simulateInvalidForm = (): void => {
  cy.getByTestId('name').focus().type(faker.random.alphaNumeric(4))
  cy.getByTestId('email').focus().type(faker.random.word())
  cy.getByTestId('password').focus().type(faker.random.alphaNumeric(4))
  cy.getByTestId('passwordConfirmation')
    .focus()
    .type(faker.random.alphaNumeric(4))
}

const simulateValidSubmit = (): void => {
  simulateValidForm()
  cy.getByTestId('submit-button').click()
}

describe('Signup', () => {
  beforeEach(() => {
    cy.visit('signup')
  })
  it('should start with correct state', () => {
    cy.getByTestId('name').should('have.attr', 'readonly')
    helper.testInputStatus('name', 'Campo obrigatório')
    cy.getByTestId('email').should('have.attr', 'readonly')
    helper.testInputStatus('email', 'Campo obrigatório')
    cy.getByTestId('password').should('have.attr', 'readonly')
    helper.testInputStatus('password', 'Campo obrigatório')
    cy.getByTestId('passwordConfirmation').should('have.attr', 'readonly')
    helper.testInputStatus('passwordConfirmation', 'Campo obrigatório')
    cy.getByTestId('submit-button').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('it should present error if form is invalid', () => {
    simulateInvalidForm()
    helper.testInputStatus('name', 'Valor inválido')
    helper.testInputStatus('email', 'Valor inválido')
    helper.testInputStatus('password', 'Valor inválido')
    helper.testInputStatus('passwordConfirmation', 'Valor inválido')
    cy.getByTestId('submit-button').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('should show valid state if form is valid', () => {
    simulateValidForm()
    helper.testInputStatus('name')
    helper.testInputStatus('email')
    helper.testInputStatus('password')
    helper.testInputStatus('passwordConfirmation')
    cy.getByTestId('submit-button').should('not.have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('should show error if email already exists', () => {
    http.mockRequestWithEmailAlreadyExistsError()
    simulateValidSubmit()
    helper.testMainError('E-mail já cadastrado')
    helper.testUrl('/signup')
  })

  it('should show UnexpectedError if any other error occurs', () => {
    http.mockRequestWithUnexpectedError()
    simulateValidSubmit()
    helper.testMainError('Algo deu errado, tente de novo em breve!')
    helper.testUrl('/signup')
  })

  it('should return UnexpectedError if response returns invalid data', () => {
    http.mockRequestWithInvalidResponseData()
    simulateValidSubmit()
    helper.testMainError('Algo deu errado, tente de novo em breve!')
    helper.testUrl('/signup')
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
    simulateValidForm()
    cy.getByTestId('submit-button').dblclick()
    helper.testRequestCallsCount(1)
  })
})
