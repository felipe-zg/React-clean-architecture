import { FieldValidation } from '@/validation/protocols/field-validation'
import { RequiredFieldError } from '@/validation/erros'

export class RequiredFieldValidation implements FieldValidation {
  constructor(readonly field: string) {}
  validate(field: string): Error {
    return new RequiredFieldError()
  }
}
