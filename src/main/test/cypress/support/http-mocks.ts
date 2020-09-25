import faker from 'faker'

export const mockRequestWithInvalidCredentialsError = (url: RegExp): void => {
  cy.server()
  cy.route({
    method: 'POST',
    url,
    status: 401,
    response: {
      error: faker.random.words()
    }
  }).as('request')
}

export const mockRequestWithUnexpectedError = (
  method: string,
  url: RegExp
): void => {
  cy.server()
  cy.route({
    method,
    url,
    status: faker.helpers.randomize([400, 404, 500]),
    response: {
      error: faker.random.words()
    }
  }).as('request')
}

export const mockRequestWithStatusOK = (
  method: string,
  url: RegExp,
  response: any
): void => {
  cy.server()
  cy.route({
    method,
    url,
    status: 200,
    response
  }).as('request')
}
