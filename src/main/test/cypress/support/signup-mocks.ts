import * as http from './http-mocks'

export const mockRequestWithEmailAlreadyExistsError = (): void =>
  http.mockRequestWithEmailAlreadyExistsError(/signup/)
