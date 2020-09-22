import { FieldValidation } from '@/validation/protocols/field-validation'

export class FieldValidationSpy implements FieldValidation {
  error: Error = null

  constructor(readonly field: string) {}
  // eslint-disable-next-line @typescript-eslint/ban-types
  validate(data: object): Error {
    return this.error
  }
}
