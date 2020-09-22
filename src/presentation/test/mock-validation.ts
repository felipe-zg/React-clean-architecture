import { Validation } from '../protocols/validation'

export class ValidationStub implements Validation {
  errorMessage: string

  // eslint-disable-next-line @typescript-eslint/ban-types
  validate(fieldName: string, data: object): string {
    return this.errorMessage
  }
}
