import faker from 'faker'
import * as http from '../support/http-mocks'

export const mockRequestWithInvalidCredentialsError = (): void =>
  http.mockRequestWithInvalidCredentialsError(/login/)

export const mockRequestWithUnexpectedError = (): void =>
  http.mockRequestWithUnexpectedError('POST', /login/)

export const mockRequestWithStatusOK = (): void =>
  http.mockRequestWithStatusOK('POST', /login/, {
    accessToken: faker.random.uuid()
  })

export const mockRequestWithInvalidResponseData = (): void =>
  http.mockRequestWithStatusOK('POST', /login/, {
    invalidData: faker.random.uuid()
  })
