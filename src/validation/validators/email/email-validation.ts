import { FieldValidation } from '@/validation/protocols/field-validation'
import { InvalidFieldError } from '@/validation/erros/invalid-field-error'

export class EmailValidation implements FieldValidation {
  constructor(readonly field: string) {}

  // eslint-disable-next-line @typescript-eslint/ban-types
  validate(data: object): Error {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return !data[this.field] ||
      emailRegex.test(String(data[this.field]).toLowerCase())
      ? null
      : new InvalidFieldError()
  }
}
