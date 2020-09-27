import faker from 'faker'
import * as http from './http-mocks'

export const mockRequestWithEmailAlreadyExistsError = (): void =>
  http.mockRequestWithEmailAlreadyExistsError(/signup/)

export const mockRequestWithUnexpectedError = (): void =>
  http.mockRequestWithUnexpectedError('POST', /signup/)

export const mockRequestWithStatusOK = (): void =>
  http.mockRequestWithStatusOK('POST', /signup/, {
    accessToken: faker.random.uuid(),
    name: faker.name.findName()
  })

export const mockRequestWithInvalidResponseData = (): void =>
  http.mockRequestWithStatusOK('POST', /signup/, {
    invalidData: faker.random.uuid()
  })
