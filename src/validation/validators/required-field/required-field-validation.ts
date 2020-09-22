import { FieldValidation } from '@/validation/protocols/field-validation'
import { RequiredFieldError } from '@/validation/erros'

export class RequiredFieldValidation implements FieldValidation {
  constructor(readonly field: string) {}
  // eslint-disable-next-line @typescript-eslint/ban-types
  validate(data: object): Error {
    return data[this.field] ? null : new RequiredFieldError()
  }
}
