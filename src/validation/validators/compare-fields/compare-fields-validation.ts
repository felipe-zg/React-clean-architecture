import { InvalidFieldError } from '@/validation/erros/invalid-field-error'
import { FieldValidation } from '@/validation/protocols/field-validation'

export class CompareFieldsValidation implements FieldValidation {
  constructor(
    readonly field: string,
    private readonly fieldToCompare: string
  ) {}

  // eslint-disable-next-line @typescript-eslint/ban-types
  validate(data: object): Error {
    return data[this.field] !== data[this.fieldToCompare]
      ? new InvalidFieldError()
      : null
  }
}
