import { FieldValidation } from '@/validation/protocols/field-validation'
import { InvalidFieldError } from '@/validation/erros/invalid-field-error'

export class MinLengthValidation implements FieldValidation {
  constructor(readonly field: string, private readonly minLength: number) {}

  // eslint-disable-next-line @typescript-eslint/ban-types
  validate(data: object): Error {
    return data[this.field]?.length < this.minLength
      ? new InvalidFieldError()
      : null
  }
}
