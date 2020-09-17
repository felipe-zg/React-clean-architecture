import { InvalidFieldError } from '@/validation/erros/invalid-field-error'
import { FieldValidation } from '@/validation/protocols/field-validation'

export class CompareFieldsValidation implements FieldValidation {
  constructor(readonly field: string, private readonly valueToCompare: string) {}

  validate(value: string): Error {
    return new InvalidFieldError()
  }
}
